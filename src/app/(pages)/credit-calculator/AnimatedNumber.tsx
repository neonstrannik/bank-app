'use client';

import { motion } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  format?: (num: number) => string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  format = (num) => num.toLocaleString()
}) => {
  return (
    <motion.span
      key={value}
      initial={{ scale: 0.5, opacity: 0, color: "#ef4444" }}
      animate={{ scale: 1, opacity: 1, color: "#000000" }}
      transition={{ 
        duration: 0.5, 
        type: "spring", 
        stiffness: 300,
        damping: 20 
      }}
      className="tabular-nums font-bold"
    >
      {format(value)}
    </motion.span>
  );
};