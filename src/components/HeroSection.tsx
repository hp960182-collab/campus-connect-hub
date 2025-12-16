import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Sakura petals falling in snow"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-[1100px] mx-auto px-6 text-center py-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-sakura-dark text-xs tracking-[0.4em] uppercase mb-6"
        >
          Student Community
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-foreground mb-4 leading-[0.95]"
        >
          Connect.
          <br />
          <span className="text-gradient-sakura">Thrive.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-foreground/70 text-lg md:text-xl max-w-xl mx-auto mb-4"
        >
          A student-led community fostering peer learning, collaboration, and meaningful connections.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-muted-foreground/60 text-sm tracking-wide mb-10"
        >
          DYPIU · Student-run community club
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="sakura" size="lg" asChild className="min-w-[160px]">
            <a href="/join">
              Join Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild className="min-w-[160px]">
            <a href="/links">
              Our Platforms
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-foreground/20 rounded-full flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-1 bg-sakura rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
