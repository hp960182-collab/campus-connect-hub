import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
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
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/20 to-foreground/40" />
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-sakura/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-48 h-48 bg-petal/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative z-10 container-narrow mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm text-sakura-dark border border-sakura/40 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Student-Led Community
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
        >
          Connect. Collaborate.{" "}
          <span className="text-gradient-sakura">Thrive.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A student-led digital community fostering peer learning, meaningful
          engagement, and campus collaboration. Your voice matters here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="sakura" size="lg" asChild>
            <a href="#join">
              Join Our Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="lg" className="border-foreground/30 text-foreground hover:bg-foreground/10 rounded-full" asChild>
            <a href="#about">
              Learn More
            </a>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 flex items-center justify-center gap-8"
        >
          <span className="text-foreground/50 text-sm">Find us on:</span>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-foreground/60 hover:text-sakura-dark transition-colors text-sm font-medium"
            >
              Discord
            </a>
            <a
              href="#"
              className="text-foreground/60 hover:text-sakura-dark transition-colors text-sm font-medium"
            >
              WhatsApp
            </a>
            <a
              href="#"
              className="text-foreground/60 hover:text-sakura-dark transition-colors text-sm font-medium"
            >
              Instagram
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 bg-sakura rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
