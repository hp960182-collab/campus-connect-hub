import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiPreview, setAiPreview] = useState<{
    category: string;
    tags: string[];
  } | null>(null);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate AI classification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo classification
    const lowerContent = content.toLowerCase();
    let category = "general";
    let tags: string[] = [];
    
    if (lowerContent.includes("lost") || lowerContent.includes("missing")) {
      category = "lost";
      tags = ["urgent", "help-needed"];
    } else if (lowerContent.includes("found")) {
      category = "found";
      tags = ["claim", "verification-needed"];
    } else if (lowerContent.includes("confession") || isAnonymous) {
      category = "confession";
      tags = ["anonymous", "feelings"];
    } else if (lowerContent.includes("event") || lowerContent.includes("hackathon") || lowerContent.includes("workshop")) {
      category = "event";
      tags = ["upcoming", "register"];
    } else if (lowerContent.includes("club") || lowerContent.includes("recruiting") || lowerContent.includes("audition")) {
      category = "club";
      tags = ["recruitment", "join"];
    }
    
    setAiPreview({ category, tags });
    setIsSubmitting(false);
  };

  const handleConfirmPost = () => {
    // In real app, this would save to database
    console.log("Posting:", { content, isAnonymous, ...aiPreview });
    setContent("");
    setAiPreview(null);
    onClose();
  };

  const handleClose = () => {
    setContent("");
    setAiPreview(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-card rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-display text-lg font-semibold">Create Post</h2>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              <Textarea
                placeholder="What's happening on campus? Share anything – lost items, events, confessions, or just your thoughts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="resize-none border-border/50 focus:border-sakura/50"
              />

              {/* Anonymous Toggle */}
              <div className="flex items-center justify-between py-2 px-3 bg-secondary/50 rounded-xl">
                <div className="flex items-center gap-2">
                  {isAnonymous ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className="text-sm">Post anonymously</span>
                </div>
                <Switch
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
              </div>

              {/* AI Preview */}
              {aiPreview && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-sakura-light/30 rounded-xl border border-sakura/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-sakura" />
                    <span className="text-sm font-medium text-sakura-dark">AI Classification</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-sakura/20 text-sakura-dark rounded-full">
                      📁 {aiPreview.category}
                    </span>
                    {aiPreview.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-white/60 text-sakura-dark rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Info */}
              <p className="text-xs text-muted-foreground text-center">
                <Sparkles className="w-3 h-3 inline mr-1" />
                AI will automatically categorize and tag your post
              </p>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-4 border-t border-border bg-secondary/20">
              {!aiPreview ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!content.trim() || isSubmitting}
                  className="flex-1 btn-primary"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      AI Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Preview with AI
                    </>
                  )}
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setAiPreview(null)}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={handleConfirmPost}
                    className="flex-1 btn-primary"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreatePostModal;
