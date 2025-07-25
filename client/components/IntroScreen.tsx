import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, Sparkles, Heart } from "lucide-react";

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 500);
    const timer2 = setTimeout(() => setShowText(true), 1500);
    const timer3 = setTimeout(() => setShowSubtext(true), 2500);
    const timer4 = setTimeout(() => onComplete(), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-herbal-50 via-nature-100 to-earth-50 dark:from-herbal-900 dark:via-nature-800 dark:to-earth-800 flex items-center justify-center overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-herbal-400/30 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        {/* Logo Animation */}
        {showLogo && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOutBack" }}
            className="mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-32 h-32 mx-auto"
              >
                <div className="w-full h-full border-4 border-herbal-400/20 rounded-full"></div>
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 w-28 h-28 mx-auto"
              >
                <div className="w-full h-full border-2 border-nature-400/30 rounded-full"></div>
              </motion.div>

              <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-herbal-500 to-nature-600 rounded-full flex items-center justify-center shadow-2xl">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Leaf className="w-12 h-12 text-white" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-2 -left-2"
                >
                  <Heart className="w-5 h-5 text-red-400" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Title */}
        {showText && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-herbal-600 via-nature-700 to-earth-600 bg-clip-text text-transparent mb-4">
              HerbWise
            </h1>
          </motion.div>
        )}

        {/* Subtitle */}
        {showSubtext && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-herbal-700 dark:text-herbal-300 mb-2">
              Your AI-Powered Medicinal Plants Guide
            </p>
            <p className="text-lg text-nature-600 dark:text-nature-400">
              Discover 100+ healing herbs • Affordable wellness • Natural
              remedies
            </p>
          </motion.div>
        )}

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-12"
        >
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-herbal-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background music simulation (visual indicator) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-8"
      >
        <div className="flex items-center space-x-2 text-herbal-600 dark:text-herbal-400">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-herbal-500 rounded-full"
                animate={{
                  height: [8, 20, 8, 15, 8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
          <span className="text-sm">Nature Sounds</span>
        </div>
      </motion.div>
    </div>
  );
}
