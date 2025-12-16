import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SakuraParticles from "@/components/SakuraParticles";
import { MessageCircle, Users, Camera, ExternalLink } from "lucide-react";

const links = [
  {
    name: "Discord",
    description: "Our primary hub for discussions, events, and voice chats",
    icon: MessageCircle,
    url: "#",
    color: "from-indigo-500 to-purple-600",
  },
  {
    name: "WhatsApp",
    description: "Quick updates and announcements for members",
    icon: Users,
    url: "#",
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Instagram",
    description: "Follow us for event highlights and community moments",
    icon: Camera,
    url: "#",
    color: "from-pink-500 to-rose-600",
  },
];

const Links = () => {
  return (
    <div className="min-h-screen bg-background">
      <SakuraParticles />
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-sakura-dark text-sm tracking-[0.2em] uppercase mb-4">
              Connect With Us
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Our Platforms
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join our community across multiple platforms. Each space serves a unique purpose in keeping us connected.
            </p>
          </motion.div>

          <div className="space-y-6">
            {links.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group flex items-center gap-6 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-sakura/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center flex-shrink-0`}>
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl text-foreground mb-1 group-hover:text-sakura-dark transition-colors">
                    {link.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {link.description}
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-sakura-dark transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Links;
