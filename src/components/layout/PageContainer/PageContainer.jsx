import React from 'react';
import { motion } from 'framer-motion';
export const PageContainer = ({ children, className = '' }) => {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className={`min-h-[calc(100vh-65px)] w-full max-w-7xl mx-auto px-4 py-8 flex flex-col justify-between ${className}`}>
      {children}
    </motion.main>
  );
};