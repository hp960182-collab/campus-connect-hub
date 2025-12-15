import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Mail, MessageCircle, Smartphone, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const JoinSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="join" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Header */}
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">
            Get Started
          </span>
          <h2 className="section-title mt-3">Join Our Community</h2>
          <p className="section-subtitle mb-12">
            Ready to be part of something meaningful? Connect with us through
            any of our platforms and become a valued member of StudentConnect.
          </p>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-8 lg:p-12 shadow-lg max-w-2xl mx-auto"
          >
            <h3 className="font-display text-2xl font-bold text-navy mb-6">
              Start Your Journey
            </h3>

            {/* Primary Action */}
            <Button variant="hero" size="lg" className="mb-8" asChild>
              <a href="#">
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Discord Server
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-border" />
              <span className="text-muted-foreground text-sm">
                or connect via
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Secondary Actions */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <Button variant="outline" asChild>
                <a href="#">
                  <Smartphone className="mr-2 h-4 w-4" />
                  WhatsApp Group
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#">
                  <Camera className="mr-2 h-4 w-4" />
                  Follow on Instagram
                </a>
              </Button>
            </div>

            {/* Contact */}
            <div className="pt-6 border-t border-border">
              <p className="text-muted-foreground text-sm mb-3">
                Questions? Reach out to us directly
              </p>
              <a
                href="mailto:studentconnect@college.edu"
                className="inline-flex items-center gap-2 text-navy hover:text-gold transition-colors font-medium"
              >
                <Mail className="h-4 w-4" />
                studentconnect@college.edu
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinSection;
