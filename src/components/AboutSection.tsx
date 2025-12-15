import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 bg-background relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-sakura-dark text-sm tracking-[0.2em] uppercase mb-6"
        >
          About
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-8 leading-relaxed"
        >
          A student-led space for peer learning, collaboration, and growth.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-12 mt-16"
        >
          {["Peer-Driven", "Collaborative", "Inclusive"].map((value, i) => (
            <motion.span
              key={value}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              className="text-muted-foreground text-sm tracking-wide"
            >
              {value}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
