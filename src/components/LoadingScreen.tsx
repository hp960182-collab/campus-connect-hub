import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
}

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [phase, setPhase] = useState<"petals" | "fade">("petals");

  useEffect(() => {
    // Create initial burst of petals
    const newPetals: Petal[] = [];
    for (let i = 0; i < 40; i++) {
      newPetals.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 20 + 12,
        delay: Math.random() * 0.8,
        duration: Math.random() * 2 + 2,
      });
    }
    setPetals(newPetals);

    // Start fade after petals have fallen
    const fadeTimer = setTimeout(() => {
      setPhase("fade");
    }, 2500);

    // Complete loading
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "fade" || true ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "hsl(0 0% 98%)" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "fade" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Sakura branch silhouette at top */}
          <div className="absolute top-0 right-0 w-full h-64 opacity-20">
            <svg viewBox="0 0 800 200" className="w-full h-full" preserveAspectRatio="xMaxYMin slice">
              <path
                d="M800 0 Q750 50 700 30 Q650 60 600 40 Q550 70 500 50 Q450 80 400 60 Q350 40 300 70 Q250 50 200 80 Q150 60 100 90 L100 0 Z"
                fill="hsl(340 40% 70%)"
              />
            </svg>
          </div>

          {/* Falling petals */}
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              className="absolute"
              style={{
                left: `${petal.x}%`,
                top: -50,
                width: petal.size,
                height: petal.size,
              }}
              initial={{ y: -50, opacity: 0, rotate: 0, x: 0 }}
              animate={{
                y: ["0vh", "110vh"],
                opacity: [0, 1, 1, 0.8],
                rotate: [0, 360, 720],
                x: [0, 30, -20, 40],
              }}
              transition={{
                duration: petal.duration,
                delay: petal.delay,
                ease: "easeIn",
              }}
            >
              <div
                className="w-full h-full"
                style={{
                  background: "linear-gradient(135deg, hsl(340 70% 85%), hsl(350 65% 78%))",
                  borderRadius: "150% 0 150% 0",
                  boxShadow: "0 2px 8px hsl(340 60% 70% / 0.3)",
                }}
              />
            </motion.div>
          ))}

          {/* Center logo/text */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div
              className="w-12 h-12 mx-auto mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path
                  d="M12 2C12 2 9 5 9 8C9 10 10 11 12 12C14 11 15 10 15 8C15 5 12 2 12 2Z"
                  fill="hsl(340 60% 75%)"
                />
                <path
                  d="M12 12C12 12 7 13 5 16C4 18 5 20 7 21C9 21 11 19 12 17C13 19 15 21 17 21C19 20 20 18 19 16C17 13 12 12 12 12Z"
                  fill="hsl(340 55% 70%)"
                />
                <circle cx="12" cy="12" r="2" fill="hsl(45 80% 60%)" />
              </svg>
            </motion.div>
            <p className="text-foreground/40 text-xs tracking-[0.3em] uppercase">
              Loading
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LoadingScreen;
