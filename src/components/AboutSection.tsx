import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 bg-background relative" ref={ref}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="text-sakura-dark text-xs tracking-[0.3em] uppercase mb-6"
            >
              About Us
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl md:text-5xl text-foreground mb-6 leading-tight"
            >
              Building bridges,
              <br />not walls.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-foreground/70 text-lg leading-relaxed mb-8"
            >
              StudentConnect is a student-led initiative creating meaningful spaces 
              for peer learning, collaboration, and personal growth. We believe in 
              the power of community.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              {["Peer-Driven", "Collaborative", "Inclusive", "Open"].map((value, i) => (
                <span
                  key={value}
                  className="px-4 py-2 text-sm text-sakura-dark bg-sakura/10 rounded-full"
                >
                  {value}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Sakura illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-80 md:h-full flex items-center justify-center"
          >
            <svg viewBox="0 0 300 400" className="w-full max-w-xs h-auto opacity-30">
              {/* Branch */}
              <path
                d="M150 400 Q140 350 160 300 Q180 250 150 200 Q120 150 150 100 Q180 50 150 0"
                fill="none"
                stroke="hsl(25 30% 35%)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M150 200 Q100 180 60 200"
                fill="none"
                stroke="hsl(25 30% 35%)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M150 150 Q200 130 240 150"
                fill="none"
                stroke="hsl(25 30% 35%)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Blossoms */}
              {[
                { cx: 150, cy: 80, r: 25 },
                { cx: 130, cy: 120, r: 20 },
                { cx: 170, cy: 130, r: 22 },
                { cx: 100, cy: 180, r: 18 },
                { cx: 200, cy: 170, r: 20 },
                { cx: 60, cy: 200, r: 15 },
                { cx: 240, cy: 150, r: 15 },
              ].map((blossom, i) => (
                <g key={i}>
                  <circle
                    cx={blossom.cx}
                    cy={blossom.cy}
                    r={blossom.r}
                    fill="hsl(340 60% 85%)"
                  />
                  <circle
                    cx={blossom.cx}
                    cy={blossom.cy}
                    r={blossom.r * 0.3}
                    fill="hsl(45 70% 70%)"
                  />
                </g>
              ))}
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
