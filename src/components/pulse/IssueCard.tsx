import { motion } from "framer-motion";
import { ThumbsUp, MessageCircle, MapPin, Clock, User, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Issue, toggleUpvote } from "@/hooks/useIssues";
import { PriorityBadge } from "./PriorityBadge";
import { CategoryBadge } from "./CategoryBadge";
import { StatusBadge } from "./StatusBadge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface IssueCardProps {
  issue: Issue;
  onUpvote?: () => void;
  onClick?: () => void;
}

export function IssueCard({ issue, onUpvote, onClick }: IssueCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [localUpvotes, setLocalUpvotes] = useState(issue.upvotes_count);

  const handleUpvote = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to upvote issues",
        variant: "destructive"
      });
      return;
    }

    setIsUpvoting(true);
    const { action, error } = await toggleUpvote(issue.id, user.id);
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to update vote",
        variant: "destructive"
      });
    } else {
      setLocalUpvotes(prev => action === 'added' ? prev + 1 : prev - 1);
      onUpvote?.();
    }
    
    setIsUpvoting(false);
  };

  const displayName = issue.is_anonymous 
    ? 'Anonymous Student' 
    : issue.reporter?.full_name || 'Unknown';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      className="card-base cursor-pointer"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full bg-sakura-light flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-sakura-dark" />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{displayName}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(new Date(issue.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
        <StatusBadge status={issue.status} />
      </div>

      {/* Content */}
      <p className="text-foreground mb-3 line-clamp-2">
        {issue.ai_summary || issue.content}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        <CategoryBadge category={issue.category} />
        <PriorityBadge priority={issue.priority} />
        {issue.location_area && issue.location_area !== 'Campus-wide' && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
            <MapPin className="w-3 h-3" />
            {issue.location_area}
          </span>
        )}
      </div>

      {/* AI Tags */}
      {issue.ai_tags && issue.ai_tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {issue.ai_tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-0.5 rounded-full text-xs bg-sakura-light/50 text-sakura-dark"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={handleUpvote}
            disabled={isUpvoting}
            className={cn(
              "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-sakura-dark transition-colors",
              isUpvoting && "opacity-50"
            )}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{localUpvotes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-sakura-dark transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>0</span>
          </button>
        </div>
        <button 
          onClick={onClick}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sakura-dark transition-colors"
        >
          <Eye className="w-3 h-3" />
          View Details
        </button>
      </div>
    </motion.div>
  );
}
