import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SakuraParticles from "@/components/SakuraParticles";
import { Link } from "react-router-dom";

const teamMembers = [
  { name: "Core Team", role: "Leadership", initial: "CT", tag: "Core Team" },
  { name: "Events Lead", role: "Planning & Execution", initial: "EL", tag: "Lead" },
  { name: "Tech Lead", role: "Development & Tools", initial: "TL", tag: "Lead" },
  { name: "Community Lead", role: "Engagement & Support", initial: "CL", tag: "Lead" },
  { name: "Content Lead", role: "Media & Communications", initial: "CM", tag: "Lead" },
  { name: "Design Lead", role: "Visual Identity", initial: "DL", tag: "Lead" },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <SakuraParticles />
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-sakura-dark text-xs tracking-[0.3em] uppercase mb-4">
              The People
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Our Team
            </h1>
            <p className="text-foreground/60 max-w-md mx-auto">
              A dedicated group of students working together to build our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-sakura/20 to-accent/10 flex items-center justify-center border-2 border-transparent group-hover:border-sakura/30 transition-all duration-300">
                  <span className="font-display text-xl text-foreground/60 group-hover:text-foreground transition-colors">
                    {member.initial}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-foreground/50 text-sm mb-2">
                  {member.role}
                </p>
                <span className="inline-block px-3 py-1 text-xs text-sakura-dark bg-sakura/10 rounded-full">
                  {member.tag}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 text-center"
          >
            <p className="text-foreground/50 mb-3 text-sm">Want to be part of the team?</p>
            <Link 
              to="/join" 
              className="text-sakura-dark hover:text-sakura transition-colors font-medium text-sm"
            >
              Apply to join us →
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Team;
