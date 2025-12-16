import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  type: "petal" | "snow";
  rotation: number;
  swayAmount: number;
}

const SakuraParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    
    // Fewer, slower sakura petals with lower opacity
    for (let i = 0; i < 18; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 10 + 8,
        duration: Math.random() * 15 + 18, // Much slower: 18-33s
        delay: Math.random() * 12,
        type: "petal",
        rotation: Math.random() * 360,
        swayAmount: Math.random() * 60 + 30,
      });
    }
    
    // Fewer snowflakes
    for (let i = 18; i < 28; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 3 + 2,
        duration: Math.random() * 18 + 22, // Slower: 22-40s
        delay: Math.random() * 15,
        type: "snow",
        rotation: 0,
        swayAmount: Math.random() * 30 + 15,
      });
    }
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ y: -100, opacity: 0, rotate: particle.rotation, x: 0 }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, particle.swayAmount, -particle.swayAmount / 2, particle.swayAmount],
            opacity: particle.type === "petal" 
              ? [0, 0.35, 0.35, 0.3, 0]  // Lower opacity for petals
              : [0, 0.25, 0.25, 0.2, 0], // Even lower for snow
            rotate: particle.type === "petal" ? [particle.rotation, particle.rotation + 360] : [0, 180],
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
                background: `linear-gradient(135deg, hsl(340 70% 85%), hsl(350 65% 80%))`,
                borderRadius: "150% 0 150% 0",
              }}
            />
          ) : (
            <div
              className="w-full h-full rounded-full"
              style={{
                background: "white",
                filter: "blur(1px)",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default SakuraParticles;
