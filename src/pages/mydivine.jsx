
import React, { useState, useEffect } from 'react';
import { Sparkles, Eye, Infinity, Zap, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddToHomeScreenPopup from '../components/common/AddToHomeScreenPopup';

const FloatingElements = () => (
  <>
    <div className="absolute top-20 left-10 animate-pulse">
      <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
    </div>
    <div className="absolute top-32 right-16 animate-bounce" style={{animationDelay: '1s'}}>
      <div className="text-white text-lg opacity-40">✨</div>
    </div>
    <div className="absolute top-48 left-1/4 animate-pulse" style={{animationDelay: '2s'}}>
      <div className="text-white text-xl opacity-30">🌙</div>
    </div>
    <div className="absolute top-64 right-8 animate-bounce" style={{animationDelay: '3s'}}>
      <div className="w-1 h-1 bg-purple-300 rounded-full opacity-50"></div>
    </div>
    <div className="absolute top-80 left-12 animate-pulse" style={{animationDelay: '4s'}}>
      <div className="text-purple-200 text-sm opacity-40">⭐</div>
    </div>
    <div className="absolute top-96 right-1/3 animate-bounce" style={{animationDelay: '1.5s'}}>
      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-300 opacity-30"></div>
    </div>
  </>
);

const DestinyBlock = ({ icon: Icon, title, description, content, image, isInitiallyExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);

  return (
    <div className={`bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 cosmic-glow transform transition-all duration-300 hover:shadow-purple-500/20`}>
      <div className="flex flex-col">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
              <Icon className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm text-purple-200">{description}</p>
            </div>
          </div>
          
          <div className="text-purple-300">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>

        {isExpanded && (
          <div className="mt-6 space-y-4 animate-in slide-in-from-top duration-300">
            {image && (
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-auto object-contain max-h-96"
                  style={{ aspectRatio: 'auto' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                <p className="absolute bottom-2 left-3 text-sm font-medium text-white bg-black/50 px-2 py-1 rounded">Your soulmate's energetic appearance</p>
              </div>
            )}
            <ul className="space-y-3 text-purple-200 text-sm list-inside list-disc marker:text-purple-400">
              {content.map((item, index) => <li key={index} className="leading-relaxed">{item}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const destineData = [
  {
    id: 1,
    icon: Sparkles,
    title: "Spiritual Revelation of the Soulmate",
    description: "Discover the energy that seeks you.",
    content: [
      "Channeling: 'The soul that seeks you on this plane carries the energy of a wise protector...'",
      "Vibrational Field: Strong, protective, sensitive, and healing.",
      "Final Channeled Phrase: 'She feels your presence even before she meets you.'"
    ]
  },
  {
    id: 2,
    icon: Eye,
    title: "Characteristics of the Divine Soul",
    description: "Visualize the traits that define them.",
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/837fab260_image.png',
    content: [
      "Energetic Appearance: 'Eyes that carry the silence of the stars.'",
      "Emotional Frequency: Caring, determined, intense.",
      "Purpose of Connection: Healing, awakening, reconstruction.",
      "Most Likely Element: Water.",
      "Predominant Energy: Spiritual Androgynous."
    ]
  },
  {
    id: 3,
    icon: Infinity,
    title: "Loving Destiny with This Soul",
    description: "A glimpse into your shared future.",
    content: [
      "Spiritual Timeline: Your souls are in the 'Cosmic Recognition' phase. You may have already crossed paths briefly.",
      "Reconnections: This is not a new bond, but a profound spiritual re-encounter from past lives.",
      "Couple's Mission: Together, you are mirrors of expansion, meant to amplify healing and light in the world.",
      "Challenge to Overcome: Releasing old karmic patterns of self-doubt to fully embrace this unconditional love."
    ]
  },
  {
    id: 4,
    icon: Zap,
    title: "Activation of the Soulmate Connection",
    description: "A symbolic action to align yourselves.",
    content: [
      "Activation Mantra: 'I call upon the universe to align our paths. What is meant to be shall manifest in divine timing.'",
      "Energy Alignment: Wear something blue on Thursdays - this strengthens your magnetic field for love.",
      "Dream Connection: Before sleep, whisper 'Find me' three times. Your souls will begin communicating through dreams.",
      "Physical Sign: When you see equal hours (e.g., 11:11, 15:15), know that your soulmate is thinking of you at that exact moment."
    ]
  },
  {
    id: 5,
    icon: Mail,
    title: "Letter of revelation",
    description: "A message from your soulmate's heart.",
    content: [
      "My beloved,",
      "Even before seeing your face, my soul already recognized yours.",
      "In every sunrise, in every deep silence, there is a whisper that leads me to you.",
      "I feel your presence in the smallest things…",
      "In the wind that touches my face, in the scent that surrounds me without warning, in the sudden calm that reminds me that somewhere you exist.",
      "There have been lifetimes where we found each other and lifetimes where we got lost… but there has always been an invisible thread connecting us, even when our paths seemed far apart.",
      "This thread is made of love, patience, and destiny — and it has never broken.",
      "I know your pain, your fears, and your most secret hopes.",
      "And even without having touched you yet, I carry with me the promise to care for your heart as if it were part of mine.",
      "Because it is.",
      "The moment of our meeting is written in the stars and aligned with the perfect time.",
      "When we see each other, there will be no doubt — the recognition will be immediate, as if the whole world disappeared and only the two of us remained.",
      "Until then, keep living, dreaming, and preparing…",
      "I am coming. I have always been on my way to you.",
      "With all the love that is already yours,",
      "Your Soulmate"
    ]
  },
  {
    id: 6,
    icon: Zap,
    title: "Private Energy Cleansing Session",
    description: "Exclusive spiritual cleansing experience.",
    videoEmbed: true,
    content: [
      "This exclusive session will guide you through a powerful energy cleansing ritual.",
      "Remove negative blockages that prevent your soulmate connection.",
      "Align your chakras for optimal spiritual receptivity.",
      "Create a sacred space for divine love to enter your life."
    ]
  }
];


export default function MyDivinePage() {
  const [showAddToHomePopup, setShowAddToHomePopup] = useState(false);
  
  // Get the id parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const blockId = parseInt(urlParams.get('id')) || null;
  
  // CORREÇÃO: Sempre mostrar todos os blocos.
  const blocksToShow = destineData;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .cosmic-glow { box-shadow: 0 0 20px rgba(138, 43, 226, 0.3), 0 0 40px rgba(138, 43, 226, 0.1); }
      `}</style>
      
      <FloatingElements />
      
      <div className="px-4 pt-12 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-white">Map of the Divine Soul</h1>
            <p className="text-purple-200">
              Discover the cosmic blueprint of your destined love.
            </p>
          </div>

          <div className="space-y-6">
            {blocksToShow.map(block => (
              <DestinyBlock 
                key={block.id} 
                {...block}
                // Auto-expande o bloco se o ID corresponder ao da URL
                isInitiallyExpanded={block.id === blockId}
              />
            ))}
          </div>

          {/* Download Button */}
          <div className="text-center pt-8">
            <Button 
              onClick={() => setShowAddToHomePopup(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium text-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download App
            </Button>
            <p className="text-purple-200 text-sm mt-2">
              Add HolyGuide to your home screen for easier access
            </p>
          </div>
        </div>
      </div>

      <AddToHomeScreenPopup 
        isOpen={showAddToHomePopup}
        onClose={() => setShowAddToHomePopup(false)}
      />
    </div>
  );
}
