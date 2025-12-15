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
    
    // Create more sakura petals
    for (let i = 0; i < 35; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 16 + 10,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 15,
        type: "petal",
        rotation: Math.random() * 360,
        swayAmount: Math.random() * 150 + 50,
      });
    }
    
    // Create snowflakes
    for (let i = 35; i < 60; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 5 + 2,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 10,
        type: "snow",
        rotation: 0,
        swayAmount: Math.random() * 40 + 20,
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
            opacity: [0, 1, 1, 0.8, 0],
            rotate: particle.type === "petal" ? [particle.rotation, particle.rotation + 720] : [0, 360],
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
                background: `linear-gradient(135deg, hsl(340 75% 85%), hsl(350 70% 78%))`,
                borderRadius: "150% 0 150% 0",
                boxShadow: "0 2px 10px hsl(340 60% 70% / 0.4)",
              }}
            />
          ) : (
            <div
              className="w-full h-full rounded-full"
              style={{
                background: "radial-gradient(circle, white 0%, transparent 70%)",
                boxShadow: "0 0 10px white",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default SakuraParticles;
