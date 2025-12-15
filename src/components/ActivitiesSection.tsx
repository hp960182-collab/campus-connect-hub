import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  BookOpen,
  Calendar,
  MessageSquareQuote,
  Users2,
  Utensils,
  Shield,
  Flower,
} from "lucide-react";

const activities = [
  {
    icon: BookOpen,
    title: "Academic Discussions",
    description:
      "Peer-to-peer academic support, study groups, and collaborative learning sessions across various subjects and disciplines.",
  },
  {
    icon: Calendar,
    title: "Events & Activities",
    description:
      "Regular events, workshops, and engagement activities designed to bring students together and enhance campus life.",
  },
  {
    icon: Utensils,
    title: "Canteen Feedback",
    description:
      "A dedicated channel for constructive feedback on dining services, helping improve the campus food experience for everyone.",
  },
  {
    icon: MessageSquareQuote,
    title: "Anonymous Feedback",
    description:
      "A moderated, respectful space for sharing constructive suggestions and feedback about campus life while maintaining privacy.",
  },
  {
    icon: Users2,
    title: "Student Networking",
    description:
      "Connect with peers across departments, find study partners, collaborate on projects, and build lasting relationships.",
  },
  {
    icon: Shield,
    title: "Moderated Community",
    description:
      "A safe, inclusive environment with active moderation ensuring respectful dialogue and constructive interactions.",
  },
];

const ActivitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="activities" className="section-padding bg-background relative overflow-hidden" ref={ref}>
      {/* Decorative */}
      <div className="absolute top-40 right-0 w-72 h-72 bg-sakura/5 rounded-full blur-3xl" />
      
      <div className="container-wide mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sakura-dark font-semibold text-sm uppercase tracking-wider">
            <Flower className="w-4 h-4" />
            What We Do
          </span>
          <h2 className="section-title mt-3">Activities & Features</h2>
          <p className="section-subtitle">
            From academic support to campus feedback, we provide multiple
            avenues for meaningful student engagement.
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              className="group p-6 lg:p-8 rounded-2xl border border-border bg-card hover:border-sakura/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-sakura/10 group-hover:bg-sakura/20 flex items-center justify-center mb-5 transition-colors duration-300">
                <activity.icon className="w-7 h-7 text-sakura-dark group-hover:text-sakura transition-colors duration-300" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {activity.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {activity.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
