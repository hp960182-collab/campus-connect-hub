import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PlatformsSection from "@/components/PlatformsSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import GuidelinesSection from "@/components/GuidelinesSection";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PlatformsSection />
      <ActivitiesSection />
      <GuidelinesSection />
      <JoinSection />
      <Footer />
    </main>
  );
};

export default Index;
