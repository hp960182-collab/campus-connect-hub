import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, AlertTriangle, XCircle, Heart, Flower } from "lucide-react";

const guidelines = [
  {
    icon: Heart,
    title: "Respectful Communication",
    description:
      "Treat every member with respect and dignity. Engage in discussions with empathy and understanding, even when opinions differ.",
    type: "positive",
  },
  {
    icon: CheckCircle,
    title: "Constructive Feedback Only",
    description:
      "When providing feedback, focus on being helpful and solution-oriented. Criticism should aim to improve, not to tear down.",
    type: "positive",
  },
  {
    icon: AlertTriangle,
    title: "Moderated Discussions",
    description:
      "All community spaces are actively moderated to maintain a healthy environment. Moderators may edit or remove content that violates guidelines.",
    type: "warning",
  },
  {
    icon: XCircle,
    title: "Zero Tolerance Policy",
    description:
      "Harassment, bullying, discrimination, or any form of abuse will result in immediate removal from the community. No exceptions.",
    type: "strict",
  },
];

const GuidelinesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getIconColor = (type: string) => {
    switch (type) {
      case "positive":
        return "text-emerald-600 bg-emerald-100";
      case "warning":
        return "text-amber-600 bg-amber-100";
      case "strict":
        return "text-rose-600 bg-rose-100";
      default:
        return "text-foreground bg-sakura/10";
    }
  };

  return (
    <section
      id="guidelines"
      className="section-padding bg-foreground relative overflow-hidden"
      ref={ref}
    >
      {/* Decorative */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-sakura/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-petal/10 rounded-full blur-3xl" />

      <div className="container-wide mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sakura font-semibold text-sm uppercase tracking-wider">
            <Flower className="w-4 h-4" />
            Community Standards
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-4 mt-3">
            Rules & Ethics
          </h2>
          <p className="text-lg md:text-xl text-background/70 max-w-2xl mx-auto">
            A great community is built on mutual respect and shared values.
            Here's what we expect from every member.
          </p>
        </motion.div>

        {/* Guidelines Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {guidelines.map((guideline, index) => (
            <motion.div
              key={guideline.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-2xl p-6 lg:p-8"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${getIconColor(
                    guideline.type
                  )}`}
                >
                  <guideline.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-background mb-2">
                    {guideline.title}
                  </h3>
                  <p className="text-background/70 leading-relaxed">
                    {guideline.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-background/60 text-sm max-w-2xl mx-auto">
            By joining our community, you agree to abide by these guidelines.
            Our moderators are students like you, working to maintain a positive
            environment for everyone.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GuidelinesSection;
