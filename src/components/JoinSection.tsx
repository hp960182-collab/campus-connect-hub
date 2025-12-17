import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const JoinSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="join" className="py-32 bg-snow relative overflow-hidden" ref={ref}>
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-sakura-light rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-sakura-light rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-sakura-dark text-xs tracking-[0.3em] uppercase mb-4 font-medium"
        >
          Ready to Connect?
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl md:text-6xl text-foreground mb-6"
        >
          Join Our Community
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto"
        >
          Be part of a supportive network of students helping each other grow, learn, and succeed together.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/join"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sakura text-snow rounded-full font-medium hover:bg-sakura-dark transition-all duration-300 hover:scale-105 shadow-lg shadow-sakura/25"
          >
            Join Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/team"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-sakura text-sakura-dark rounded-full font-medium hover:bg-sakura hover:text-snow transition-all duration-300"
          >
            Meet the Team
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinSection;
