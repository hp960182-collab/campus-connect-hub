import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Smartphone, Camera } from "lucide-react";

const platforms = [
  { name: "Discord", icon: MessageCircle, desc: "Discussions & support" },
  { name: "WhatsApp", icon: Smartphone, desc: "Quick updates" },
  { name: "Instagram", icon: Camera, desc: "Community moments" },
];

const PlatformsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="platforms" className="py-32 bg-secondary/30 relative" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-sakura-dark text-sm tracking-[0.2em] uppercase mb-6 text-center"
        >
          Platforms
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-3xl md:text-4xl text-foreground mb-20 text-center"
        >
          Connect your way
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-16">
          {platforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              className="group text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sakura/10 flex items-center justify-center group-hover:bg-sakura/20 transition-colors duration-500">
                <platform.icon className="w-7 h-7 text-sakura-dark" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-sakura-dark transition-colors">
                {platform.name}
              </h3>
              <p className="text-muted-foreground text-sm">{platform.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;
