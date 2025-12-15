import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Smartphone, Camera, ExternalLink, Flower } from "lucide-react";
import { Button } from "@/components/ui/button";

const platforms = [
  {
    name: "Discord",
    icon: MessageCircle,
    description:
      "Our primary hub for structured discussions, announcements, and peer support. Organized channels for academics, events, and general conversations.",
    features: [
      "Topic-based channels",
      "Real-time discussions",
      "Peer support forums",
    ],
    color: "from-sakura-dark to-sakura",
    link: "#",
  },
  {
    name: "WhatsApp",
    icon: Smartphone,
    description:
      "Quick updates and onboarding. Stay informed about important announcements and connect with the community on the go.",
    features: [
      "Instant updates",
      "Easy onboarding",
      "Mobile-first access",
    ],
    color: "from-emerald-500 to-emerald-400",
    link: "#",
  },
  {
    name: "Instagram",
    icon: Camera,
    description:
      "Visual highlights of our community moments. Event coverage, member spotlights, and behind-the-scenes content.",
    features: [
      "Event highlights",
      "Community moments",
      "Visual updates",
    ],
    color: "from-rose-400 to-orange-300",
    link: "#",
  },
];

const PlatformsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="platforms"
      className="section-padding bg-secondary/50 relative overflow-hidden"
      ref={ref}
    >
      {/* Decorative */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-sakura/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-petal/10 rounded-full blur-3xl" />

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
            Where We Connect
          </span>
          <h2 className="section-title mt-3">Our Platforms</h2>
          <p className="section-subtitle">
            We use multiple platforms to ensure everyone can stay connected in
            the way that works best for them.
          </p>
        </motion.div>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="card-elevated overflow-hidden group"
            >
              {/* Gradient Header */}
              <div
                className={`h-2 bg-gradient-to-r ${platform.color}`}
              />

              <div className="p-6 lg:p-8">
                {/* Icon & Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}
                  >
                    <platform.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {platform.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {platform.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {platform.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-sakura rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={platform.link}>
                    Visit {platform.name}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;
