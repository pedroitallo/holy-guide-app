import React, { useState } from 'react';
import { Star } from 'lucide-react';

const energyIcons = {
    love: { icon: '💖', color: 'from-pink-500/50' },
    career: { icon: '💼', color: 'from-blue-500/50' },
    health: { icon: '🌿', color: 'from-green-500/50' },
    spiritual: { icon: '🔮', color: 'from-purple-500/50' },
    abundance: { icon: '💰', color: 'from-yellow-500/50' },
    protection: { icon: '🛡️', color: 'from-gray-500/50' }
};

export default function ReadingCard({ reading }) {
    if (!reading) {
        return (
            <div className="bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-slate-900/50 border border-white/10 rounded-3xl p-6 space-y-4 animate-pulse cosmic-glow">
                <div className="flex justify-between items-center">
                    <div className="h-5 bg-white/20 rounded-md w-1/3"></div>
                    <div className="h-8 w-8 bg-white/10 rounded-full"></div>
                </div>
                <div className="space-y-3">
                    <div className="h-6 bg-white/20 rounded-md w-3/4"></div>
                    <div className="h-4 bg-white/10 rounded-md w-full"></div>
                    <div className="h-4 bg-white/10 rounded-md w-full"></div>
                    <div className="h-4 bg-white/10 rounded-md w-5/6"></div>
                </div>
                <div className="pt-4 space-y-3">
                    <div className="h-5 bg-white/20 rounded-md w-1/2"></div>
                    <div className="h-8 bg-white/10 rounded-lg w-full"></div>
                </div>
            </div>
        );
    }
    const [isAffirmationVisible, setIsAffirmationVisible] = useState(false);
    const { icon, color } = energyIcons[reading.energy_type] || { icon: '✨', color: 'from-gray-500/50' };

    return (
        <div className={`bg-gradient-to-br ${color} via-indigo-900/50 to-slate-900/50 border border-white/10 rounded-3xl p-6 space-y-4 cosmic-glow`}>
            <div className="flex justify-between items-center">
                <p className="font-medium text-white capitalize">{reading.energy_type}</p>
                <div className="text-2xl">{icon}</div>
            </div>
            
            <div>
                <h2 className="text-xl font-bold text-white mb-2">{reading.title}</h2>
                <p className="text-purple-200 leading-relaxed">{reading.message}</p>
            </div>
            
            <div className="border-t border-white/10 pt-4">
                <h3 className="font-semibold text-white flex items-center space-x-2 mb-3">
                    <Star className="w-5 h-5 text-yellow-300"/>
                    <span>Today's Affirmation</span>
                </h3>
                <div 
                    className="bg-black/20 p-4 rounded-xl text-center cursor-pointer transition-all duration-300"
                    onClick={() => setIsAffirmationVisible(!isAffirmationVisible)}
                >
                    {isAffirmationVisible ? (
                        <p className="text-white italic text-lg animate-in fade-in">
                            "{reading.affirmation}"
                        </p>
                    ) : (
                        <p className="text-purple-200">Tap to reveal</p>
                    )}
                </div>
            </div>
        </div>
    )
}