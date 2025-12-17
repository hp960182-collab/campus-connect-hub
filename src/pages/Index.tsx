import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import PlatformsSection from "@/components/PlatformsSection";
import GuidelinesSection from "@/components/GuidelinesSection";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";
import SakuraParticles from "@/components/SakuraParticles";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

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
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ActivitiesSection />
        <PlatformsSection />
        <GuidelinesSection />
        <JoinSection />
        <Footer />
      </motion.main>
    </>
  );
};

export default Index;
