import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const GuidelinesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="guidelines" className="py-32 bg-foreground relative" ref={ref}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-sakura text-sm tracking-[0.2em] uppercase mb-6"
        >
          Guidelines
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-3xl md:text-4xl text-background mb-12"
        >
          Respect. Support. Grow.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-background/60 text-lg leading-relaxed"
        >
          Constructive feedback only. Zero tolerance for harassment. 
          Moderated for a safe, inclusive environment.
        </motion.p>
      </div>
    </section>
  );
};

export default GuidelinesSection;
