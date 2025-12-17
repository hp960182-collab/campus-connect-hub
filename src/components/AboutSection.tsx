import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 bg-snow relative overflow-hidden" ref={ref}>
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sakura-light/10 to-transparent" />
      
      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="text-sakura-dark text-xs tracking-[0.3em] uppercase mb-6 font-medium"
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
              <br />
              <span className="text-sakura-dark">not walls.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-muted-foreground text-lg leading-relaxed mb-8"
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
              {["Peer-Driven", "Collaborative", "Inclusive", "Open"].map((value) => (
                <span
                  key={value}
                  className="px-4 py-2 text-sm text-sakura-dark bg-sakura-light/50 rounded-full font-medium"
                >
                  {value}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Sakura Tree Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-96 md:h-[450px] flex items-center justify-center"
          >
            <svg viewBox="0 0 300 450" className="w-full max-w-sm h-auto">
              {/* Main trunk */}
              <path
                d="M150 450 Q145 400 155 350 Q165 300 150 250 Q135 200 150 150 Q165 100 150 50"
                fill="none"
                stroke="hsl(25 35% 30%)"
                strokeWidth="8"
                strokeLinecap="round"
                className="drop-shadow-sm"
              />
              
              {/* Left branches */}
              <path
                d="M150 280 Q100 260 50 280"
                fill="none"
                stroke="hsl(25 35% 30%)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M150 200 Q90 170 40 190"
                fill="none"
                stroke="hsl(25 35% 30%)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M150 130 Q110 100 70 110"
                fill="none"
                stroke="hsl(25 35% 30%)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              
              {/* Right branches */}
              <path
                d="M150 250 Q200 230 250 250"
                fill="none"
                stroke="hsl(25 35% 30%)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M150 170 Q210 140 260 160"
                fill="none"
                stroke="hsl(25 35% 30%)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M150 100 Q190 70 230 80"
                fill="none"
                stroke="hsl(25 35% 30%)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              
              {/* Sakura blossoms - clusters */}
              {[
                // Top cluster
                { cx: 150, cy: 50, r: 22 },
                { cx: 130, cy: 70, r: 18 },
                { cx: 170, cy: 65, r: 16 },
                // Right upper branch
                { cx: 230, cy: 80, r: 20 },
                { cx: 250, cy: 95, r: 15 },
                { cx: 215, cy: 95, r: 14 },
                // Right middle branch
                { cx: 260, cy: 160, r: 22 },
                { cx: 240, cy: 145, r: 16 },
                { cx: 275, cy: 175, r: 14 },
                // Right lower branch
                { cx: 250, cy: 250, r: 20 },
                { cx: 230, cy: 235, r: 16 },
                { cx: 265, cy: 265, r: 14 },
                // Left upper branch
                { cx: 70, cy: 110, r: 18 },
                { cx: 55, cy: 125, r: 14 },
                { cx: 85, cy: 95, r: 12 },
                // Left middle branch
                { cx: 40, cy: 190, r: 20 },
                { cx: 25, cy: 205, r: 15 },
                { cx: 55, cy: 175, r: 14 },
                // Left lower branch
                { cx: 50, cy: 280, r: 22 },
                { cx: 35, cy: 265, r: 16 },
                { cx: 65, cy: 295, r: 14 },
                // Middle accents
                { cx: 140, cy: 150, r: 12 },
                { cx: 160, cy: 180, r: 10 },
                { cx: 135, cy: 220, r: 11 },
              ].map((blossom, i) => (
                <g key={i}>
                  {/* Outer glow */}
                  <circle
                    cx={blossom.cx}
                    cy={blossom.cy}
                    r={blossom.r + 4}
                    fill="hsl(340 80% 90%)"
                    opacity="0.3"
                  />
                  {/* Main blossom */}
                  <circle
                    cx={blossom.cx}
                    cy={blossom.cy}
                    r={blossom.r}
                    fill="hsl(340 70% 82%)"
                  />
                  {/* Inner highlight */}
                  <circle
                    cx={blossom.cx - blossom.r * 0.2}
                    cy={blossom.cy - blossom.r * 0.2}
                    r={blossom.r * 0.4}
                    fill="hsl(340 80% 92%)"
                    opacity="0.8"
                  />
                  {/* Center */}
                  <circle
                    cx={blossom.cx}
                    cy={blossom.cy}
                    r={blossom.r * 0.2}
                    fill="hsl(45 80% 65%)"
                  />
                </g>
              ))}
              
              {/* Falling petals */}
              {[
                { x: 180, y: 320, rotate: 45 },
                { x: 100, y: 350, rotate: -30 },
                { x: 220, y: 380, rotate: 60 },
                { x: 80, y: 400, rotate: -45 },
                { x: 200, y: 420, rotate: 30 },
              ].map((petal, i) => (
                <ellipse
                  key={i}
                  cx={petal.x}
                  cy={petal.y}
                  rx="6"
                  ry="4"
                  fill="hsl(340 70% 82%)"
                  opacity="0.6"
                  transform={`rotate(${petal.rotate} ${petal.x} ${petal.y})`}
                />
              ))}
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
