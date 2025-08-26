import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressIndicator({ current, total }) {
  return (
    <div className="flex justify-center items-center space-x-2">
      {[...Array(total)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-2 h-2 rounded-full ${i < current ? 'bg-white' : 'bg-white/30'}`}
          initial={{ scale: 0.8 }}
          animate={{ scale: i < current ? 1.1 : 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      ))}
    </div>
  );
}