import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const energyIcons = {
    love: '💖',
    career: '💼',
    health: '🌿',
    spiritual: '🔮',
    abundance: '💰',
    protection: '🛡️'
};

export default function EnergyCard({ reading }) {

    if (!reading) {
        return (
            <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 p-6 rounded-3xl space-y-4 animate-pulse cosmic-glow">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/10 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-5 bg-white/20 rounded-md w-3/4"></div>
                        <div className="h-3 bg-white/10 rounded-md w-1/2"></div>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="h-4 bg-white/10 rounded-md w-full"></div>
                    <div className="h-4 bg-white/10 rounded-md w-5/6"></div>
                </div>
                 <div className="h-10 bg-white/20 rounded-xl w-full mt-4"></div>
            </div>
        );
    }
    
    const icon = energyIcons[reading.energy_type] || '✨';

    return (
        <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 p-6 rounded-3xl space-y-4 cosmic-glow">
            <div className="flex items-center space-x-3">
                <div className="text-3xl">{icon}</div>
                <div>
                    <h3 className="font-semibold text-white">Daily Cosmic Energy</h3>
                    <p className="text-sm text-purple-200 capitalize">{reading.energy_type} Reading</p>
                </div>
            </div>
            <p className="text-purple-100 leading-relaxed text-sm">
                {reading.affirmation}
            </p>
            <Link to={createPageUrl("reading")}>
                <Button variant="outline" className="w-full bg-white/5 border-white/20 text-purple-200 hover:bg-white/10 rounded-xl">
                    View Full Reading
                </Button>
            </Link>
        </div>
    )
}