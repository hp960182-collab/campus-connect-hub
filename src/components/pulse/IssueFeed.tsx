import { AnimatePresence } from "framer-motion";
import { Issue, IssueCategory } from "@/hooks/useIssues";
import { IssueCard } from "./IssueCard";
import { Loader2 } from "lucide-react";

interface IssueFeedProps {
  issues: Issue[];
  isLoading: boolean;
  filter?: IssueCategory | 'all';
  onIssueClick?: (issue: Issue) => void;
  onRefresh?: () => void;
}

export function IssueFeed({ issues, isLoading, filter, onIssueClick, onRefresh }: IssueFeedProps) {
  const filteredIssues = filter && filter !== 'all' 
    ? issues.filter(i => i.category === filter)
    : issues;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-sakura animate-spin mb-4" />
        <p className="text-muted-foreground">Loading issues...</p>
      </div>
    );
  }

  if (filteredIssues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-sakura-light/50 flex items-center justify-center mb-4">
          <span className="text-3xl">🎉</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">No Issues Found</h3>
        <p className="text-muted-foreground max-w-sm">
          {filter && filter !== 'all' 
            ? `No ${filter} issues reported yet. That's great news!`
            : 'No issues have been reported yet. Be the first to report a campus issue!'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {filteredIssues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            onClick={() => onIssueClick?.(issue)}
            onUpvote={onRefresh}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
