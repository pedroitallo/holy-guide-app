import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { MessageCircle, Sparkles, Star } from "lucide-react";

export default function SpiritualAdvisorBanner() {
  return (
    <Link to={createPageUrl("chats")} className="block group">
      <div className="relative bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-pink-600/20 backdrop-blur-lg border border-white/10 rounded-3xl p-6 cosmic-glow transform transition-all duration-300 group-hover:scale-105 group-active:scale-95 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-2 right-4 opacity-30">
          <Sparkles className="w-8 h-8 text-purple-300 animate-pulse" />
        </div>
        <div className="absolute bottom-2 left-4 opacity-20">
          <Star className="w-6 h-6 text-pink-300 animate-pulse" style={{animationDelay: '1s'}} />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Spiritual Guidance
              </h3>
              <p className="text-sm text-purple-200">
                Connect with expert advisors
              </p>
            </div>
          </div>

          <p className="text-white text-sm leading-relaxed">
            Receive personalized spiritual guidance from experienced specialists in love, prosperity, dreams, and life purpose.
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white/20"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white/20"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full border-2 border-white/20"></div>
              </div>
              <span className="text-xs text-purple-200">10+ Advisors</span>
            </div>
            <div className="text-purple-300 group-hover:text-white transition-colors">
              <MessageCircle className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}