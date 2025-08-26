import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star, Sparkles, Briefcase, Sun, Shield } from 'lucide-react';

const energyIcons = {
  love: Heart,
  career: Briefcase,
  health: Sun,
  spiritual: Sparkles,
  abundance: Star,
  protection: Shield
};

export default function ReadingDetailModal({ reading, onClose }) {
  const Icon = energyIcons[reading.energy_type] || Sparkles;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-gradient-to-br from-slate-900 to-indigo-900 border border-white/10 rounded-3xl p-6 max-w-sm w-full cosmic-glow relative text-center"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl mb-2">
              <Icon className="w-10 h-10 text-purple-300" />
            </div>

            <h3 className="text-2xl font-semibold text-white">{reading.title}</h3>
            
            <p className="text-purple-100 leading-relaxed text-left">
              {reading.message}
            </p>

            {reading.affirmation && (
              <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs text-purple-200 uppercase tracking-wider mb-2">Affirmation for Today</p>
                <p className="text-white font-medium italic text-center">
                  "{reading.affirmation}"
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}