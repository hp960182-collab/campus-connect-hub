import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  type: "petal" | "snow";
}

const SakuraParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    
    // Create sakura petals
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 12 + 8,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 10,
        type: "petal",
      });
    }
    
    // Create snowflakes
    for (let i = 15; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 8 + 12,
        delay: Math.random() * 8,
        type: "snow",
      });
    }
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={particle.type === "petal" ? "absolute" : "absolute"}
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ y: -50, opacity: 0, rotate: 0 }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, particle.type === "petal" ? 100 : 30],
            opacity: [0, 0.8, 0.8, 0],
            rotate: particle.type === "petal" ? [0, 720] : [0, 360],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {particle.type === "petal" ? (
            <div
              className="w-full h-full"
              style={{
                background: "linear-gradient(135deg, hsl(340 70% 88%), hsl(350 65% 75%))",
                borderRadius: "150% 0 150% 0",
                boxShadow: "0 2px 8px hsl(340 60% 65% / 0.3)",
              }}
            />
          ) : (
            <div
              className="w-full h-full rounded-full"
              style={{
                background: "white",
                filter: "blur(0.5px)",
                boxShadow: "0 0 8px white",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default SakuraParticles;
