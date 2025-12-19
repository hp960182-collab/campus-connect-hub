import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Calendar, MessageCircle, Lightbulb } from "lucide-react";

const activities = [
  {
    icon: Users,
    title: "Study Groups",
    description: "Collaborative learning sessions where peers help each other succeed academically.",
    tag: "Popular"
  },
  {
    icon: Calendar,
    title: "Events & Meetups",
    description: "Regular gatherings to network, share ideas, and build lasting friendships.",
    tag: "Upcoming"
  },
  {
    icon: MessageCircle,
    title: "Open Discussions",
    description: "Safe spaces for conversations about academics, career, and personal growth.",
    tag: null
  },
  {
    icon: Lightbulb,
    title: "Skill Workshops",
    description: "Peer-led sessions covering everything from coding to communication skills.",
    tag: "New"
  }
];

const ActivitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="activities" className="section-padding-lg bg-background relative border-t border-border/30" ref={ref}>
      <div className="container-main">
        {/* Header */}
        <div className="section-header">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="section-eyebrow"
          >
            What We Do
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title"
          >
            Discover Activities
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-description"
          >
            Explore our initiatives designed to help you learn, grow, and connect.
          </motion.p>
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group card-base flex gap-5 cursor-pointer"
            >
              <div className="icon-box group-hover:bg-sakura-light group-hover:scale-105">
                <activity.icon className="w-6 h-6 text-sakura-dark" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-serif text-xl text-foreground">{activity.title}</h3>
                  {activity.tag && (
                    <span className={`badge ${activity.tag === 'New' ? 'badge-new' : 'badge-sakura'}`}>
                      {activity.tag}
                    </span>
                  )}
                </div>
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
