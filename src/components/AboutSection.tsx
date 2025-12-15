import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Users, MessageSquare, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Peer-Driven",
    description: "Built by students, for students",
  },
  {
    icon: MessageSquare,
    title: "Collaborative",
    description: "Open dialogue and shared learning",
  },
  {
    icon: Lightbulb,
    title: "Innovative",
    description: "Fresh ideas and creative solutions",
  },
  {
    icon: Target,
    title: "Inclusive",
    description: "Everyone's voice matters equally",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="container-wide mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
            <h2 className="section-title mt-3">
              A Community Built on{" "}
              <span className="text-gold">Connection</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              StudentConnect is a student-led initiative designed to bridge the
              gap between academic life and campus experience. We believe in the
              power of peer collaboration, constructive feedback, and meaningful
              engagement.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our mission is simple: create a supportive digital space where
              every student can share ideas, seek guidance, participate in
              discussions, and contribute to improving campus life. Whether
              it's academic support, event coordination, or voicing feedback,
              we're here to amplify student voices.
            </p>

            {/* Vision Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gold rounded-full mt-2" />
                <p className="text-foreground">
                  Foster meaningful peer-to-peer connections across campus
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gold rounded-full mt-2" />
                <p className="text-foreground">
                  Provide platforms for constructive dialogue and feedback
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gold rounded-full mt-2" />
                <p className="text-foreground">
                  Create opportunities for collaboration and growth
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - Values Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="card-elevated p-6 text-center"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-lg font-semibold text-navy mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
