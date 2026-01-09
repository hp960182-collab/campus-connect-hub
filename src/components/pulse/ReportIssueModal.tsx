import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Loader2, Eye, EyeOff, Send, AlertCircle } from "lucide-react";
import { classifyIssue, createIssue, ClassificationResult } from "@/hooks/useIssues";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { PriorityBadge } from "./PriorityBadge";
import { CategoryBadge } from "./CategoryBadge";
import { cn } from "@/lib/utils";

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ReportIssueModal({ isOpen, onClose, onSuccess }: ReportIssueModalProps) {
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [classification, setClassification] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!content.trim()) {
      setError("Please describe your issue");
      return;
    }

    setError(null);
    setIsClassifying(true);
    
    const result = await classifyIssue(content);
    
    if (result) {
      setClassification(result);
    } else {
      setError("Failed to analyze issue. Please try again.");
    }
    
    setIsClassifying(false);
  };

  const handleSubmit = async () => {
    if (!classification) return;
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to report issues",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    const { error: submitError } = await createIssue(
      content,
      classification,
      user.id,
      isAnonymous
    );

    if (submitError) {
      toast({
        title: "Error",
        description: "Failed to submit issue. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Issue Reported",
        description: "Your issue has been submitted and will be reviewed."
      });
      handleClose();
      onSuccess?.();
    }
    
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setContent("");
    setIsAnonymous(false);
    setClassification(null);
    setError(null);
    onClose();
  };

  const handleEdit = () => {
    setClassification(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sakura-light flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-sakura-dark" />
                </div>
                <div>
                  <h2 className="font-semibold">Report an Issue</h2>
                  <p className="text-xs text-muted-foreground">AI will help classify your complaint</p>
                </div>
              </div>
              <button 
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {!classification ? (
                <>
                  {/* Input Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Describe your issue
                      </label>
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="e.g., Washroom near CSE block has no water since morning..."
                        className="input-base min-h-[120px] resize-none"
                        disabled={isClassifying}
                      />
                      {error && (
                        <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {error}
                        </p>
                      )}
                    </div>

                    {/* Anonymous Toggle */}
                    <button
                      type="button"
                      onClick={() => setIsAnonymous(!isAnonymous)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors w-full",
                        isAnonymous 
                          ? "border-sakura bg-sakura-light/30" 
                          : "border-border hover:border-muted-foreground"
                      )}
                    >
                      {isAnonymous ? (
                        <EyeOff className="w-4 h-4 text-sakura-dark" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="text-sm">
                        {isAnonymous ? "Posting anonymously" : "Post with your name visible"}
                      </span>
                    </button>

                    {!user && (
                      <p className="text-sm text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                        Sign in to report issues. Your reports help improve campus life!
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Classification Preview */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <p className="text-sm font-medium mb-3">AI Analysis</p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground w-16">Category:</span>
                          <CategoryBadge category={classification.category} />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground w-16">Priority:</span>
                          <PriorityBadge priority={classification.priority} />
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-xs text-muted-foreground w-16 pt-0.5">Location:</span>
                          <span className="text-sm">{classification.location_area}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-xs text-muted-foreground w-16 pt-0.5">Summary:</span>
                          <span className="text-sm">{classification.summary}</span>
                        </div>
                        {classification.tags.length > 0 && (
                          <div className="flex items-start gap-2">
                            <span className="text-xs text-muted-foreground w-16 pt-0.5">Tags:</span>
                            <div className="flex flex-wrap gap-1">
                              {classification.tags.map((tag, i) => (
                                <span 
                                  key={i}
                                  className="px-2 py-0.5 rounded-full text-xs bg-sakura-light/50 text-sakura-dark"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                      This classification was generated by AI. You can edit or submit as-is.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-border bg-muted/30">
              {!classification ? (
                <>
                  <button 
                    onClick={handleClose}
                    className="btn-ghost text-sm px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAnalyze}
                    disabled={isClassifying || !content.trim() || !user}
                    className="btn-primary text-sm px-5 py-2"
                  >
                    {isClassifying ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Analyze with AI
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleEdit}
                    className="btn-ghost text-sm px-4 py-2"
                    disabled={isSubmitting}
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn-primary text-sm px-5 py-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Issue
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
