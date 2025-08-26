import React from "react";
import { Compass, Moon, Star, Heart, Droplets, BookOpen, Sparkles } from "lucide-react";

import GuideCard from "../components/guide/GuideCard";
import MoonPhase from "../components/guide/MoonPhase";

const guides = [
  { title: "Dream Analysis", description: "Unlock your subconscious messages", icon: Star, interactive: true },
  { title: "Love Compatibility", description: "Discover your perfect match", icon: Heart, interactive: true },
  { title: "Fast Energy Cleansing", description: "Quick spiritual purification", icon: Sparkles, interactive: true },
  { title: "Love Advice", description: "Guidance for matters of the heart", icon: Droplets, interactive: true }
];

export default function Guide() {
  return (
    <div className="px-4 pt-12 pb-8">
      <div className="max-w-sm mx-auto space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center space-x-2">
            <Compass className="w-6 h-6 text-purple-300" />
            <h1 className="text-2xl font-light text-white">Spiritual Guide</h1>
            <Star className="w-6 h-6 text-yellow-300" />
          </div>
          <p className="text-purple-200 text-sm">
            Wisdom and guidance for your spiritual journey
          </p>
        </div>

        <MoonPhase />

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-white text-center flex items-center justify-center space-x-2">
            <Heart className="w-5 h-5 text-pink-300" />
            <span>Spiritual Practices</span>
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {guides.map((guide, index) => (
              <GuideCard key={guide.title} guide={guide} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}