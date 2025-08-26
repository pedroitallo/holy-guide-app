
import React, { useState, useEffect } from "react";
import { Sparkles, ArrowLeft, Loader, Coins, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import { Revelation } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { logCoinTransaction } from "@/api/functions";

export default function FastEnergyCleansingPage() {
  const [energyDescription, setEnergyDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cleansing, setCleansing] = useState(null);
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

  const handleReveal = async () => {
    if (!energyDescription.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setCleansing(null);

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

    try {
      const newCoinBalance = Math.max(0, currentUser.coins - 1);
      await User.updateMyUserData({ coins: newCoinBalance });
      setUserCoins(newCoinBalance);

      await logCoinTransaction({
        type: "spend", amount: -1, description: "Energy Cleansing Session", service: "energy_cleansing",
        metadata: { energy_description: energyDescription.substring(0, 100) }
      });

      const prompt = `You are Shaman Kael, a powerful spiritual cleanser and protector. Someone is experiencing negative energy: "${energyDescription}". Start with "### Energy Cleansing Ritual". Provide a personalized cleansing ritual that addresses their specific situation. Include practical steps, visualization techniques, and protective practices. End with a powerful protection blessing or affirmation.`;
      const result = await InvokeLLM({ prompt });
      const cleansingContent = typeof result === 'string' ? result : result?.response || '';
      setCleansing(cleansingContent);

      await Revelation.create({
        type: "Energy Cleansing", prompt: energyDescription, response: cleansingContent
      });
      
    } catch (error) {
      console.error("Error performing energy cleansing:", error);
      setCleansing("The cleansing energies are currently realigning. Please try again in a moment.");
      
      try {
        const userToRefund = await User.me();
        const refundBalance = (userToRefund.coins || 0) + 1;
        await User.updateMyUserData({ coins: refundBalance });
        setUserCoins(refundBalance);
        await logCoinTransaction({
          type: "refund", amount: 1, description: "Refund for failed energy cleansing", service: "refund",
          metadata: { energy_description: energyDescription.substring(0, 100) }
        });
      } catch (refundError) {
        console.error("Error refunding coins:", refundError);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetForm = () => {
    setEnergyDescription("");
    setCleansing(null);
  };

  if (cleansing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 px-4 pt-12 pb-8">
        <div className="max-w-sm mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-blue-700 flex items-center justify-center">
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2aad31315_Azura.png" alt="Azura" className="w-20 h-20" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Your Energy Cleansing Ritual</h1>
          <p className="text-purple-200 leading-relaxed mb-8 whitespace-pre-wrap">{cleansing.replace("### Energy Cleansing Ritual", "").trim()}</p>
          
          <div className="space-y-4">
            <h3 className="text-white font-medium">Your Energy State:</h3>
            <p className="bg-white/5 p-4 rounded-xl text-purple-200 italic">"{energyDescription}"</p>
          </div>

          <div className="flex justify-center mt-8">
            <Button onClick={resetForm} className="w-full max-w-xs bg-green-600 hover:bg-green-700">
              New Cleansing
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
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center">
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2aad31315_Azura.png" alt="Azura" className="w-16 h-16" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Fast Energy Cleansing</h1>
          <p className="text-purple-200 text-sm">
            Tell me how you're feeling right now, and Azura will guide you through a personalized cleansing ritual to reset your energy.
          </p>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-lg border border-white/10 rounded-3xl p-1">
            <Textarea
              placeholder="How are you feeling? (e.g., anxious, drained, overwhelmed...)"
              value={energyDescription}
              onChange={(e) => setEnergyDescription(e.target.value)}
              className="w-full h-32 bg-transparent border-none text-white placeholder-purple-300 resize-none focus:ring-0" />
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-purple-300 text-xs">1 cleansing = 1 credit</p>
        </div>

        <Button
          onClick={handleReveal}
          disabled={!energyDescription.trim() || isAnalyzing}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl">
          {isAnalyzing ? (
            <div className="flex items-center space-x-2">
              <Loader className="w-4 h-4 animate-spin" />
              <span>Preparing your cleansing ritual...</span>
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
              You need 1 credit to perform an energy cleansing.
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
