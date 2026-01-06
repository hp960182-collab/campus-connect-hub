import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CategoryFilter } from "@/pages/CampusLoop";

interface CampusNavbarProps {
  activeTab: CategoryFilter;
  onTabChange: (tab: CategoryFilter) => void;
  onAISearchClick: () => void;
}

const CampusNavbar = ({ activeTab, onTabChange, onAISearchClick }: CampusNavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sakura to-sakura-dark flex items-center justify-center">
              <span className="text-white text-sm font-bold">CL</span>
            </div>
            <span className="font-display text-lg font-semibold hidden sm:block">
              CampusLoop
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: "all", label: "All Posts" },
              { id: "lost", label: "Lost & Found" },
              { id: "confession", label: "Confessions" },
              { id: "event", label: "Events" },
              { id: "club", label: "Clubs" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as CategoryFilter)}
                className={`nav-link ${activeTab === tab.id ? "nav-link-active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onAISearchClick}
              className="gap-2 text-sakura hover:text-sakura-dark hover:bg-sakura-light/50"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">AI Search</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground/70 hover:text-foreground"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border/50 bg-card"
        >
          <div className="container-main py-4 space-y-2">
            {[
              { id: "all", label: "🧵 All Posts" },
              { id: "lost", label: "🔍 Lost & Found" },
              { id: "confession", label: "😶 Confessions" },
              { id: "event", label: "📅 Events" },
              { id: "club", label: "🎭 Clubs" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id as CategoryFilter);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? "bg-sakura-light text-sakura-dark font-medium"
                    : "text-foreground/70 hover:bg-secondary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default CampusNavbar;
