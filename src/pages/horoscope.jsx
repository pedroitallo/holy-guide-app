
import React, { useState, useEffect } from 'react';
import { X, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from '@/api/entities';
import { Horoscope } from '@/api/entities';
import { horoscopeData } from '../components/horoscope/data';
import { addDays, addMonths, addWeeks, format } from 'date-fns';

// Helper to shuffle and pick from an array
const pickRandom = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};

const HoroscopeContentSkeleton = () => (
    <div className="animate-pulse space-y-6">
        <div className="h-7 bg-white/10 rounded-md w-3/4"></div>
        <div className="h-5 bg-white/10 rounded-md w-1/2"></div>
        <div className="flex justify-between mt-4">
            <div className="w-2/5 space-y-3">
                <div className="h-5 bg-green-300/10 rounded-md w-1/4"></div>
                <div className="h-4 bg-white/10 rounded-md"></div>
                <div className="h-4 bg-white/10 rounded-md"></div>
                <div className="h-4 bg-white/10 rounded-md"></div>
            </div>
            <div className="w-2/5 space-y-3">
                <div className="h-5 bg-red-300/10 rounded-md w-1/2"></div>
                <div className="h-4 bg-white/10 rounded-md"></div>
                <div className="h-4 bg-white/10 rounded-md"></div>
            </div>
        </div>
        <div className="space-y-3 pt-4">
             <div className="h-6 bg-white/10 rounded-md w-1/3"></div>
             <div className="h-4 bg-white/10 rounded-md"></div>
             <div className="h-4 bg-white/10 rounded-md"></div>
             <div className="h-4 bg-white/10 rounded-md w-5/6"></div>
        </div>
    </div>
);

const HoroscopeContent = ({ horoscope }) => {
    if (!horoscope) return <HoroscopeContentSkeleton />;

    return (
        <div className="animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-white mb-2">{horoscope.title}</h2>
            <div className="flex items-center space-x-2 mb-6">
                <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-slate-800"></div>
                    <div className="w-6 h-6 rounded-full bg-orange-500 border-2 border-slate-800"></div>
                </div>
                <span className="text-sm text-[var(--text-secondary)]">Influencing transits: {horoscope.transits}</span>
            </div>

            <div className="flex justify-between mt-4 text-sm mb-6">
                <div>
                    <p className="font-bold text-green-300 mb-2">Focus</p>
                    <ul className="space-y-1.5 text-[var(--text-secondary)]">
                        {horoscope.focus_points.map((point, i) => <li key={i}>• {point}</li>)}
                    </ul>
                </div>
                <div className="text-right">
                    <p className="font-bold text-red-300 mb-2">Challenges</p>
                    <ul className="space-y-1.5 text-[var(--text-secondary)]">
                        {horoscope.problem_points.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-semibold text-white mb-3">Cosmic Guidance</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">{horoscope.interpretation}</p>
            </div>

            <div className="mt-6">
                <Button 
                    variant="outline" 
                    className="w-full bg-white/10 border-white/20 text-purple-200 hover:bg-white/20 rounded-xl"
                >
                    Full Disclosure
                </Button>
            </div>
        </div>
    )
}

export default function HoroscopePage() {
    const [user, setUser] = useState(null);
    const [horoscopes, setHoroscopes] = useState({ daily: null, weekly: null, monthly: null });
    const [isLoading, setIsLoading] = useState({ daily: true, weekly: true, monthly: true });
    const [activeTab, setActiveTab] = useState('daily');

    useEffect(() => {
        const init = async () => {
            try {
                const currentUser = await User.me();
                setUser(currentUser);
            } catch (e) {
                console.error("User not found");
            }
        };
        init();
    }, []);

    useEffect(() => {
        if (user) {
            fetchHoroscopeForPeriod(activeTab);
        }
    }, [user, activeTab]);

    const getValidityDate = (period) => {
        const now = new Date();
        if (period === 'daily') return addDays(now, 1);
        if (period === 'weekly') return addWeeks(now, 1);
        if (period === 'monthly') return addMonths(now, 1);
        return addDays(now, 1);
    };

    const fetchHoroscopeForPeriod = async (period) => {
        if (horoscopes[period]) {
            setIsLoading(prev => ({ ...prev, [period]: false }));
            return;
        }

        setIsLoading(prev => ({ ...prev, [period]: true }));
        try {
            const today = new Date().toISOString();
            const existing = await Horoscope.filter({
                user_id: user.id,
                period: period,
            }, '-created_date', 1);

            const validHoroscope = existing.find(h => new Date(h.valid_until) > new Date(today));

            if (validHoroscope) {
                setHoroscopes(prev => ({ ...prev, [period]: validHoroscope }));
            } else {
                // Pass the last horoscope found (if any) to generateHoroscope for avoiding repeats
                await generateHoroscope(period, existing[0]); 
            }
        } catch (error) {
            console.error(`Error fetching ${period} horoscope:`, error);
        } finally {
            setIsLoading(prev => ({ ...prev, [period]: false }));
        }
    };

    const generateHoroscope = async (period, lastHoroscope) => {
        const focusPoints = pickRandom(horoscopeData.focus, 3);
        const problemPoints = pickRandom(horoscopeData.problems, 2); // Changed count to 2
        
        const interpretations = horoscopeData.interpretations[period];
        const lastInterpretation = lastHoroscope ? lastHoroscope.interpretation : null;

        let newInterpretation;
        // Ensure that if there are multiple interpretations, we don't pick the same one consecutively
        do {
            newInterpretation = interpretations[Math.floor(Math.random() * interpretations.length)];
        } while (interpretations.length > 1 && newInterpretation === lastInterpretation);

        const titles = {
            daily: "Your Daily Guidance",
            weekly: "Your Weekly Forecast",
            monthly: "Your Monthly Outlook"
        };
        
        const newHoroscope = {
            user_id: user.id,
            period: period,
            valid_until: getValidityDate(period).toISOString(),
            title: titles[period], // Use pre-defined title
            focus_points: focusPoints,
            problem_points: problemPoints,
            interpretation: newInterpretation, // Use pre-defined interpretation
            transits: Math.floor(Math.random() * 4) + 2, // 2 to 5 transits
        };

        const savedHoroscope = await Horoscope.create(newHoroscope);
        setHoroscopes(prev => ({ ...prev, [period]: savedHoroscope }));
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 z-50 p-6 overflow-y-auto">
             <div className="flex items-center justify-between mb-6">
                <h1 className="text-lg font-semibold text-white">Horoscope • {format(new Date(), 'MMMM, dd')}</h1>
                <Link to={createPageUrl("home")}>
                    <Button variant="ghost" size="icon" className="text-white bg-white/10 rounded-full">
                        <X className="w-5 h-5" />
                    </Button>
                </Link>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-gray-800/60 p-1.5 rounded-full border border-white/10 w-full grid grid-cols-3">
                    <TabsTrigger value="daily" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-full transition-all duration-300 text-purple-200">Today</TabsTrigger>
                    <TabsTrigger value="weekly" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-full transition-all duration-300 text-purple-200">Week</TabsTrigger>
                    <TabsTrigger value="monthly" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-full transition-all duration-300 text-purple-200">Month</TabsTrigger>
                </TabsList>
                
                <div className="mt-8">
                    <TabsContent value="daily">
                        {isLoading.daily ? <HoroscopeContentSkeleton /> : <HoroscopeContent horoscope={horoscopes.daily} />}
                    </TabsContent>
                    <TabsContent value="weekly">
                        {isLoading.weekly ? <HoroscopeContentSkeleton /> : <HoroscopeContent horoscope={horoscopes.weekly} />}
                    </TabsContent>
                    <TabsContent value="monthly">
                        {isLoading.monthly ? <HoroscopeContentSkeleton /> : <HoroscopeContent horoscope={horoscopes.monthly} />}
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
