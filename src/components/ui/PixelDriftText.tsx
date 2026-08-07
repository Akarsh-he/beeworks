import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

interface PixelDriftTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'p' | 'div';
}

export const PixelDriftText: React.FC<PixelDriftTextProps> = ({
  text,
  className = "",
  as = 'h1'
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: 0.1
      },
    },
  };

  const wordVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: 15,
          filter: "blur(6px)",
          scale: 0.95
        },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.5,
        ease: [0.25, 0.4, 0.25, 1] as const
      }
    },
  };

  const Component = motion[as];

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-flex flex-wrap gap-x-[0.25em] gap-y-[0.1em] ${className}`}
    >
      {words.map((word, idx) => (
        <motion.span key={idx} variants={wordVariants} className="inline-block">
          {word}
        </motion.span>
      ))}
    </Component>
  );
};
