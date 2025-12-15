import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const activities = [
  "Academic Discussions",
  "Events & Workshops", 
  "Anonymous Feedback",
  "Student Networking",
];

const ActivitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="activities" className="py-32 bg-background relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-sakura-dark text-sm tracking-[0.2em] uppercase mb-6"
        >
          Activities
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-3xl md:text-4xl text-foreground mb-16"
        >
          What we do
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          {activities.map((activity, index) => (
            <motion.span
              key={activity}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-foreground/80 text-lg md:text-xl font-display"
            >
              {activity}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
