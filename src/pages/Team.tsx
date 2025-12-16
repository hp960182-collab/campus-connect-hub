import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SakuraParticles from "@/components/SakuraParticles";

const teamMembers = [
  { name: "Core Team", role: "Leadership", initial: "CT" },
  { name: "Events Lead", role: "Planning & Execution", initial: "EL" },
  { name: "Tech Lead", role: "Development & Tools", initial: "TL" },
  { name: "Community Lead", role: "Engagement & Support", initial: "CL" },
  { name: "Content Lead", role: "Media & Communications", initial: "CM" },
  { name: "Design Lead", role: "Visual Identity", initial: "DL" },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <SakuraParticles />
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-sakura-dark text-sm tracking-[0.2em] uppercase mb-4">
              The People
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Our Team
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A dedicated group of students working together to build and nurture our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-sakura/30 to-accent/20 flex items-center justify-center group-hover:from-sakura/50 group-hover:to-accent/40 transition-all duration-300">
                  <span className="font-display text-2xl text-foreground/70 group-hover:text-foreground transition-colors">
                    {member.initial}
                  </span>
                </div>
                <h3 className="font-display text-lg text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <p className="text-muted-foreground mb-2">Want to be part of the team?</p>
            <a 
              href="/join" 
              className="text-sakura-dark hover:text-sakura transition-colors font-medium"
            >
              Apply to join us →
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Team;
