import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { User } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Coins, Send, Star, ChevronRight, Loader } from 'lucide-react';
import InsufficientCreditsPopup from '../common/InsufficientCreditsPopup';
import { logCoinTransaction } from '@/api/functions';

const advisors = [
  { id: 1, name: "Madame Aura", avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/b2e340460_image.png" },
  { id: 2, name: "Master Celeste", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
  { id: 3, name: "Madame Elera", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
  { id: 4, name: "Master Chin", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
  { id: 5, name: "Shaman Kael", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
];

const getIsOnline = (advisorId) => {
    const interval = Math.floor(new Date().getMinutes() / 15); // Change status every 15 mins for variety
    return (advisorId + interval) % 2 === 0;
};

export default function NewChatCard() {
    const [question, setQuestion] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleSend = async () => {
        if (!question.trim()) return;
        setIsSending(true);

        try {
            const user = await User.me();
            const userCoins = user.coins || 0;

            if (userCoins < 2) {
                setShowPopup(true);
                setIsSending(false);
                return;
            }

            // CRITICAL FIX: Deduct coins from DATABASE immediately
            const newCoinBalance = Math.max(0, userCoins - 2);
            await User.updateMyUserData({ coins: newCoinBalance });

            // Log the transaction
            try {
                await logCoinTransaction({
                    type: "spend",
                    amount: -2,
                    description: "New chat session started",
                    service: "chat",
                    metadata: { question_preview: question.substring(0, 100) }
                });
            } catch (logError) {
                console.error("Error logging transaction:", logError);
            }

            const onlineAdvisors = advisors.filter(a => getIsOnline(a.id));
            let targetAdvisor;

            if (onlineAdvisors.length > 0) {
                targetAdvisor = onlineAdvisors[Math.floor(Math.random() * onlineAdvisors.length)];
            } else {
                targetAdvisor = advisors[Math.floor(Math.random() * advisors.length)];
            }

            const chatUrl = createPageUrl(`chat?id=${targetAdvisor.id}&question=${encodeURIComponent(question)}`);
            navigate(chatUrl);

        } catch (error) {
            console.error("Error starting chat:", error);
            // Not logged in - redirect to login
            User.loginWithRedirect(window.location.href);
            setIsSending(false);
        }
    };

    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-white text-left font-serif">New Chat</h2>
                    <Link to={createPageUrl('chats')} className="flex items-center text-sm text-purple-300 hover:text-white transition-colors">
                        All Consultants
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
                <div className="bg-[var(--card-background)] border border-[var(--card-border)] p-4 rounded-2xl cosmic-glow">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="relative">
                            <img src={advisors[0].avatar} alt="Advisor" className="w-10 h-10 rounded-full object-cover"/>
                            <div className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ring-2 ring-gray-800">
                                <Star className="w-3 h-3 fill-current"/>
                            </div>
                        </div>
                        <h3 className="text-white font-medium">Ask your question</h3>
                    </div>

                    <div className="relative">
                        <Textarea
                            placeholder="Ask a consultant what worries you most."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            disabled={isSending}
                            className="bg-black/20 border-white/10 text-white placeholder-purple-200/70 rounded-lg min-h-[80px] pr-20"
                        />
                        <Button 
                            size="icon" 
                            onClick={handleSend}
                            disabled={isSending || !question.trim()}
                            className="absolute right-3 bottom-3 bg-purple-600 hover:bg-purple-700 w-12 h-12 rounded-full"
                        >
                            {isSending ? <Loader className="w-5 h-5 animate-spin"/> : <Send className="w-5 h-5"/>}
                        </Button>
                    </div>
                     {isSending && <p className="text-purple-200 text-sm mt-2 text-center animate-pulse">Finding an online consultant...</p>}

                    <div className="flex justify-between items-center mt-4 text-xs">
                        <div className="flex items-center space-x-1.5 text-green-300">
                            <CheckCircle className="w-4 h-4" />
                            <span>97% User Satisfaction</span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-yellow-300">
                            <Coins className="w-4 h-4" />
                            <span>1 message = 2 credits</span>
                        </div>
                    </div>
                </div>
            </div>
            <InsufficientCreditsPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
        </>
    );
}