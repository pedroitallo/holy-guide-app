import React, { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500); // Wait for fade out animation
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-[#1C132F] to-[#0F0A1A] flex items-center justify-center z-50 animate-out fade-out duration-500">
        <div className="text-center animate-out zoom-out duration-500">
          <div className="relative">
            {/* Floating particles */}
            <div className="absolute -top-20 -left-20 animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            </div>
            <div className="absolute -top-16 right-16 animate-bounce" style={{animationDelay: '0.5s'}}>
              <div className="text-white text-lg opacity-40">✨</div>
            </div>
            <div className="absolute top-0 -left-24 animate-pulse" style={{animationDelay: '1s'}}>
              <div className="text-white text-xl opacity-30">🌙</div>
            </div>
            <div className="absolute -bottom-12 right-12 animate-bounce" style={{animationDelay: '1.5s'}}>
              <div className="w-1 h-1 bg-purple-300 rounded-full opacity-50"></div>
            </div>
            
            {/* Main logo */}
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/742e191ae_LogoHolyGuide1.png"
              alt="HolyGuide"
              className="w-32 h-32 mx-auto animate-float drop-shadow-2xl"
            />
            
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 w-32 h-32 mx-auto bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
          </div>
          
          {/* App name */}
          <h1 className="text-3xl font-light text-white mt-8 tracking-wider animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            HolyGuide
          </h1>
          <p className="text-purple-200 text-sm mt-2 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            Your spiritual journey awaits
          </p>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0px);
            }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out forwards;
            opacity: 0;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#1C132F] to-[#0F0A1A] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          {/* Floating particles */}
          <div className="absolute -top-20 -left-20 animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
          </div>
          <div className="absolute -top-16 right-16 animate-bounce" style={{animationDelay: '0.5s'}}>
            <div className="text-white text-lg opacity-40">✨</div>
          </div>
          <div className="absolute top-0 -left-24 animate-pulse" style={{animationDelay: '1s'}}>
            <div className="text-white text-xl opacity-30">🌙</div>
          </div>
          <div className="absolute -bottom-12 right-12 animate-bounce" style={{animationDelay: '1.5s'}}>
            <div className="w-1 h-1 bg-purple-300 rounded-full opacity-50"></div>
          </div>
          
          {/* Main logo */}
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/742e191ae_LogoHolyGuide1.png"
            alt="HolyGuide"
            className="w-32 h-32 mx-auto animate-float drop-shadow-2xl"
          />
          
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 w-32 h-32 mx-auto bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        </div>
        
        {/* App name */}
        <h1 className="text-3xl font-light text-white mt-8 tracking-wider animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          HolyGuide
        </h1>
        <p className="text-purple-200 text-sm mt-2 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          Your spiritual journey awaits
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}