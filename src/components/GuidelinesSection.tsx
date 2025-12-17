import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Shield, Sparkles } from "lucide-react";

const guidelines = [
  {
    icon: Heart,
    title: "Respect & Kindness",
    description: "Treat every member with dignity. We celebrate diversity and welcome all perspectives."
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "This is a judgment-free zone. Share openly, listen actively, and support each other."
  },
  {
    icon: Sparkles,
    title: "Constructive Growth",
    description: "Feedback should uplift. We focus on solutions and celebrate every small win together."
  }
];

const GuidelinesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="guidelines" className="py-32 bg-gradient-to-b from-background to-sakura-light/20 relative" ref={ref}>
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="text-sakura-dark text-xs tracking-[0.3em] uppercase mb-4 font-medium"
          >
            Our Values
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl text-foreground"
          >
            Community Guidelines
          </motion.h2>
        </div>

        {/* Guidelines */}
        <div className="grid md:grid-cols-3 gap-8">
          {guidelines.map((guideline, index) => (
            <motion.div
              key={guideline.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sakura-light/50 flex items-center justify-center">
                <guideline.icon className="w-8 h-8 text-sakura-dark" />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-3">{guideline.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{guideline.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuidelinesSection;
