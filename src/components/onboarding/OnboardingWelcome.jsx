import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function OnboardingWelcome({ onNext }) {
  return (
    <motion.div
      className="text-center flex flex-col items-center justify-center h-full p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/5837d6743_CapturadeTela2025-07-28as112413.png"
        alt="Madame Aura"
        className="w-40 h-40 rounded-full mb-6 border-4 border-purple-300/50 shadow-lg shadow-purple-500/20 object-cover"
      />
      <h1 className="font-serif text-3xl md:text-4xl text-white mb-4">Welcome</h1>
      <p className="text-purple-200 text-lg max-w-md mx-auto mb-10">
        The universe has shown me something special about your soulmate…
      </p>
      <Button
        onClick={onNext}
        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-lg px-12 py-7 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        Begin Revelation
      </Button>
    </motion.div>
  );
}