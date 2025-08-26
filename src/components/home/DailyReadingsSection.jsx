import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function DailyReadingsSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-white text-left">
        Daily Readings
      </h2>
      
      <div className="flex space-x-3 overflow-x-auto">
        {/* Letter of the Day Card */}
        <Link to={createPageUrl("letterday")} className="block flex-shrink-0">
          <div className="bg-[var(--card-background)] border border-[var(--card-border)] p-4 rounded-2xl cosmic-glow w-44 h-56 flex flex-col justify-between hover:border-[var(--text-secondary)]/40 transition-colors duration-300">
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="relative mb-3">
                <div className="w-16 h-24 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border border-yellow-600/30 transform rotate-12 absolute -top-1 -right-1"></div>
                <div className="w-16 h-24 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg border border-yellow-600/30 transform -rotate-6 absolute top-1 left-1"></div>
                <div className="w-16 h-24 bg-gradient-to-b from-gray-600 to-gray-700 rounded-lg border border-yellow-600/50 relative z-10 flex items-center justify-center">
                  <div className="text-yellow-300 text-xs">✨</div>
                </div>
              </div>
              <h3 className="text-white font-medium text-sm text-center">Letter of the Day</h3>
            </div>
            <p className="text-purple-200 text-xs text-center mt-2">
              Your card is waiting for you
            </p>
          </div>
        </Link>

        {/* Magic Ball Card */}
        <Link to={createPageUrl("magic")} className="block flex-shrink-0">
          <div className="bg-[var(--card-background)] border border-[var(--card-border)] p-4 rounded-2xl cosmic-glow w-44 h-56 flex flex-col justify-between hover:border-[var(--text-secondary)]/40 transition-colors duration-300">
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="relative mb-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400/30 to-blue-600/30 border border-teal-300/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-300/20 to-blue-500/20 flex items-center justify-center">
                    <div className="text-teal-200 text-lg">🔮</div>
                  </div>
                </div>
              </div>
              <h3 className="text-white font-medium text-sm text-center">Magic Ball</h3>
            </div>
            <p className="text-purple-200 text-xs text-center mt-2">
              Get answers to your questions
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}