import { motion } from "framer-motion";
import { Users, MessageCircle, Calendar, Star } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Active Members" },
  { icon: MessageCircle, value: "1.2K", label: "Daily Messages" },
  { icon: Calendar, value: "50+", label: "Events Hosted" },
  { icon: Star, value: "4.9", label: "Community Rating" },
];

const testimonials = [
  {
    text: "StudentConnect helped me find my study group and lifelong friends!",
    author: "Priya S.",
    role: "CS Student",
  },
  {
    text: "The Discord community is super active and helpful for doubt solving.",
    author: "Rahul M.",
    role: "Engineering",
  },
  {
    text: "Best platform to stay updated on campus events and opportunities.",
    author: "Ananya K.",
    role: "Design Student",
  },
];

const SocialProof = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container-main">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center p-6 bg-card rounded-2xl border border-border/50 hover-lift"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-sakura" />
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="text-center mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sakura-dark text-xs tracking-[0.3em] uppercase mb-2"
          >
            What Students Say
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-serif font-bold text-foreground"
          >
            Loved by Students
          </motion.h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-card p-6 rounded-2xl border border-border/50 hover-lift"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-sakura text-sakura" />
                ))}
              </div>
              <p className="text-foreground/90 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sakura/20 flex items-center justify-center">
                  <span className="text-sakura font-semibold text-sm">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
