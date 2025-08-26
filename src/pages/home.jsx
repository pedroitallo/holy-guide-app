import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { User as UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

import WelcomeHeader from "../components/home/WelcomeHeader";
import QuickActions from "../components/home/QuickActions";
import NotificationPermission from "../components/notifications/NotificationPermission";
import FirebaseNotificationManager from "../components/notifications/FirebaseNotificationManager";
import MapOfTheSoulCard from '../components/home/MapOfTheSoulCard';
import DailyReadingsSection from "../components/home/DailyReadingsSection";
import DownloadAppButton from "../components/home/DownloadAppButton";
import HoroscopeCard from '../components/home/HoroscopeCard';
import NewChatCard from '../components/home/NewChatCard';
import SplashScreen from '../components/common/SplashScreen';

export default function Home() {
  const [user, setUser] = useState(null);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // Check if this is the first time loading the app (not just navigating to home)
    const hasShownSplash = sessionStorage.getItem('hasShownSplash');
    
    if (!hasShownSplash) {
      setShowSplash(true);
      sessionStorage.setItem('hasShownSplash', 'true');
    }

    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <>
      <FirebaseNotificationManager />
      <NotificationPermission />
      
      <div className="px-4 pt-8 pb-8 animate-in fade-in duration-500">
        <div className="max-w-sm mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <WelcomeHeader user={user} />
            <Link to={createPageUrl('profile')} className="flex flex-col items-center">
              <div className="w-10 h-10 bg-[var(--card-background)] border border-[var(--card-border)] rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-[var(--icon-primary)]" />
              </div>
              <span className="text-xs text-[var(--text-secondary)] mt-1">Profile</span>
            </Link>
          </div>
          
          <HoroscopeCard />
          
          {user && (
            <MapOfTheSoulCard />
          )}

          <div className="space-y-6">
            <DailyReadingsSection />
            <QuickActions />
            <NewChatCard />
            <DownloadAppButton />
          </div>
        </div>
      </div>
    </>
  );
}