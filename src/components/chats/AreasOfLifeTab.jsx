import React, { useState } from 'react';
import { Heart, Briefcase, Home, Users, Star, Brain, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const lifeAreas = [
    {
        id: 'love',
        title: 'Love & Relationships',
        icon: Heart,
        color: 'from-pink-500 to-rose-600',
        questions: [
            "Will I find my soulmate soon?",
            "How can I improve my current relationship?",
            "Is my partner being faithful to me?",
            "What should I know about my love life?",
            "Will we get married?",
            "How to attract love into my life?"
        ]
    },
    {
        id: 'career',
        title: 'Career & Money',
        icon: Briefcase,
        color: 'from-emerald-500 to-teal-600',
        questions: [
            "Should I change my career path?",
            "Will I get promoted this year?",
            "How can I increase my income?",
            "What's my life purpose professionally?",
            "Should I start my own business?",
            "Will I have financial abundance?"
        ]
    },
    {
        id: 'family',
        title: 'Family & Home',
        icon: Home,
        color: 'from-amber-500 to-orange-600',
        questions: [
            "How to improve family relationships?",
            "Should we move to a new home?",
            "How to deal with family conflicts?",
            "Will we have children?",
            "How to create harmony at home?",
            "What about my parents' health?"
        ]
    },
    {
        id: 'friendship',
        title: 'Friendship & Social',
        icon: Users,
        color: 'from-blue-500 to-indigo-600',
        questions: [
            "How to make genuine friendships?",
            "Are my friends loyal to me?",
            "How to overcome social anxiety?",
            "Should I distance myself from someone?",
            "How to expand my social circle?",
            "What do people think about me?"
        ]
    },
    {
        id: 'spiritual',
        title: 'Spiritual Growth',
        icon: Star,
        color: 'from-purple-500 to-violet-600',
        questions: [
            "What is my spiritual path?",
            "How can I develop my intuition?",
            "What are my spiritual gifts?",
            "How to connect with my higher self?",
            "What is my soul's mission?",
            "How to raise my vibration?"
        ]
    },
    {
        id: 'health',
        title: 'Health & Wellness',
        icon: Brain,
        color: 'from-green-500 to-emerald-600',
        questions: [
            "How to improve my mental health?",
            "What should I know about my health?",
            "How to increase my energy levels?",
            "What lifestyle changes should I make?",
            "How to reduce stress in my life?",
            "What about my emotional wellbeing?"
        ]
    }
];

export default function AreasOfLifeTab() {
    const [selectedArea, setSelectedArea] = useState(null);

    const handleQuestionClick = (question) => {
        // Redirect to chat with random advisor and pre-filled question
        const chatUrl = `/chat?question=${encodeURIComponent(question)}`;
        window.location.href = chatUrl;
    };

    if (selectedArea) {
        const area = lifeAreas.find(a => a.id === selectedArea);
        return (
            <div className="space-y-6">
                {/* Header with centered title and back button */}
                <div className="relative">
                    <Button 
                        variant="ghost"
                        onClick={() => setSelectedArea(null)}
                        className="absolute left-0 top-0 text-purple-300 hover:text-white hover:bg-white/10 p-2"
                    >
                        <ArrowLeft className="w-5 h-5 mr-1" />
                        Back to Areas
                    </Button>
                    
                    <div className="text-center pt-2">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${area.color} flex items-center justify-center mx-auto mb-2`}>
                            <area.icon className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-semibold text-white">{area.title}</h2>
                        <p className="text-purple-200 text-sm mt-2">
                            Choose a question to connect with a spiritual advisor
                        </p>
                    </div>
                </div>
                
                <div className="space-y-3 mt-8">
                    {area.questions.map((question, index) => (
                        <button
                            key={index}
                            onClick={() => handleQuestionClick(question)}
                            className="w-full text-left bg-gray-900/50 border border-white/10 rounded-2xl p-4 hover:bg-white/5 transition-colors cosmic-glow"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-white">{question}</span>
                                <ChevronRight className="w-5 h-5 text-purple-300 flex-shrink-0" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-white mb-2">Areas of Life</h2>
                <p className="text-purple-200 text-sm">
                    Get guidance on what matters most to you
                </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
                {lifeAreas.map((area) => (
                    <button
                        key={area.id}
                        onClick={() => setSelectedArea(area.id)}
                        className="text-left bg-gray-900/50 border border-white/10 rounded-2xl p-4 hover:bg-white/5 transition-colors cosmic-glow"
                    >
                        <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${area.color} flex items-center justify-center`}>
                                <area.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-semibold">{area.title}</h3>
                                <p className="text-purple-200 text-sm">
                                    {area.questions.length} common questions
                                </p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-purple-300" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}