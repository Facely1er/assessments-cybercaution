import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TextCarouselProps {
  texts: React.ReactNode[];
  interval?: number; // Time in milliseconds between transitions
}

const TextCarousel: React.FC<TextCarouselProps> = ({
  texts,
  interval = 5000, // Default to 5 seconds
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;

    const timer = setInterval(() => {
      setKey(prev => prev + 1);
      setCurrentIndex(prev => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  if (!texts.length) return null;

  return (
    <div className="relative h-full min-h-[160px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {texts[currentIndex]?.title || texts[currentIndex]}
          </h1>
          {texts[currentIndex]?.subtitle && (
            <p className="text-xl text-muted-foreground">
              {texts[currentIndex].subtitle}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TextCarousel;