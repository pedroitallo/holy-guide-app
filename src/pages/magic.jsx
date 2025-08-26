import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const responses = [
  "YES", "NO", "YES", "NO", "YES", "NO", 
  "DEFINITELY", "NOT NOW", "ABSOLUTELY", "MAYBE LATER",
  "OF COURSE", "UNLIKELY", "CERTAINLY", "DOUBTFUL"
];

export default function MagicBallPage() {
  const [isShaking, setIsShaking] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleReveal = () => {
    if (isShaking) return;
    
    setIsShaking(true);
    setAnswer(null);
    setShowAnswer(false);

    // Shake animation for 5 seconds
    setTimeout(() => {
      const randomAnswer = responses[Math.floor(Math.random() * responses.length)];
      setAnswer(randomAnswer);
      setIsShaking(false);
      setShowAnswer(true);
    }, 5000);
  };

  const resetBall = () => {
    setAnswer(null);
    setShowAnswer(false);
    setIsShaking(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 px-4 pt-12 pb-8">
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to={createPageUrl("home")}>
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">Magic Ball</h1>
          <div className="w-10"></div>
        </div>

        <div className="text-center space-y-8">
          {/* Crystal Ball */}
          <div className="relative flex justify-center items-center h-80">
            <div 
              className={`relative w-64 h-64 ${isShaking ? 'animate-bounce' : ''}`}
              style={{
                animation: isShaking ? 'shake 0.5s infinite' : 'none'
              }}
            >
              {/* Ball shadow */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-8 bg-black/20 rounded-full blur-md"></div>
              
              {/* Ball base */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-gradient-to-b from-yellow-600/80 to-yellow-800/90 rounded-full border border-yellow-500/50"></div>
              
              {/* Crystal ball */}
              <div className="relative w-56 h-56 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400/30 via-transparent to-blue-900/40 border-4 border-teal-300/30"></div>
                <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-teal-100/10 to-transparent"></div>
                
                {/* Inner crystal cluster */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Central crystal */}
                    <div className="w-16 h-20 bg-gradient-to-t from-amber-200/80 to-amber-50/90 transform rotate-12 clip-path-hexagon border border-amber-300/50"></div>
                    {/* Side crystals */}
                    <div className="absolute -left-3 top-2 w-8 h-12 bg-gradient-to-t from-amber-300/70 to-amber-100/80 transform -rotate-12 clip-path-hexagon border border-amber-400/40"></div>
                    <div className="absolute -right-2 top-4 w-6 h-10 bg-gradient-to-t from-amber-400/60 to-amber-200/70 transform rotate-45 clip-path-hexagon border border-amber-500/30"></div>
                    <div className="absolute left-2 top-8 w-4 h-8 bg-gradient-to-t from-amber-500/50 to-amber-300/60 transform -rotate-45 clip-path-hexagon border border-amber-600/20"></div>
                    <div className="absolute right-4 top-1 w-5 h-9 bg-gradient-to-t from-amber-300/60 to-amber-100/70 transform rotate-30 clip-path-hexagon border border-amber-400/30"></div>
                  </div>
                </div>

                {/* Answer display */}
                {showAnswer && answer && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/60 backdrop-blur-sm rounded-full px-6 py-3 animate-in zoom-in duration-700">
                      <span className="text-white text-xl font-bold tracking-wider">
                        {answer}
                      </span>
                    </div>
                  </div>
                )}

                {/* Shaking effect overlay */}
                {isShaking && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white/80 text-sm animate-pulse">
                      Reading the mystical energies...
                    </div>
                  </div>
                )}
              </div>

              {/* Magical sparkles around the ball */}
              <div className="absolute -top-4 -left-4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute top-8 -right-6 w-1 h-1 bg-purple-300 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-8 w-3 h-3 bg-teal-300 rounded-full animate-bounce"></div>
              <div className="absolute top-16 left-2 w-1 h-1 bg-pink-300 rounded-full animate-ping"></div>
              <div className="absolute bottom-12 -right-4 w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <p className="text-purple-200 text-sm leading-relaxed">
              Close your eyes, take a deep breath, and silently form a yes-or-no question.<br/>
              When you're ready, tap Reveal. The Magic Ball will show you the way.
            </p>
            <p className="text-purple-300 text-xs italic">
              Example: "Should I text him?"
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            {!showAnswer ? (
              <Button 
                onClick={handleReveal}
                disabled={isShaking}
                className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                  isShaking 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-teal-600 hover:bg-teal-700 active:scale-95'
                }`}
              >
                {isShaking ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Revealing...</span>
                  </div>
                ) : (
                  "Get Answer"
                )}
              </Button>
            ) : (
              <Button 
                onClick={resetBall}
                className="w-full py-4 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl active:scale-95 transition-all duration-300"
              >
                Ask Another Question
              </Button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) translateY(0); }
          10% { transform: translateX(-2px) translateY(-1px); }
          20% { transform: translateX(2px) translateY(1px); }
          30% { transform: translateX(-3px) translateY(-2px); }
          40% { transform: translateX(3px) translateY(2px); }
          50% { transform: translateX(-2px) translateY(-1px); }
          60% { transform: translateX(2px) translateY(1px); }
          70% { transform: translateX(-1px) translateY(-2px); }
          80% { transform: translateX(1px) translateY(2px); }
          90% { transform: translateX(-1px) translateY(-1px); }
        }
        .clip-path-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
    </div>
  );
}