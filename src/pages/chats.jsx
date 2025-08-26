import React, { useState, useEffect } from "react";
import { MessageCircle, Star, Filter, Search, Sparkles, Coins, Plus, AlertCircle, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/api/entities";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdvisorCard from "../components/advisors/AdvisorCard";
import MyChatsList from "../components/chats/MyChatsList";
import AreasOfLifeTab from "../components/chats/AreasOfLifeTab";

const advisors = [
{
  id: 1,
  name: "Madame Aura",
  specialty: "Love & Soulmate Expert",
  rating: 4.9,
  reviews: 2847,
  yearsExperience: "15 years",
  avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/b2e340460_image.png",
  description: "Specializing in twin flame connections and divine love"
},
{
  id: 2,
  name: "Master Celeste",
  specialty: "Spiritual Prosperity Guardian",
  rating: 4.8,
  reviews: 1923,
  yearsExperience: "12 years",
  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  description: "Abundance manifestation and financial spiritual guidance"
},
{
  id: 3,
  name: "Madame Elera",
  specialty: "Intuition & Dreams",
  rating: 4.9,
  reviews: 3156,
  yearsExperience: "18 years",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  description: "Dream interpretation and intuitive awakening"
},
{
  id: 4,
  name: "Master Chin",
  specialty: "Life Purpose Connection",
  rating: 4.7,
  reviews: 2654,
  yearsExperience: "20+ years",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  description: "Soul mission discovery and spiritual calling"
},
{
  id: 5,
  name: "Shaman Kael",
  specialty: "Spiritual Cleansing & Protection",
  rating: 4.8,
  reviews: 1876,
  yearsExperience: "16 years",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  description: "Energy clearing and spiritual protection rituals"
},
{
  id: 6,
  name: "Luna",
  specialty: "Sacred Feminine Guide",
  rating: 4.9,
  reviews: 2341,
  yearsExperience: "14 years",
  avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
  description: "Divine feminine awakening and inner goddess work"
},
{
  id: 7,
  name: "Astro Elian",
  specialty: "Astral Master & Horoscope",
  rating: 4.7,
  reviews: 4129,
  yearsExperience: "22 years",
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  description: "Cosmic alignments and celestial guidance"
},
{
  id: 8,
  name: "Celestino",
  specialty: "Tarot & Destiny Messages",
  rating: 4.8,
  reviews: 3287,
  yearsExperience: "17 years",
  avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
  description: "Ancient cards wisdom and fate interpretation"
},
{
  id: 9,
  name: "Seraphina",
  specialty: "Light Channel & Spiritual Elevation",
  rating: 4.9,
  reviews: 2789,
  yearsExperience: "19 years",
  avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
  description: "Divine light transmission and consciousness elevation"
},
{
  id: 10,
  name: "Oracle Maya",
  specialty: "Ancient Wisdom & Sacred Knowledge",
  rating: 4.8,
  reviews: 5642,
  yearsExperience: "25+ years",
  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
  description: "Ancestral wisdom and sacred mysteries"
}];


export default function ChatsPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [userCoins, setUserCoins] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showInsufficientCreditsPopup, setShowInsufficientCreditsPopup] = useState(false);

  useEffect(() => {
    loadUserCoins();
    
    // Recarregar coins quando voltar para a página
    const handleFocus = () => {
      loadUserCoins();
    };
    
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadUserCoins, 30000); // Check every 30 seconds
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  const loadUserCoins = async () => {
    try {
      const currentUser = await User.me();
      const currentCoins = currentUser.coins || 4;
      console.log(`[COIN DEBUG] Chats page - Current coins: ${currentCoins}`);
      setUserCoins(currentCoins);
    } catch (error) {
      console.error("Error loading user coins:", error);
    }
    setIsLoading(false);
  };

  const handleChatNowClick = (advisor) => {
    if (userCoins < 2) {
      setShowInsufficientCreditsPopup(true);
    } else {
      window.location.href = createPageUrl(`chat?id=${advisor.id}`);
    }
  };

  const getIsOnline = (advisorId) => {
    // This simple logic makes advisors online/offline based on time to simulate dynamic status
    // For a real app, this would come from a backend (e.g., WebSocket or API poll)
    const interval = Math.floor(new Date().getMinutes() / 30);
    return (advisorId + interval) % 2 === 0;
  };

  const onlineCount = advisors.filter((a) => getIsOnline(a.id)).length;

  const filteredAdvisors = advisors.filter((advisor) => {
    const isOnline = getIsOnline(advisor.id);
    const matchesFilter = filter === "all" ||
    filter === "online" && isOnline ||
    filter === "offline" && !isOnline;

    const matchesSearch = advisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advisor.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="px-4 pt-12 pb-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl("home")}>
              <Button variant="ghost" size="icon" className="text-purple-300 hover:text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center space-x-2">
                <MessageCircle className="w-6 h-6 text-purple-300" />
                <h1 className="text-2xl font-light text-white">Spiritual Advisors</h1>
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </div>
              <p className="text-purple-200 text-sm mt-1">
                Connect with expert spiritual guides
              </p>
            </div>
            <div className="w-10 h-10" /> {/* Spacer for centering title */}
          </div>

          {/* Coins Header */}
          <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-4 cosmic-glow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Coins className="w-5 h-5 text-yellow-300" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    {isLoading ? "..." : userCoins} Credits
                  </p>
                  <p className="text-purple-200 text-xs">
                    1 message = 2 credits
                  </p>
                </div>
              </div>
              <Link to={createPageUrl("coins")}>
                <Button
                  size="sm"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white">

                  <Plus className="w-4 h-4 mr-1" />
                  Buy
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="consultants" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/60 p-1 rounded-xl border border-white/10">
            <TabsTrigger value="consultants" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300 text-purple-200 text-sm">
              Consultants
            </TabsTrigger>
            <TabsTrigger value="mychats" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300 text-purple-200 text-sm">
              My Chats
            </TabsTrigger>
            <TabsTrigger value="areas" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300 text-purple-200 text-sm">
              Areas of Life
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consultants" className="mt-6">
            <div className="space-y-4">
              {/* Online Status */}
              <div className="text-center">
                <div className="flex justify-center items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300">{onlineCount} advisors online</span>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                  <Input
                    placeholder="Search advisor or specialty..."
                    className="pl-10 bg-gray-800/50 border-white/10 text-white placeholder-purple-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex justify-center space-x-2">
                  <Button 
                    onClick={() => setFilter('all')} 
                    variant={filter === 'all' ? 'default' : 'outline'} 
                    className={filter === 'all' ? 'bg-purple-600 text-white' : 'border-white/20 text-purple-200 hover:bg-white/10'}
                    size="sm"
                  >
                    All
                  </Button>
                  <Button 
                    onClick={() => setFilter('online')} 
                    variant={filter === 'online' ? 'default' : 'outline'}
                    className={filter === 'online' ? 'bg-purple-600 text-white' : 'border-white/20 text-purple-200 hover:bg-white/10'}
                    size="sm"
                  >
                    Online
                  </Button>
                  <Button 
                    onClick={() => setFilter('offline')} 
                    variant={filter === 'offline' ? 'default' : 'outline'}
                    className={filter === 'offline' ? 'bg-purple-600 text-white' : 'border-white/20 text-purple-200 hover:bg-white/10'}
                    size="sm"
                  >
                    Offline
                  </Button>
                </div>
              </div>

              {/* Advisors Grid */}
              <div className="grid grid-cols-1 gap-4">
                {filteredAdvisors.map((advisor) =>
                  <AdvisorCard
                    key={advisor.id}
                    advisor={advisor}
                    isOnline={getIsOnline(advisor.id)}
                    onChatNow={() => handleChatNowClick(advisor)}
                  />
                )}
              </div>

              {filteredAdvisors.length === 0 &&
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-purple-300 mx-auto mb-4 opacity-50" />
                  <p className="text-purple-200">No advisors found matching your criteria.</p>
                </div>
              }
            </div>
          </TabsContent>

          <TabsContent value="mychats" className="mt-6">
            <MyChatsList />
          </TabsContent>

          <TabsContent value="areas" className="mt-6">
            <AreasOfLifeTab />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Insufficient Credits Popup */}
      {showInsufficientCreditsPopup &&
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-slate-800 to-indigo-900 border border-purple-500/50 rounded-2xl p-6 text-center max-w-sm w-full cosmic-glow animate-in zoom-in duration-300">
            <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Insufficient Credits</h2>
            <p className="text-purple-200 mb-4">
              Don't worry! You've received a special <span className="font-bold text-yellow-300">30% discount</span> on credit packages to chat with our 10+ expert advisors.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={() => setShowInsufficientCreditsPopup(false)} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">Maybe Later</Button>
              <Link to={createPageUrl("coins")} className="flex-1">
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">Buy Credits</Button>
              </Link>
            </div>
          </div>
        </div>
      }
    </div>
  );
}