import { cn } from "@/lib/utils";
import { 
  Building, 
  Droplets, 
  Shield, 
  Wifi, 
  GraduationCap, 
  UtensilsCrossed, 
  Bus, 
  HelpCircle 
} from "lucide-react";

type Category = 'infrastructure' | 'hygiene' | 'safety' | 'internet' | 'classroom' | 'food' | 'transport' | 'other';

interface CategoryBadgeProps {
  category: Category;
  showIcon?: boolean;
  className?: string;
}

const categoryConfig = {
  infrastructure: {
    label: 'Infrastructure',
    icon: Building,
    className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
  },
  hygiene: {
    label: 'Hygiene',
    icon: Droplets,
    className: 'bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400 dark:border-cyan-800'
  },
  safety: {
    label: 'Safety',
    icon: Shield,
    className: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
  },
  internet: {
    label: 'Internet',
    icon: Wifi,
    className: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800'
  },
  classroom: {
    label: 'Classroom',
    icon: GraduationCap,
    className: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800'
  },
  food: {
    label: 'Food',
    icon: UtensilsCrossed,
    className: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
  },
  transport: {
    label: 'Transport',
    icon: Bus,
    className: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800'
  },
  other: {
    label: 'Other',
    icon: HelpCircle,
    className: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
  }
};

export function CategoryBadge({ category, showIcon = true, className }: CategoryBadgeProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
      config.className,
      className
    )}>
      {showIcon && <Icon className="w-3 h-3" />}
      {config.label}
    </span>
  );
}
