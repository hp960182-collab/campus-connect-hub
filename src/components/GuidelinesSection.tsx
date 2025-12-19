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
    <section id="guidelines" className="section-padding-lg bg-background relative border-t border-border/30" ref={ref}>
      <div className="container-main">
        {/* Header */}
        <div className="section-header">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="section-eyebrow"
          >
            Our Values
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title"
          >
            Community Guidelines
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-description"
          >
            The principles that guide our community and make it a welcoming space for everyone.
          </motion.p>
        </div>

        {/* Guidelines */}
        <div className="grid md:grid-cols-3 gap-8">
          {guidelines.map((guideline, index) => (
            <motion.div
              key={guideline.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="text-center group"
            >
              <div className="icon-box-lg mx-auto mb-6 group-hover:bg-sakura-light group-hover:scale-105">
                <guideline.icon className="w-7 h-7 text-sakura-dark" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-3">{guideline.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{guideline.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuidelinesSection;
