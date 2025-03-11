'use client';
import React from 'react';

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const AnimatedBrain = () => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'loop',
      }}
    >
      <Brain className="h-12 w-12 text-primary" />
    </motion.div>
  );
};

export default AnimatedBrain;
