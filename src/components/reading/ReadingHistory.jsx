
import React, { useState } from "react";
import { format } from "date-fns";
import { Heart, Star, Sparkles, Briefcase, Sun, Shield, ChevronRight } from "lucide-react";
import ReadingDetailModal from "./ReadingDetailModal";

const energyIcons = {
  love: Heart,
  career: Briefcase,
  health: Sun,
  spiritual: Sparkles,
  abundance: Star,
  protection: Shield,
};

export default function ReadingHistory({ readings }) {
  const [selectedReading, setSelectedReading] = useState(null);

  if (readings.length === 0) return null;

  const currentMonth = format(new Date(), 'MMMM');

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white text-center">{currentMonth} Forecast</h3>

        <div className="space-y-3">
          {readings.map((reading) => {
            const Icon = energyIcons[reading.energy_type] || Sparkles;
            return (
              <div
                key={reading.id}
                className="bg-gray-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-4 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedReading(reading)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <Icon className="w-5 h-5 text-purple-300 mt-1 flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-medium text-sm">{reading.title}</h4>
                        <span className="text-xs text-purple-300">
                          {format(new Date(reading.date), 'MMMM')}
                        </span>
                      </div>
                      <p className="text-purple-200 text-xs leading-relaxed line-clamp-2">
                        {reading.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center ml-3 space-y-1">
                    <ChevronRight className="w-4 h-4 text-purple-300" />
                    <span className="text-xs text-purple-300 font-medium">Open</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {selectedReading && (
        <ReadingDetailModal 
          reading={selectedReading} 
          onClose={() => setSelectedReading(null)} 
        />
      )}
    </>
  );
}
