import { cn } from "@/lib/utils";
import { Clock, Eye, Loader2, CheckCircle, XCircle } from "lucide-react";

type Status = 'reported' | 'acknowledged' | 'in_progress' | 'resolved' | 'closed';

interface StatusBadgeProps {
  status: Status;
  showIcon?: boolean;
  className?: string;
}

const statusConfig = {
  reported: {
    label: 'Reported',
    icon: Clock,
    className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
  },
  acknowledged: {
    label: 'Acknowledged',
    icon: Eye,
    className: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800'
  },
  in_progress: {
    label: 'In Progress',
    icon: Loader2,
    className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
  },
  resolved: {
    label: 'Resolved',
    icon: CheckCircle,
    className: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
  },
  closed: {
    label: 'Closed',
    icon: XCircle,
    className: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
  }
};

export function StatusBadge({ status, showIcon = true, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
      config.className,
      className
    )}>
      {showIcon && <Icon className={cn("w-3 h-3", status === 'in_progress' && "animate-spin")} />}
      {config.label}
    </span>
  );
}
