import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const socialLinks = {
  discord: {
    deepLink: "discord://discord.com/invite/dypiu",
    webLink: "https://discord.gg/dypiu?source=studentconnect_hero",
  },
  instagram: {
    deepLink: "instagram://user?username=dypiu.studentconnect",
    webLink: "https://instagram.com/dypiu.studentconnect?source=studentconnect_hero",
  },
  whatsapp: {
    deepLink: "whatsapp://send?phone=919876543210&text=Hi! I want to join StudentConnect",
    webLink: "https://wa.me/919876543210?text=Hi!%20I%20want%20to%20join%20StudentConnect&source=studentconnect_hero",
  },
};

const HeroSection = () => {
  const handleJoinCommunity = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const { deepLink, webLink } = socialLinks.discord;
    
    if (isMobile) {
      const timeout = setTimeout(() => {
        window.open(webLink, "_blank");
      }, 300);
      
      window.location.href = deepLink;
      window.addEventListener("blur", () => clearTimeout(timeout), { once: true });
    } else {
      window.open(webLink, "_blank");
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with lazy loading hint */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Sakura petals falling in snow"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-20 container-main text-center py-24 md:py-32 px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sakura-dark text-xs tracking-[0.4em] uppercase mb-4 md:mb-6 font-medium"
        >
          Student Community
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-bold text-foreground mb-4 md:mb-6 leading-[0.95]"
        >
          Connect.
          <br />
          <span className="text-gradient-sakura">Thrive.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-foreground/80 text-base md:text-lg max-w-md mx-auto mb-3 leading-relaxed"
        >
          A student-led community fostering peer learning, collaboration, and meaningful connections.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-muted-foreground text-sm tracking-wide mb-8 md:mb-10"
        >
          DYPIU · Student-run community club
        </motion.p>

        {/* Primary CTA - Join the Community */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col items-center gap-4 mb-6"
        >
          <Button 
            variant="hero" 
            size="lg" 
            onClick={handleJoinCommunity}
            className="min-w-[200px] min-h-[52px] text-base font-semibold shadow-lg hover:shadow-xl"
          >
            Join the Community
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        {/* Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button variant="hero-outline" size="lg" asChild className="min-w-[140px] min-h-[48px]">
            <a href="/join">
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="lg" asChild className="min-w-[140px] min-h-[48px] text-foreground/70 hover:text-foreground">
            <a href="/links">
              View All Platforms
            </a>
          </Button>
        </motion.div>

        {/* Quick social icons for desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="hidden md:flex items-center justify-center gap-4 mt-10"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Find us on</span>
          <div className="flex gap-3">
            <a
              href={socialLinks.discord.webLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
              aria-label="Discord"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-foreground/60 hover:fill-foreground transition-colors">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a
              href={socialLinks.instagram.webLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-foreground/60 hover:fill-foreground transition-colors">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a
              href={socialLinks.whatsapp.webLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-foreground/60 hover:fill-foreground transition-colors">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator - hidden on mobile to save space */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-9 border-2 border-foreground/20 rounded-full flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 bg-sakura rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
