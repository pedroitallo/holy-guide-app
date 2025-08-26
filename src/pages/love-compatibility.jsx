
import React, { useState, useEffect } from "react";
import { Heart, ArrowLeft, Loader, Coins, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import { Revelation } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { logCoinTransaction } from "@/api/functions";

export default function LoveCompatibilityPage() {
  const [namesText, setNamesText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [compatibility, setCompatibility] = useState(null);
  const [userCoins, setUserCoins] = useState(0);
  const [showInsufficientCredits, setShowInsufficientCredits] = useState(false);

  useEffect(() => {
    loadUserCoins();
  }, []);

  const loadUserCoins = async () => {
    try {
      const currentUser = await User.me();
      setUserCoins(currentUser.coins || 0);
    } catch (error) {
      console.error("Error loading user coins:", error);
    }
  };

  const parseNamesFromText = (text) => {
    const parts = text.split(/\s+and\s+|\s*,\s*|\s+&\s+/i).map(p => p.trim()).filter(Boolean);
    return { partner1: parts[0] || text, partner2: parts[1] || "the other person" };
  };

  const handleReveal = async () => {
    if (!namesText.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setCompatibility(null);

    let currentUser;
    try {
      currentUser = await User.me();
      if ((currentUser.coins || 0) < 1) {
        setShowInsufficientCredits(true);
        setIsAnalyzing(false);
        return;
      }
    } catch (error) {
      console.error("Error checking user coins:", error);
      setIsAnalyzing(false);
      return;
    }

    const { partner1, partner2 } = parseNamesFromText(namesText);

    try {
      // CRITICAL FIX: Deduct coins from DATABASE first
      const newCoinBalance = Math.max(0, currentUser.coins - 1);
      await User.updateMyUserData({ coins: newCoinBalance });
      setUserCoins(newCoinBalance);

      await logCoinTransaction({
        type: "spend", amount: -1, description: "Love Compatibility Reading", service: "love_compatibility",
        metadata: { partner1, partner2 }
      });

      const prompt = `You are Seraphina, a loving spiritual guide specializing in relationships. Analyze the love compatibility between ${partner1} and ${partner2}. Start with "### Love Compatibility: ${partner1} & ${partner2}". Provide insights about their connection, strengths, potential challenges, and spiritual bond. Be warm, encouraging, and insightful. End with a beautiful blessing for their relationship.`;
      const result = await InvokeLLM({ prompt });
      const compatibilityContent = typeof result === 'string' ? result : result?.response || '';
      setCompatibility(compatibilityContent);

      await Revelation.create({
        type: "Love Compatibility", prompt: namesText, response: compatibilityContent
      });

    } catch (error) {
      console.error("Error analyzing compatibility:", error);
      setCompatibility("The cosmic energies are currently shifting. Please try again in a moment.");
      
      // CRITICAL FIX: Refund coins to DATABASE if analysis fails
      try {
        const userToRefund = await User.me();
        const refundBalance = (userToRefund.coins || 0) + 1;
        await User.updateMyUserData({ coins: refundBalance });
        setUserCoins(refundBalance);
        await logCoinTransaction({
          type: "refund", amount: 1, description: "Refund for failed love compatibility", service: "refund",
          metadata: { partner1, partner2 }
        });
      } catch (refundError) {
        console.error("Error refunding coins:", refundError);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetForm = () => {
    setNamesText("");
    setCompatibility(null);
  };

  if (compatibility) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 px-4 pt-12 pb-8">
        <div className="max-w-sm mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 to-red-700 flex items-center justify-center">
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2aad31315_Azura.png" alt="Azura" className="w-20 h-20" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Love Compatibility</h1>
          <p className="text-purple-200 leading-relaxed mb-8 whitespace-pre-wrap">{compatibility.replace(/### Love Compatibility:.*?\n/, "").trim()}</p>
          
          <div className="space-y-4">
            <h3 className="text-white font-medium">Your Inquiry:</h3>
            <p className="bg-white/5 p-4 rounded-xl text-purple-200 italic">"{namesText}"</p>
          </div>

          <div className="flex justify-center mt-8">
            <Button onClick={resetForm} className="w-full max-w-xs bg-pink-600 hover:bg-pink-700">
              New Analysis
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 px-4 pt-12 pb-8">
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to={createPageUrl("guide")}>
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2 bg-gray-900/50 px-3 py-1 rounded-full">
            <Coins className="w-4 h-4 text-yellow-300" />
            <span className="text-white text-sm">{userCoins}</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-400 to-red-600 flex items-center justify-center">
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2aad31315_Azura.png" alt="Azura" className="w-16 h-16" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Discover the love compatibility between you</h1>
          <p className="text-purple-200 text-sm">
            Tell us your names (or signs, if you prefer!) and Azura will tell you what the universe says about this connection. Blazing passion or ancient karma?
          </p>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-red-600/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-lg border border-white/10 rounded-3xl p-1">
            <Textarea
              placeholder="Ex: Maria and João, or Leo and Scorpio..."
              value={namesText}
              onChange={(e) => setNamesText(e.target.value)}
              className="w-full h-32 bg-transparent border-none text-white placeholder-purple-300 resize-none focus:ring-0" />
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-purple-300 text-xs">1 analysis = 1 credit</p>
        </div>

        <Button
          onClick={handleReveal}
          disabled={!namesText.trim() || isAnalyzing}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl">
          {isAnalyzing ? (
            <div className="flex items-center space-x-2">
              <Loader className="w-4 h-4 animate-spin" />
              <span>Analyzing and reading...</span>
            </div>
          ) : "Reveal"}
        </Button>
      </div>

      {showInsufficientCredits && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-indigo-900 border border-purple-500/50 rounded-2xl p-6 text-center max-w-sm w-full cosmic-glow">
            <Coins className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Insufficient Credits</h2>
            <p className="text-purple-200 mb-4">
              You need 1 credit to perform a compatibility analysis.
            </p>
            <div className="flex flex-col gap-2">
              <Button onClick={() => setShowInsufficientCredits(false)} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Cancel
              </Button>
              <Link to={createPageUrl("coins")}>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  Buy Credits
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
