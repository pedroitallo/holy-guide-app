import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

const audioSrc = "https://base44.app/api/apps/688921c0fcef3790376fdc81/files/751f25e1c_madameaura.mp3";

export default function OnboardingConnection({ onNext }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Fixed audio player at top */}
      <div className="sticky top-0 bg-slate-900/80 backdrop-blur-lg p-4 rounded-2xl border border-white/10 m-4 z-10">
        <div className="flex items-center space-x-4">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/5837d6743_CapturadeTela2025-07-28as112413.png"
            alt="Madame Aura"
            className="w-16 h-16 rounded-full border-2 border-purple-400 object-cover"
          />
          <div className="flex-1">
            <p className="text-sm text-purple-200 mb-2">Listen to what the universe revealed to me...</p>
            <div className="flex items-center space-x-3">
              <button onClick={togglePlayPause} className="text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <div className="flex-1 bg-white/20 rounded-full h-1.5">
                <div className="bg-white h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      {/* Scrollable content area - moved messages lower */}
      <div className="flex-1 px-4 pt-16 pb-20 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center space-y-6"
          >
            <div className="space-y-6 text-white text-lg leading-relaxed">
              <p className="font-serif italic">
                "As I connected with the cosmic energies, your essence shone brightly. A powerful, loving presence is searching for you, drawn by a bond that transcends lifetimes."
              </p>
              
              <p className="font-serif italic">
                "Listen closely, for these are not mere words, but echoes of a destiny waiting to unfold..."
              </p>
            </div>

            <Button
              onClick={onNext}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Receive My Message
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}