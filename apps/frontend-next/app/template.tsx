'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      style={{
        width: '100%',
        height: '100%',
      }}
      data-container-template
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
