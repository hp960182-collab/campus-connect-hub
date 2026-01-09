import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { PulseNavbar } from "@/components/pulse/PulseNavbar";
import { IssueFeed } from "@/components/pulse/IssueFeed";
import { CategoryTabs } from "@/components/pulse/CategoryTabs";
import { ReportIssueModal } from "@/components/pulse/ReportIssueModal";
import { AuthModal } from "@/components/pulse/AuthModal";
import { useIssues, IssueCategory } from "@/hooks/useIssues";
import { useAuth } from "@/hooks/useAuth";
import SakuraParticles from "@/components/SakuraParticles";
import LoadingScreen from "@/components/LoadingScreen";

type TabFilter = IssueCategory | 'all';

export default function CampusPulse() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabFilter>('all');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const { issues, isLoading: issuesLoading, refetch } = useIssues(activeTab);
  const { user } = useAuth();

  const handleReportClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setIsReportModalOpen(true);
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <motion.main
        className="min-h-screen relative bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <SakuraParticles />
        <PulseNavbar onSignInClick={() => setIsAuthModalOpen(true)} />
        
        {/* Main Content */}
        <div className="pt-20 pb-24 container-main">
          {/* Hero */}
          <div className="text-center py-8 md:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sakura-light/50 text-sakura-dark text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                AI-Powered Campus Issue Tracking
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-semibold mb-3">
                Campus<span className="text-gradient-sakura">Pulse</span>
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Report campus issues in plain English. Our AI categorizes, prioritizes, and routes them automatically.
              </p>
            </motion.div>
          </div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </motion.div>

          {/* Issues Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <IssueFeed 
              issues={issues} 
              isLoading={issuesLoading} 
              filter={activeTab}
              onRefresh={refetch}
            />
          </motion.div>
        </div>

        {/* Floating Action Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          onClick={handleReportClick}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-sakura to-sakura-dark text-white shadow-lg hover:shadow-sakura transition-shadow flex items-center justify-center z-40"
        >
          <Plus className="w-6 h-6" />
        </motion.button>

        {/* Modals */}
        <ReportIssueModal 
          isOpen={isReportModalOpen} 
          onClose={() => setIsReportModalOpen(false)}
          onSuccess={refetch}
        />
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </motion.main>
    </>
  );
}
