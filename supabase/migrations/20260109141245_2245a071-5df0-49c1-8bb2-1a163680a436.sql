
-- Create enum types for the application
CREATE TYPE public.issue_category AS ENUM ('infrastructure', 'hygiene', 'safety', 'internet', 'classroom', 'food', 'transport', 'other');
CREATE TYPE public.issue_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.issue_status AS ENUM ('reported', 'acknowledged', 'in_progress', 'resolved', 'closed');
CREATE TYPE public.app_role AS ENUM ('student', 'authority', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    department TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'student',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create campus_issues table
CREATE TABLE public.campus_issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    content TEXT NOT NULL,
    category issue_category NOT NULL DEFAULT 'other',
    priority issue_priority NOT NULL DEFAULT 'medium',
    status issue_status NOT NULL DEFAULT 'reported',
    location_text TEXT,
    location_area TEXT,
    ai_summary TEXT,
    ai_tags TEXT[] DEFAULT '{}',
    reporter_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_anonymous BOOLEAN NOT NULL DEFAULT false,
    assigned_authority_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    upvotes_count INTEGER NOT NULL DEFAULT 0,
    resolution_notes TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create issue_comments table
CREATE TABLE public.issue_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    issue_id UUID REFERENCES public.campus_issues(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    is_authority_update BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create issue_upvotes table
CREATE TABLE public.issue_upvotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    issue_id UUID REFERENCES public.campus_issues(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (issue_id, user_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campus_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_upvotes ENABLE ROW LEVEL SECURITY;

-- Security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- Function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT role
    FROM public.user_roles
    WHERE user_id = _user_id
    LIMIT 1
$$;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- User roles policies (only admins can manage, users can read their own)
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert roles"
ON public.user_roles FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update roles"
ON public.user_roles FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Campus issues policies
CREATE POLICY "Anyone can view issues"
ON public.campus_issues FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create issues"
ON public.campus_issues FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authorities and admins can update issues"
ON public.campus_issues FOR UPDATE
USING (
    public.has_role(auth.uid(), 'authority') OR 
    public.has_role(auth.uid(), 'admin') OR
    auth.uid() = reporter_id
);

-- Issue comments policies
CREATE POLICY "Anyone can view comments"
ON public.issue_comments FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create comments"
ON public.issue_comments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
ON public.issue_comments FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
ON public.issue_comments FOR DELETE
USING (auth.uid() = user_id);

-- Issue upvotes policies
CREATE POLICY "Anyone can view upvotes"
ON public.issue_upvotes FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can upvote"
ON public.issue_upvotes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own upvote"
ON public.issue_upvotes FOR DELETE
USING (auth.uid() = user_id);

-- Function to handle new user signup (create profile and default role)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
    
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'student');
    
    RETURN NEW;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update upvotes count
CREATE OR REPLACE FUNCTION public.update_upvotes_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.campus_issues
        SET upvotes_count = upvotes_count + 1
        WHERE id = NEW.issue_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.campus_issues
        SET upvotes_count = upvotes_count - 1
        WHERE id = OLD.issue_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$;

-- Trigger for upvotes count
CREATE TRIGGER on_upvote_change
AFTER INSERT OR DELETE ON public.issue_upvotes
FOR EACH ROW EXECUTE FUNCTION public.update_upvotes_count();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campus_issues_updated_at
BEFORE UPDATE ON public.campus_issues
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
