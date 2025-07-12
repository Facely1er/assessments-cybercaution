import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  type?: 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'slideInUp';
  className?: string;
  direction?: 'up' | 'left' | 'right';
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  type = 'fadeIn',
  className = '',
  direction
}) => {
  let variants;

  switch (type) {
    case 'slideInLeft':
      variants = {
        hidden: { x: -30, opacity: 0 },
        visible: { x: 0, opacity: 1 }
      };
      break;
    case 'slideInRight':
      variants = {
        hidden: { x: 30, opacity: 0 },
        visible: { x: 0, opacity: 1 }
      };
      break;
    case 'slideInUp':
      variants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      };
      break;
    case 'fadeIn':
    default:
      variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      };
      break;
  }

  // Direction-based animations
  if (direction === 'left') {
    variants = {
      hidden: { x: -30, opacity: 0 },
      visible: { x: 0, opacity: 1 }
    };
  } else if (direction === 'right') {
    variants = {
      hidden: { x: 30, opacity: 0 },
      visible: { x: 0, opacity: 1 }
    };
  } else if (direction === 'up') {
    variants = {
      hidden: { y: 30, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    };
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;