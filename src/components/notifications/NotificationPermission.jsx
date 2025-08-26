import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bell, X, BellRing } from "lucide-react";
import { User } from "@/api/entities";

export default function NotificationPermission() {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = async () => {
    if (!('Notification' in window)) return;
    
    try {
      const user = await User.me();
      const hasAskedBefore = user.notification_permission_asked;
      const currentPermission = Notification.permission;
      
      // Show popup if never asked before and permission is not granted yet
      if (!hasAskedBefore && currentPermission === 'default') {
        setTimeout(() => setShowPopup(true), 2000); // Wait 2s after load
      }
    } catch (error) {
      console.log("User not authenticated or error checking permissions");
    }
  };

  const requestPermission = async () => {
    setIsLoading(true);
    
    try {
      if (!('Notification' in window)) {
        alert('This browser does not support notifications');
        return;
      }

      const permission = await Notification.requestPermission();
      
      // Save that we've asked for notification permission
      await User.updateMyUserData({
        notification_permission_asked: true,
        notification_permission: permission
      });

      if (permission === 'granted') {
        // Register service worker for notifications
        await registerServiceWorker();
        
        // Show welcome notification
        new Notification('🔮 HolyGuide', {
          body: 'Notifications enabled! You will now receive daily spiritual reminders.',
          icon: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/782699588_LogoHolyGuide1.png',
          badge: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/782699588_LogoHolyGuide1.png'
        });
      }
      
      setShowPopup(false);
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
    
    setIsLoading(false);
  };

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.error('Error registering Service Worker:', error);
      }
    }
  };

  const dismissPopup = async () => {
    try {
      await User.updateMyUserData({
        notification_permission_asked: true,
        notification_permission: 'dismissed'
      });
      setShowPopup(false);
    } catch (error) {
      console.error('Error saving dismissal:', error);
      setShowPopup(false);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 max-w-sm w-full cosmic-glow animate-in zoom-in duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
            <BellRing className="w-6 h-6 text-purple-300" />
          </div>
          <button
            onClick={dismissPopup}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Receive Spiritual Guidance
            </h3>
            <p className="text-purple-200 text-sm leading-relaxed">
              Allow notifications to receive daily meditation reminders, 
              moon phases, and positive energy messages.
            </p>
          </div>

          <div className="flex items-center space-x-2 p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="text-lg">🌙</div>
            <span className="text-sm text-purple-100">Full & New Moon Reminders</span>
          </div>

          <div className="flex items-center space-x-2 p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="text-lg">🔮</div>
            <span className="text-sm text-purple-100">Daily Energy Readings</span>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={dismissPopup}
              className="flex-1 bg-white/10 border-white/20 text-purple-200 hover:bg-white/20 rounded-xl"
            >
              Not Now
            </Button>
            <Button
              onClick={requestPermission}
              disabled={isLoading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Activating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <span>Allow</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}