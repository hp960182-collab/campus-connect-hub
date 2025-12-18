import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SakuraParticles from "@/components/SakuraParticles";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const roles = [
  { id: "developer", label: "Developer", description: "Build and maintain our digital presence" },
  { id: "designer", label: "Designer", description: "Create visual content and UI/UX" },
  { id: "manager", label: "Manager", description: "Coordinate events and team activities" },
  { id: "moderator", label: "Moderator", description: "Help maintain community standards" },
  { id: "content", label: "Content Creator", description: "Write articles and social posts" },
  { id: "events", label: "Events Coordinator", description: "Plan and execute community events" },
];

const interestTags = [
  "Gaming", "Anime", "Music", "Art", "Technology", "Sports", 
  "Photography", "Writing", "Cooking", "Movies", "Books", "Fitness"
];

const Join = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeRoleFilter, setActiveRoleFilter] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      toast.error("Please select a role you're interested in");
      return;
    }

    if (selectedInterests.length === 0) {
      toast.error("Please select at least one interest");
      return;
    }

    setIsSubmitting(true);

    try {
      let resumeUrl = null;

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('resumes')
          .getPublicUrl(fileName);

        resumeUrl = publicUrl;
      }

      const { error } = await supabase
        .from('member_submissions')
        .insert({
          name,
          email,
          bio,
          role_interest: selectedRole,
          interests: selectedInterests,
          resume_url: resumeUrl,
        });

      if (error) throw error;

      setSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error('Error submitting:', error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredRoles = activeRoleFilter 
    ? roles.filter(r => r.id === activeRoleFilter)
    : roles;

  return (
    <div className="min-h-screen bg-background">
      <SakuraParticles />
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-[1000px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-sakura-dark text-xs tracking-[0.3em] uppercase mb-4">
              Become Part of Us
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Join Our Community
            </h1>
            <p className="text-foreground/60 max-w-md mx-auto">
              Take the first step towards being part of something meaningful.
            </p>
          </motion.div>

          {/* Looking for Members Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="font-display text-2xl text-foreground mb-6 text-center">
              We're Looking For
            </h2>
            
            {/* Role Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => setActiveRoleFilter(null)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeRoleFilter === null 
                    ? 'bg-sakura text-white' 
                    : 'bg-sakura/10 text-foreground/70 hover:bg-sakura/20'
                }`}
              >
                All Roles
              </button>
              {roles.map(role => (
                <button
                  key={role.id}
                  onClick={() => setActiveRoleFilter(activeRoleFilter === role.id ? null : role.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    activeRoleFilter === role.id 
                      ? 'bg-sakura text-white' 
                      : 'bg-sakura/10 text-foreground/70 hover:bg-sakura/20'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>

            {/* Role Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRoles.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-5 rounded-xl border border-border/50 bg-background/80 hover:border-sakura/40 transition-all"
                >
                  <h3 className="font-display text-lg text-foreground mb-2">{role.label}</h3>
                  <p className="text-foreground/60 text-sm">{role.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Application Form */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-display text-2xl text-foreground mb-8 text-center">
              Submit Your Application
            </h2>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto space-y-6">
                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-foreground/70 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-transparent border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-sakura/50 transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground/70 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-transparent border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-sakura/50 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm text-foreground/70 mb-2">
                    Role You're Interested In *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {roles.map(role => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className={`px-4 py-2.5 rounded-xl text-sm border transition-all ${
                          selectedRole === role.id
                            ? 'border-sakura bg-sakura/10 text-sakura-dark'
                            : 'border-border text-foreground/70 hover:border-sakura/30'
                        }`}
                      >
                        {role.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm text-foreground/70 mb-2">
                    Tell Us About Yourself
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-transparent border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-sakura/50 transition-colors resize-none"
                    placeholder="Share a bit about yourself, your skills, and what you hope to contribute..."
                  />
                </div>

                {/* Interest Tags */}
                <div>
                  <label className="block text-sm text-foreground/70 mb-2">
                    Your Interests * (select multiple)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interestTags.map(interest => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                          selectedInterests.includes(interest)
                            ? 'bg-sakura text-white'
                            : 'bg-sakura/10 text-foreground/70 hover:bg-sakura/20'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm text-foreground/70 mb-2">
                    Upload Resume/Portfolio (optional)
                  </label>
                  <div className="relative">
                    {!file ? (
                      <label className="flex items-center justify-center gap-3 px-4 py-6 rounded-xl border-2 border-dashed border-border hover:border-sakura/50 cursor-pointer transition-colors">
                        <Upload className="w-5 h-5 text-foreground/50" />
                        <span className="text-foreground/60 text-sm">Click to upload (max 5MB)</span>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-sakura/30 bg-sakura/5">
                        <span className="text-foreground/80 text-sm truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="p-1 hover:bg-sakura/20 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4 text-foreground/60" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-foreground/40 mt-2">Accepted: PDF, DOC, DOCX, PNG, JPG</p>
                </div>

                <Button 
                  type="submit" 
                  variant="sakura" 
                  size="lg" 
                  className="w-full mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 max-w-md mx-auto"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-sakura/15 flex items-center justify-center">
                  <Check className="w-7 h-7 text-sakura-dark" />
                </div>
                <h3 className="font-display text-2xl text-foreground mb-2">
                  Application Received!
                </h3>
                <p className="text-foreground/60">
                  Thank you for your interest in joining our community. We'll review your application and get back to you soon.
                </p>
              </motion.div>
            )}
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Join;