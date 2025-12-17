import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Calendar, MessageCircle, Lightbulb } from "lucide-react";

const activities = [
  {
    icon: Users,
    title: "Study Groups",
    description: "Collaborative learning sessions where peers help each other succeed academically."
  },
  {
    icon: Calendar,
    title: "Events & Meetups",
    description: "Regular gatherings to network, share ideas, and build lasting friendships."
  },
  {
    icon: MessageCircle,
    title: "Open Discussions",
    description: "Safe spaces for conversations about academics, career, and personal growth."
  },
  {
    icon: Lightbulb,
    title: "Skill Workshops",
    description: "Peer-led sessions covering everything from coding to communication skills."
  }
];

const ActivitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="activities" className="py-32 bg-background relative" ref={ref}>
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="text-sakura-dark text-xs tracking-[0.3em] uppercase mb-4 font-medium"
          >
            What We Do
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl text-foreground"
          >
            Activities & Initiatives
          </motion.h2>
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group flex gap-5 p-6 rounded-2xl bg-snow/50 border border-border/50 hover:border-sakura/30 hover:bg-snow transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-sakura-light/50 flex items-center justify-center group-hover:bg-sakura-light transition-colors duration-300">
                <activity.icon className="w-6 h-6 text-sakura-dark" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground mb-2">{activity.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
