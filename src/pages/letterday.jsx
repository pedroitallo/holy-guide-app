
import React, { useState, useEffect } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { TarotCard } from "@/api/entities";
import { DailyCardDraw } from "@/api/entities";
import { format } from "date-fns";

export default function LetterDayPage() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [todaysDraw, setTodaysDraw] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      
      // Check if user already drew a card today
      const existingDraw = await DailyCardDraw.filter({ draw_date: today }, '-created_date', 1);
      
      if (existingDraw.length > 0) {
        // User already drew today, show the result
        const cardData = await TarotCard.filter({ id: existingDraw[0].card_id });
        if (cardData.length > 0) {
          setTodaysDraw(existingDraw[0]);
          setSelectedCard(cardData[0]);
          setIsRevealed(true);
        }
      } else {
        // Load all cards for selection
        const allCards = await TarotCard.list('card_number');
        setCards(allCards);
      }
    } catch (error) {
      console.error("Error loading tarot data:", error);
    }
    setIsLoading(false);
  };

  const handleCardSelect = async (card) => {
    if (selectedCard || isFlipping || todaysDraw) return;
    
    setSelectedCard(card);
    setIsFlipping(true);
    
    setTimeout(async () => {
      // Randomly select a tip and interpretation
      const randomTip = card.daily_tips[Math.floor(Math.random() * card.daily_tips.length)];
      const randomInterpretation = card.interpretations[Math.floor(Math.random() * card.interpretations.length)];
      
      try {
        // Save today's draw
        const drawRecord = await DailyCardDraw.create({
          card_id: card.id,
          card_name: card.name,
          selected_tip: randomTip,
          selected_interpretation: randomInterpretation,
          draw_date: format(new Date(), 'yyyy-MM-dd')
        });
        
        setTodaysDraw(drawRecord);
        setIsFlipping(false);
        setIsRevealed(true);
      } catch (error) {
        console.error("Error saving card draw:", error);
        setIsFlipping(false);
      }
    }, 800);
  };

  const resetForTomorrow = () => {
    // This would only work if it's a new day
    const today = format(new Date(), 'yyyy-MM-dd');
    if (todaysDraw && todaysDraw.draw_date !== today) {
      setSelectedCard(null);
      setIsRevealed(false);
      setIsFlipping(false);
      setTodaysDraw(null);
      loadData();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 px-4 pt-12 pb-8 flex items-center justify-center">
        <div className="text-white">Loading your mystical cards...</div>
      </div>
    );
  }

  if (isRevealed && selectedCard && todaysDraw) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 px-4 pt-12 pb-8">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link to={createPageUrl("home")}>
              <Button variant="ghost" size="icon" className="text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-white">Letter of the Day</h1>
            <div className="w-10"></div>
          </div>

          <div className="text-center space-y-6">
            <div className="animate-in zoom-in duration-700">
              <div className="w-48 h-72 mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-300/30">
                <img 
                  src={selectedCard.image_url}
                  alt={selectedCard.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">{selectedCard.name}</h2>
              
              <div className="flex flex-wrap justify-center gap-2">
                {selectedCard.keywords.map((keyword, index) => (
                  <span key={index} className="bg-purple-600/30 text-purple-200 px-3 py-1 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 cosmic-glow space-y-4">
                <div>
                  <h3 className="text-yellow-300 font-semibold mb-2 flex items-center justify-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Today's Tip</span>
                  </h3>
                  <p className="text-purple-200 text-sm italic">
                    "{todaysDraw.selected_tip}"
                  </p>
                </div>
                
                <div className="border-t border-white/10 pt-4">
                  <h3 className="text-yellow-300 font-semibold mb-2">Interpretation</h3>
                  <p className="text-purple-200 leading-relaxed text-sm">
                    {todaysDraw.selected_interpretation}
                  </p>
                </div>
              </div>

              <div className="bg-purple-900/30 backdrop-blur-lg border border-purple-400/20 rounded-2xl p-4">
                <p className="text-purple-200 text-sm">
                  ✨ Your card for today has been revealed. Return tomorrow for a new spiritual message.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 px-4 pt-12 pb-8">
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to={createPageUrl("home")}>
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">Letter of the Day</h1>
          <div className="w-10"></div>
        </div>

        {!selectedCard && (
          <>
            <div className="text-center mb-8 space-y-4">
              <div className="w-32 h-48 mx-auto bg-gradient-to-b from-gray-600/20 to-gray-800/20 rounded-xl border-2 border-teal-400/30 flex items-center justify-center">
                <div className="text-4xl text-teal-300">🔮</div>
              </div>
              <p className="text-purple-200 text-sm leading-relaxed">
                Think about your day or simply ask the deck what you most need to know right now. Focus and choose a card.
              </p>
            </div>

            <div className="relative">
              {/* 4 cards on top row */}
              <div className="flex justify-center gap-2 mb-4">
                {cards.slice(0, 4).map((card, index) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardSelect(card)}
                    className="w-16 h-28 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg border border-yellow-600/50 cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-lg hover:border-yellow-400/70"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-yellow-300 text-xs">✨</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 3 cards on bottom row */}
              <div className="flex justify-center gap-2">
                {cards.slice(4, 7).map((card, index) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardSelect(card)}
                    className="w-16 h-28 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg border border-yellow-600/50 cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-lg hover:border-yellow-400/70"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-yellow-300 text-xs">✨</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <div className="inline-flex items-center space-x-2 text-purple-300">
                  <span>← Choose a card →</span>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedCard && !isRevealed && (
          <div className="text-center space-y-6">
            <div className={`w-48 h-72 mx-auto rounded-2xl overflow-hidden transition-all duration-800 ${isFlipping ? 'animate-pulse scale-110' : ''}`}>
              <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-900 border-4 border-yellow-600/50 rounded-2xl flex items-center justify-center">
                <div className="text-6xl text-yellow-300 animate-bounce">✨</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-white text-lg">Revealing your card...</p>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
