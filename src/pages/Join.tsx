import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SakuraParticles from "@/components/SakuraParticles";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "Connect with like-minded peers",
  "Access exclusive events & workshops",
  "Collaborate on exciting projects",
  "Build lasting friendships",
  "Grow your skills together",
];

const Join = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SakuraParticles />
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-sakura-dark text-xs tracking-[0.3em] uppercase mb-4">
              Become Part of Us
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Join Our Community
            </h1>
            <p className="text-foreground/60 max-w-md mx-auto">
              Take the first step towards being part of something meaningful.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-display text-2xl text-foreground mb-6">
                Why Join?
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                    className="flex items-center gap-3 text-foreground/70"
                  >
                    <div className="w-5 h-5 rounded-full bg-sakura/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-sakura-dark" />
                    </div>
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm text-foreground/70 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-transparent border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-sakura/50 transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground/70 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-transparent border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-sakura/50 transition-colors"
                      placeholder="your@email.com"
                    />
                    <p className="text-xs text-foreground/40 mt-2">We'll only use this to reach out.</p>
                  </div>
                  <Button type="submit" variant="sakura" size="lg" className="w-full mt-2">
                    Join the Community
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-sakura/15 flex items-center justify-center">
                    <Check className="w-7 h-7 text-sakura-dark" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-2">
                    Thank You!
                  </h3>
                  <p className="text-foreground/60">
                    We've received your interest. We'll be in touch soon.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Join;
