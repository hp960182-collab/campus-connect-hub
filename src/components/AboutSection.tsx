import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Lightbulb, Heart, MessageSquare } from "lucide-react";

const values = [
  { icon: Users, label: "Peer-Driven", desc: "Led by students, for students" },
  { icon: Lightbulb, label: "Collaborative", desc: "Learning together grows us all" },
  { icon: Heart, label: "Inclusive", desc: "Everyone has a place here" },
  { icon: MessageSquare, label: "Open", desc: "Your voice matters to us" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 bg-background relative" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="text-sakura-dark text-sm tracking-[0.2em] uppercase mb-6"
          >
            About Us
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-relaxed"
          >
            Building bridges, not walls.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            StudentConnect is a student-led initiative creating meaningful spaces for peer learning, 
            collaboration, and personal growth. We believe in the power of community.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {values.map((value, i) => (
            <motion.div
              key={value.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="text-center group"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-sakura/10 flex items-center justify-center group-hover:bg-sakura/20 transition-colors">
                <value.icon className="w-5 h-5 text-sakura-dark" />
              </div>
              <h3 className="font-display text-foreground mb-1">{value.label}</h3>
              <p className="text-muted-foreground text-sm">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
