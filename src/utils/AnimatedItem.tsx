import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedItemProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  type?: 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'slideInUp' | 'scaleIn';
  className?: string;
  direction?: 'up' | 'left' | 'right';
  scale?: boolean;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  type = 'fadeIn',
  className = '',
  direction,
  scale = false
}) => {
  let variants;

  // Type-based animations
  switch (type) {
    case 'slideInLeft':
      variants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1 }
      };
      break;
    case 'slideInRight':
      variants = {
        hidden: { x: 20, opacity: 0 },
        visible: { x: 0, opacity: 1 }
      };
      break;
    case 'slideInUp':
      variants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      };
      break;
    case 'scaleIn':
      variants = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: { scale: 1, opacity: 1 }
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

  // Direction-based animations override type
  if (direction === 'left') {
    variants = {
      hidden: { x: -20, opacity: 0 },
      visible: { x: 0, opacity: 1 }
    };
  } else if (direction === 'right') {
    variants = {
      hidden: { x: 20, opacity: 0 },
      visible: { x: 0, opacity: 1 }
    };
  } else if (direction === 'up') {
    variants = {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    };
  }

  // Scale animation override
  if (scale) {
    variants = {
      hidden: { scale: 0.95, opacity: 0 },
      visible: { scale: 1, opacity: 1 }
    };
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      transition={{ 
        duration, 
        delay, 
        ease: "easeOut" 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedItem;