import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IssueCategory } from "@/hooks/useIssues";
import { 
  LayoutGrid, 
  Building, 
  Droplets, 
  Shield, 
  Wifi, 
  GraduationCap, 
  UtensilsCrossed, 
  Bus, 
  HelpCircle 
} from "lucide-react";

type TabFilter = IssueCategory | 'all';

interface CategoryTabsProps {
  activeTab: TabFilter;
  onTabChange: (tab: TabFilter) => void;
}

const tabs: { id: TabFilter; label: string; icon: typeof LayoutGrid }[] = [
  { id: 'all', label: 'All', icon: LayoutGrid },
  { id: 'infrastructure', label: 'Infrastructure', icon: Building },
  { id: 'hygiene', label: 'Hygiene', icon: Droplets },
  { id: 'safety', label: 'Safety', icon: Shield },
  { id: 'internet', label: 'Internet', icon: Wifi },
  { id: 'classroom', label: 'Classroom', icon: GraduationCap },
  { id: 'food', label: 'Food', icon: UtensilsCrossed },
  { id: 'transport', label: 'Transport', icon: Bus },
  { id: 'other', label: 'Other', icon: HelpCircle },
];

export function CategoryTabs({ activeTab, onTabChange }: CategoryTabsProps) {
  return (
    <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
      <div className="flex gap-2 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                isActive 
                  ? "text-sakura-dark" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 bg-sakura-light rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative flex items-center gap-1.5">
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
