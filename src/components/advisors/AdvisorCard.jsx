import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdvisorCard({ advisor, isOnline, onChatNow }) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-4 cosmic-glow space-y-4">
      <div className="flex items-start space-x-4">
        <div className="relative flex-shrink-0">
          <img 
            src={advisor.avatar} 
            alt={advisor.name} 
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-400/30"
          />
          <div 
            className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${isOnline ? 'bg-green-400' : 'bg-gray-500'}`}
          ></div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">{advisor.name}</h3>
          <p className="text-sm text-purple-300">{advisor.specialty}</p>
          <p className="text-xs text-purple-200 mt-1">{advisor.description}</p>
          <div className="flex items-center space-x-3 text-xs text-gray-300 mt-2">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400" />
              <span>{advisor.rating} ({advisor.reviews})</span>
            </div>
            <span>{advisor.yearsExperience}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button 
          onClick={onChatNow}
          className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto px-12"
          disabled={!isOnline}
        >
          {isOnline ? 'Chat Now' : 'Offline'}
        </Button>
      </div>
    </div>
  );
}