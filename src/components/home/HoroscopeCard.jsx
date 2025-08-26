import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Horoscope } from '@/api/entities';
import { User } from '@/api/entities';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addDays } from 'date-fns';

const HoroscopeCardSkeleton = () => (
    <div className="bg-[var(--card-background)] p-5 rounded-2xl border border-[var(--card-border)] cosmic-glow animate-pulse">
        <div className="h-5 bg-white/10 rounded-md w-3/4 mb-3"></div>
        <div className="h-4 bg-white/10 rounded-md w-1/2 mb-6"></div>
        <div className="flex justify-between">
            <div className="w-2/5 space-y-2">
                <div className="h-4 bg-white/10 rounded-md"></div>
                <div className="h-4 bg-white/10 rounded-md"></div>
                <div className="h-4 bg-white/10 rounded-md"></div>
            </div>
            <div className="w-2/5 space-y-2">
                <div className="h-4 bg-white/10 rounded-md"></div>
                <div className="h-4 bg-white/10 rounded-md"></div>
            </div>
        </div>
        <div className="h-8 bg-white/10 rounded-md w-full mt-4"></div>
    </div>
);

export default function HoroscopeCard() {
    const [dailyHoroscope, setDailyHoroscope] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHoroscope = async () => {
            try {
                const user = await User.me();
                const today = new Date().toISOString();
                
                let existingHoroscopes = await Horoscope.filter({
                    user_id: user.id,
                    period: 'daily',
                }, '-created_date', 1);

                let validHoroscope = existingHoroscopes.find(h => new Date(h.valid_until) > new Date(today));

                if (validHoroscope) {
                    setDailyHoroscope(validHoroscope);
                } else {
                    setDailyHoroscope(null);
                }
            } catch (error) {
                console.error("Error fetching daily horoscope:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHoroscope();
    }, []);

    if (isLoading) {
        return <HoroscopeCardSkeleton />;
    }

    return (
        <div className="bg-[var(--card-background)] p-5 rounded-2xl border border-[var(--card-border)] cosmic-glow shadow-2xl animate-in fade-in duration-500">
            {dailyHoroscope ? (
                <div>
                    <p className="text-sm text-[var(--text-secondary)]">Horoscope</p>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] truncate">{dailyHoroscope.title}</h3>
                    <div className="flex items-center space-x-2 my-2">
                        <div className="flex -space-x-2">
                            <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-slate-800"></div>
                            <div className="w-5 h-5 rounded-full bg-orange-500 border-2 border-slate-800"></div>
                        </div>
                        <span className="text-xs text-[var(--text-secondary)]">Influencing transits: {dailyHoroscope.transits}</span>
                    </div>
                    <div className="flex justify-between mt-4 text-xs mb-4">
                        <div>
                            <p className="font-bold text-green-300 mb-1">Focus</p>
                            <ul className="space-y-1 text-[var(--text-secondary)]">
                                {dailyHoroscope.focus_points.slice(0, 3).map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </div>
                        <div>
                            <p className="font-bold text-red-300 mb-1">Challenges</p>
                            <ul className="space-y-1 text-[var(--text-secondary)]">
                                {dailyHoroscope.problem_points.slice(0, 2).map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </div>
                    </div>
                    
                    <Link to={createPageUrl('horoscope')} className="block">
                        <Button 
                            variant="outline" 
                            className="w-full bg-white/10 border-white/20 text-purple-200 hover:bg-white/20 rounded-xl"
                        >
                            Full Disclosure
                        </Button>
                    </Link>
                </div>
            ) : (
                <div>
                    <div className="text-center py-4">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Your Daily Horoscope</h3>
                        <p className="text-[var(--text-secondary)] mt-2 mb-4">Tap to reveal your cosmic energies for today.</p>
                    </div>
                    
                    <Link to={createPageUrl('horoscope')} className="block">
                        <Button 
                            variant="outline" 
                            className="w-full bg-white/10 border-white/20 text-purple-200 hover:bg-white/20 rounded-xl"
                        >
                            Reveal Today's Guidance
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}