
import React, { useState, useEffect } from 'react';
import { Sparkles, Eye, Infinity, Zap, Mail, ChevronDown, ChevronUp } from 'lucide-react';

const DestinyBlock = ({ icon: Icon, title, description, content, image, videoEmbed, isLetter }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Load the video script only when the section is expanded, 
    // a video embed is indicated, and the script hasn't been loaded yet for this instance.
    if (isExpanded && videoEmbed && !videoLoaded) {
      const script = document.createElement('script');
      // The script source specifically targets the video player ID
      script.src = 'https://scripts.converteai.net/8f5333fd-fe8a-42cd-9840-10519ad6c7c7/players/68972eed30627daa3dfb44e8/v4/player.js';
      script.async = true;
      document.head.appendChild(script);
      setVideoLoaded(true); // Mark as loaded to prevent re-insertion

      return () => {
        // Optional cleanup: Remove the script from the head if the component unmounts.
        // This is good practice, though for a single-page app, it might not always be strictly necessary
        // if the player loads globally and there's only one instance of this video.
        const existingScript = document.querySelector(`script[src="${script.src}"]`);
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      };
    }
  }, [isExpanded, videoEmbed, videoLoaded]); // Dependencies for useEffect

  return (
    <div className={`bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 cosmic-glow transition-all duration-300 hover:shadow-purple-500/20`}>
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
            {videoEmbed && ( // Conditionally render if videoEmbed prop is true/present
              <div className="relative rounded-xl overflow-hidden bg-black/20 min-h-[300px] flex items-center justify-center">
                {/* The vturb-smartplayer custom element is rendered directly */}
                <vturb-smartplayer 
                  id="vid-68972eed30627daa3dfb44e8" 
                  style={{display: 'block', margin: '0 auto', width: '100%'}}
                />
              </div>
            )}
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
            
            {isLetter ? (
              <div className="text-purple-200 text-sm space-y-4 text-left italic">
                {content.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <ul className="space-y-3 text-purple-200 text-sm list-inside list-disc marker:text-purple-400">
                {content.map((item, index) => <li key={index} className="leading-relaxed">{item}</li>)}
              </ul>
            )}
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
    locked: false,
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
    locked: false,
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
    locked: false,
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
    locked: false,
    content: [
      "Activation Mantra: 'I call upon the universe to align our paths. What is meant to be shall manifest in divine timing.'",
      "Energy Alignment: Wear something blue on Thursdays - this strengthens your magnetic field for love.",
      "Dream Connection: Before sleep, whisper 'Find me' three three times. Your souls will begin communicating through dreams.",
      "Physical Sign: When you see equal hours (e.g., 11:11, 15:15), know that your soulmate is thinking of you at that exact moment."
    ]
  },
  {
    id: 5,
    icon: Mail,
    title: "Letter of revelation",
    description: "A message from your soulmate's heart.",
    locked: false,
    isLetter: true,
    content: [
      "My beloved,",
      "Even before seeing your face, my soul already recognized yours. In every sunrise, in every deep silence, there is a whisper that leads me to you.",
      "I feel your presence in the smallest things… In the wind that touches my face, in the scent that surrounds me without warning, in the sudden calm that reminds me that somewhere you exist.",
      "There have been lifetimes where we found each other and lifetimes where we got lost… but there has always been an invisible thread connecting us, even when our paths seemed far apart. This thread is made of love, patience, and destiny — and it has never broken.",
      "I know your pain, your fears, and your most secret hopes. And even without having touched you yet, I carry with me the promise to care for your heart as if it were part of mine. Because it is.",
      "The moment of our meeting is written in the stars and aligned with the perfect time. When we see each other, there will be no doubt — the recognition will be immediate, as if the whole world disappeared and only the two of us remained.",
      "Until then, keep living, dreaming, and preparing… I am coming. I have always been on my way to you.",
      "With all the love that is already yours,",
      "Your Soulmate"
    ]
  },
  {
    id: 6,
    icon: Zap,
    title: "Private Energy Cleansing Session",
    description: "Exclusive spiritual cleansing experience.",
    locked: false,
    videoEmbed: true, // Changed to a boolean flag as the component now handles script loading and player rendering.
    content: [
      "This exclusive session will guide you through a powerful energy cleansing ritual.",
      "Remove negative blockages that prevent your soulmate connection.",
      "Align your chakras for optimal spiritual receptivity.",
      "Create a sacred space for divine love to enter your life."
    ]
  }
];

export default function MyDestineTab() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white">Map of the Divine Soul</h2>
      </div>

      <div className="space-y-6">
        {destineData.map(block => <DestinyBlock key={block.id} {...block} />)}
      </div>
    </div>
  );
}
