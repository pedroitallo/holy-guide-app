import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { Settings, Star, Moon, BookOpen, ChevronRight, Coins, Download } from "lucide-react";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { UploadFile } from "@/api/integrations";

import ProfileHeader from "../components/profile/ProfileHeader";
import SettingsPanel from "../components/profile/SettingsPanel";
import SupportSection from "../components/profile/SupportSection";
import AddToHomeScreenPopup from "../components/common/AddToHomeScreenPopup";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddToHomePopup, setShowAddToHomePopup] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadProfile();
    
    // Recarregar perfil quando voltar para a página (para pegar coins atualizados)
    const handleFocus = () => {
      loadProfile();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const loadProfile = async () => {
    try {
      let currentUser = await User.me();
      console.log(`[COIN DEBUG] Profile loaded - Current coins: ${currentUser.coins}`);
      
      if (currentUser.role === 'admin' && (currentUser.coins === undefined || currentUser.coins < 100)) {
        await User.updateMyUserData({ coins: 100 });
        currentUser = await User.me();
        console.log(`[COIN DEBUG] Admin coins granted - New balance: ${currentUser.coins}`);
      }
      
      setUser(currentUser);
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const handleProfileUpdate = async (data) => {
    const { formData, file } = data; // Destructure form data and file
    setIsSaving(true);
    try {
      const dataToUpdate = { ...formData };
      
      // Handle file upload if a new file is provided
      if (file) {
        // Use the UploadFile integration to upload the file to storage
        const uploadResult = await UploadFile({ file: file });
        
        // If upload is successful and returns a URL, add it to the update data
        if (uploadResult && uploadResult.file_url) {
          dataToUpdate.profile_picture_url = uploadResult.file_url;
        } else {
          console.error("File upload did not return a valid URL.");
        }
      }
      
      // Update the user's data with the new information
      await User.updateMyUserData(dataToUpdate);
      
      // Refresh the user profile on the page to show changes
      await loadProfile();
      
      // Close the settings panel
      setShowSettings(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Optionally, show an error message to the user here
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="px-4 pt-12 pb-8">
      <div className="max-w-xs mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center space-x-2">
            <Star className="w-6 h-6 text-purple-300" />
            <h1 className="text-2xl font-light text-white">Your Profile</h1>
            <Moon className="w-6 h-6 text-yellow-300" />
          </div>
          <p className="text-purple-200 text-sm">
            Your spiritual journey and insights
          </p>
        </div>

        {!showSettings ? (
          <div className="space-y-8">
            <ProfileHeader user={user} onEditClick={() => setShowSettings(true)} />
            
            <div className="px-1">
              <Button 
                variant="outline" 
                className="w-full bg-white/5 border-white/20 text-purple-200 hover:bg-white/10 rounded-xl"
                onClick={() => setShowAddToHomePopup(true)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download App
              </Button>
            </div>

            <div className="flex flex-col gap-y-6">
              <Link to={createPageUrl('revelations')}>
                <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 p-4 rounded-2xl cosmic-glow hover:bg-white/10 transition-colors duration-300 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">My Revelations</h3>
                      <p className="text-sm text-purple-200">View your saved spiritual insights</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-purple-300" />
                </div>
              </Link>

              <Link to={createPageUrl('coin-history')}>
                <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 p-4 rounded-2xl cosmic-glow hover:bg-white/10 transition-colors duration-300 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <Coins className="w-5 h-5 text-yellow-300" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Credit History</h3>
                      <p className="text-sm text-purple-200">View your spending and purchases</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-purple-300" />
                </div>
              </Link>
            </div>

            <SupportSection />
          </div>
        ) : (
          <SettingsPanel 
            user={user}
            onSave={handleProfileUpdate}
            onCancel={() => setShowSettings(false)}
            isSaving={isSaving}
          />
        )}
      </div>
       <AddToHomeScreenPopup 
        isOpen={showAddToHomePopup}
        onClose={() => setShowAddToHomePopup(false)}
      />
    </div>
  );
}