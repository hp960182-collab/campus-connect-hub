import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SakuraParticles from "@/components/SakuraParticles";
import LoadingScreen from "@/components/LoadingScreen";
import CampusNavbar from "@/components/campus/CampusNavbar";
import PostFeed from "@/components/campus/PostFeed";
import CreatePostModal from "@/components/campus/CreatePostModal";
import AISearchPanel from "@/components/campus/AISearchPanel";
import { Button } from "@/components/ui/button";
import { Plus, Search, Sparkles } from "lucide-react";

export type CategoryFilter = "all" | "lost" | "found" | "confession" | "event" | "club";

const CampusLoop = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showAISearch, setShowAISearch] = useState(false);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <motion.div 
        className="min-h-screen bg-background relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <SakuraParticles />
        
        <CampusNavbar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          onAISearchClick={() => setShowAISearch(true)}
        />

        {/* Main Content */}
        <main className="pt-20 pb-24 md:pb-8">
          <div className="container-main">
            {/* Header */}
            <motion.div 
              className="text-center py-8 md:py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display mb-3">
                <span className="text-gradient-sakura">CampusLoop</span>
                <span className="text-foreground/80"> AI</span>
              </h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
                Post anything. AI organizes everything.
              </p>
            </motion.div>

            {/* Tab Pills */}
            <motion.div 
              className="flex flex-wrap justify-center gap-2 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { id: "all", label: "🧵 All Posts", emoji: "🧵" },
                { id: "lost", label: "🔍 Lost & Found", emoji: "🔍" },
                { id: "confession", label: "😶 Confessions", emoji: "😶" },
                { id: "event", label: "📅 Events", emoji: "📅" },
                { id: "club", label: "🎭 Clubs", emoji: "🎭" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as CategoryFilter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-sakura"
                      : "bg-secondary/60 text-secondary-foreground hover:bg-secondary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>

            {/* Post Feed */}
            <PostFeed filter={activeTab} />
          </div>
        </main>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 flex flex-col gap-3 z-40">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <Button
              onClick={() => setShowAISearch(true)}
              size="lg"
              variant="outline"
              className="rounded-full w-14 h-14 p-0 bg-card border-sakura/30 shadow-lg hover:shadow-sakura hover:border-sakura"
            >
              <Sparkles className="w-5 h-5 text-sakura" />
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <Button
              onClick={() => setShowCreatePost(true)}
              size="lg"
              className="rounded-full w-14 h-14 p-0 btn-primary"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </motion.div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border md:hidden z-50">
          <div className="flex justify-around py-2">
            {[
              { id: "all", label: "Home", icon: "🧵" },
              { id: "lost", label: "Lost", icon: "🔍" },
              { id: "confession", label: "Confess", icon: "😶" },
              { id: "event", label: "Events", icon: "📅" },
              { id: "club", label: "Clubs", icon: "🎭" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CategoryFilter)}
                className={`flex flex-col items-center py-1 px-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-xs mt-0.5">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modals */}
        <CreatePostModal 
          isOpen={showCreatePost} 
          onClose={() => setShowCreatePost(false)} 
        />
        
        <AISearchPanel 
          isOpen={showAISearch} 
          onClose={() => setShowAISearch(false)} 
        />
      </motion.div>
    </>
  );
};

export default CampusLoop;
