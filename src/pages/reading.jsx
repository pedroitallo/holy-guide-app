import React, { useState, useEffect } from "react";
import { Reading } from "@/api/entities";
import { Sparkles, Star } from "lucide-react";
import { format } from "date-fns";

import ReadingCard from "../components/reading/ReadingCard";
import ReadingHistory from "../components/reading/ReadingHistory";

export default function ReadingPage() {
  const [readings, setReadings] = useState([]);
  const [currentReading, setCurrentReading] = useState(null);

  useEffect(() => {
    loadReadings();
  }, []);

  const loadReadings = async () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    // Check if there's already a reading for today
    let todayReading = await Reading.filter({ date: today }, '-created_date', 1);
    
    if (todayReading.length === 0) {
      // Create today's reading if none exists
      const energyTypes = ["love", "career", "health", "spiritual", "abundance", "protection"];
      const randomType = energyTypes[Math.floor(Math.random() * energyTypes.length)];
      
      const spiritualMessages = {
        love: {
          title: "A Cosmic Heart Opening",
          message: "A significant shift in your love frequency is imminent. Past emotional wounds are healing, creating space for a connection that mirrors your true self. Be prepared for a heartfelt conversation that could change everything. This is a time for vulnerability and authentic expression.",
          affirmation: "I release the past and open my heart to the love I truly deserve."
        },
        career: {
          title: "Path of Purpose Unfolding", 
          message: "The universe is urging you to make a bold decision regarding your career. An opportunity that seems daunting is actually the gateway to your higher purpose. Trust your unique skills. A period of intense but rewarding work is ahead, leading to recognition and fulfillment.",
          affirmation: "I am confidently stepping onto my true professional path."
        },
        health: {
          title: "Wave of Vitality",
          message: "Your body is calling for a profound change in routine. This is the perfect time to commit to a new wellness practice that nourishes not just your body, but your soul. Listen to its whispers before they become screams. A surge of renewed energy awaits your decision.",
          affirmation: "I honor my body as a sacred temple and fill it with vibrant energy."
        },
        spiritual: {
          title: "Quantum Leap in Consciousness",
          message: "You are on the verge of a major spiritual breakthrough. Old beliefs are dissolving to make way for a more expansive reality. Pay close attention to your dreams and synchronicities; your guides are sending you powerful messages. A key decision based on intuition is required.",
          affirmation: "I am expanding my consciousness and embracing my spiritual evolution."
        },
        abundance: {
          title: "Gateway to Prosperity",
          message: "An unexpected door to abundance is opening for you, but it requires a leap of faith. It may not look like traditional wealth at first. A decision to invest in yourself—be it time, energy, or resources—will yield exponential returns. Generosity will be your magnet.",
          affirmation: "I am a magnet for prosperity and I welcome abundance in all forms."
        },
        protection: {
          title: "The Unseen Shield",
          message: "You are being Divinely protected as you navigate a necessary ending. Let go of what no longer serves you, knowing you are safe. A crucial choice to set a firm boundary will fortify your energy field and prevent future depletions. Trust that you are being guided away from harm.",
          affirmation: "I am Divinely protected and I release all that drains my energy."
        }
      };

      const messageData = spiritualMessages[randomType];
      
      try {
        const newReading = await Reading.create({
          title: messageData.title,
          message: messageData.message,
          energy_type: randomType,
          date: today,
          affirmation: messageData.affirmation
        });
        
        setCurrentReading(newReading);
        setReadings([newReading]);
      } catch (error) {
        console.error("Error creating today's reading:", error);
      }
    } else {
      setCurrentReading(todayReading[0]);
      // Load all readings for history
      const allReadings = await Reading.list('-created_date', 10);
      setReadings(allReadings);
    }
  };

  return (
    <div className="px-4 pt-12 pb-8">
      <div className="max-w-sm mx-auto space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-300" />
            <h1 className="text-2xl font-light text-white">Energy Readings</h1>
            <Star className="w-6 h-6 text-yellow-300" />
          </div>
          <p className="text-purple-200 text-sm">
            Your daily cosmic wisdom and spiritual guidance
          </p>
        </div>

        <div className="space-y-4">
          <ReadingCard reading={currentReading} />
          
          <ReadingHistory readings={readings.filter(r => r.id !== currentReading?.id)} />
        </div>
      </div>
    </div>
  );
}