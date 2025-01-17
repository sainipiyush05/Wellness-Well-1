import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaHeartbeat } from "react-icons/fa";

interface BootsplashProps {
  onComplete?: () => void;
}

const Bootsplash = ({ onComplete }: BootsplashProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 2000); // 2 seconds duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-surface-darker flex items-center justify-center z-50"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="mb-4"
            >
              <FaHeartbeat className="w-16 h-16 text-primary animate-pulse" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold mb-2 gradient-text"
            >
              MediPredict AI
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400"
            >
              AI-Powered Disease Prediction
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.5,
                delay: 0.7,
                ease: "easeInOut",
              }}
              className="h-0.5 w-48 bg-gradient-to-r from-primary to-primary-dark mx-auto mt-6"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Bootsplash;
