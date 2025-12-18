-- Create member submissions table
CREATE TABLE public.member_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  bio TEXT,
  interests TEXT[] NOT NULL DEFAULT '{}',
  role_interest TEXT NOT NULL,
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.member_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit member applications" 
ON public.member_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes', 'resumes', true);

-- Allow public uploads to resumes bucket
CREATE POLICY "Anyone can upload resumes"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'resumes');

-- Allow public read access to resumes
CREATE POLICY "Anyone can view resumes"
ON storage.objects
FOR SELECT
USING (bucket_id = 'resumes');