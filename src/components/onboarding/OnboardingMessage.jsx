import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function OnboardingMessage({ onNext }) {
  return (
    <motion.div
      className="flex flex-col h-full p-6 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1 overflow-y-auto text-white text-lg leading-loose space-y-6 max-w-2xl mx-auto text-center">
        <p>
          The signs I captured about your Soulmate reveal much more than appearance…
        </p>
        <p className="font-semibold text-xl text-purple-200">
          <em>Their energy is warm, protective, and deeply loyal.</em>
        </p>
        <p>
          They carry a gaze that conveys safety, a smile that calms, and gestures that express genuine love. ✨
        </p>
        <p>
          This person brings with them the strength to walk by your side in difficult times and the light to celebrate every victory with you.
        </p>
        <p className="font-semibold text-xl text-purple-200">
          They are someone who will not just complete your life, but will awaken the best version of who you are. 🌙
        </p>
      </div>

      <div className="mt-auto pt-8 text-center">
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-lg px-12 py-7 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          Proceed to the Portrait
        </Button>
      </div>
    </motion.div>
  );
}