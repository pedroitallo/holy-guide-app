
import React, { useState, useEffect } from "react";
import { Star, ArrowLeft, Loader, Coins, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import { Revelation } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { logCoinTransaction } from "@/api/functions";

export default function DreamAnalysisPage() {
  const [dreamText, setDreamText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
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
    if (!dreamText.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysis(null);

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
        type: "spend", amount: -1, description: "Dream Analysis Service", service: "dream_analysis",
        metadata: { dream_preview: dreamText.substring(0, 100) }
      });

      const prompt = `Analyze this dream in a warm and comforting tone, as if you're a caring spiritual guide named Azura. The person had this dream: "${dreamText}". Start with a title like "### Your Dream Revealed". Then, provide the interpretation. Be insightful and gentle. The response MUST be in English and text-only, no images or markdown for images. Conclude with a comforting sentence.`;
      const result = await InvokeLLM({ prompt });
      const analysisContent = typeof result === 'string' ? result : result?.response || '';
      setAnalysis(analysisContent);
      
      await Revelation.create({
        type: "Dream Analysis", prompt: dreamText, response: analysisContent
      });
      
    } catch (error) {
      console.error("Error analyzing dream:", error);
      setAnalysis("I'm having trouble connecting to the spiritual realm right now. Please try again in a moment.");
      
      try {
        const userToRefund = await User.me();
        const refundBalance = (userToRefund.coins || 0) + 1;
        await User.updateMyUserData({ coins: refundBalance });
        setUserCoins(refundBalance);
        await logCoinTransaction({
          type: "refund", amount: 1, description: "Refund for failed dream analysis", service: "refund",
          metadata: { dream_preview: dreamText.substring(0, 100) }
        });
      } catch (refundError) {
        console.error("Error refunding coins:", refundError);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetForm = () => {
    setDreamText("");
    setAnalysis(null);
  };

  if (analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 px-4 pt-12 pb-8">
        <div className="max-w-sm mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center">
             <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2aad31315_Azura.png" alt="Azura" className="w-20 h-20" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Your Dream Revealed</h1>
          <p className="text-purple-200 leading-relaxed mb-8 whitespace-pre-wrap">{analysis.replace("### Your Dream Revealed", "").trim()}</p>
          
          <div className="space-y-4">
            <h3 className="text-white font-medium">Your Dream:</h3>
            <p className="bg-white/5 p-4 rounded-xl text-purple-200 italic">"{dreamText}"</p>
          </div>

          <div className="flex justify-center mt-8">
            <Button onClick={resetForm} className="w-full max-w-xs bg-purple-600 hover:bg-purple-700">
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
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center">
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2aad31315_Azura.png" alt="Azura" className="w-16 h-16" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Had a strange or memorable dream?</h1>
          <p className="text-purple-200 text-sm">
            Share your dream with Azura and discover what it might be trying to tell you. It could be a sign, a warning... or just your mind speaking loudly.
          </p>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-lg border border-white/10 rounded-3xl p-1">
            <Textarea
              placeholder="Describe your dream..."
              value={dreamText}
              onChange={(e) => setDreamText(e.target.value)}
              className="w-full h-32 bg-transparent border-none text-white placeholder-purple-300 resize-none focus:ring-0" />
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-purple-300 text-xs">1 analysis = 1 credit</p>
        </div>

        <Button
          onClick={handleReveal}
          disabled={!dreamText.trim() || isAnalyzing}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl">
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
              You need 1 credit to perform a dream analysis.
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
