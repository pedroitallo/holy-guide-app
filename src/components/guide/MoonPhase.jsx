
import React from "react";
import { Moon } from "lucide-react";

export default function MoonPhase() {
  // Simple moon phase calculation (mock for demo)
  const moonPhases = [
    { phase: "New Moon", emoji: "🌑", description: "Perfect time for new beginnings" },
    { phase: "Waxing Crescent", emoji: "🌒", description: "Set intentions and plant seeds" },
    { phase: "First Quarter", emoji: "🌓", description: "Take action on your goals" },
    { phase: "Waxing Gibbous", emoji: "🌔", description: "Refine and adjust your path" },
    { phase: "Full Moon", emoji: "🌕", description: "Peak energy for manifestation" },
    { phase: "Waning Gibbous", emoji: "🌖", description: "Practice gratitude and reflection" },
    { phase: "Last Quarter", emoji: "🌗", description: "Release what no longer serves" },
    { phase: "Waning Crescent", emoji: "🌘", description: "Rest and prepare for renewal" }
  ];

  const currentPhase = moonPhases[Math.floor(Math.random() * moonPhases.length)];

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 cosmic-glow">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Moon className="w-5 h-5 text-purple-300" />
          <h3 className="text-lg font-medium text-white">Current Moon Phase</h3>
        </div>
        
        <div className="w-24 h-24 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
            <Moon className="w-12 h-12 text-purple-300" />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-xl font-semibold text-white">{currentPhase.phase}</h4>
          <p className="text-purple-200 text-sm">{currentPhase.description}</p>
        </div>
        
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-purple-400 rounded-full sparkle"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full sparkle" style={{animationDelay: '1s'}}></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full sparkle" style={{animationDelay: '2s'}}></div>
        </div>
      </div>
    </div>
  );
}
