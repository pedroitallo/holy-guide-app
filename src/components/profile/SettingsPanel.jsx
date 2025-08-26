import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save, Upload } from "lucide-react";

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export default function SettingsPanel({ user, onSave, onCancel, isSaving }) {
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    zodiac_sign: user?.zodiac_sign || '',
  });
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.profile_picture_url || null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePictureFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ formData, file: profilePictureFile });
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 cosmic-glow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-white">Profile Settings</h2>
        <button
          onClick={onCancel}
          className="text-purple-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
            <img 
                src={previewUrl || `https://ui-avatars.com/api/?name=${formData.full_name || 'User'}&background=8B5CF6&color=fff&size=128`} 
                alt="Profile Preview"
                className="w-24 h-24 rounded-full border-4 border-white/20 object-cover"
            />
             <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
            <Button
                type="button"
                variant="outline"
                onClick={handleUploadClick}
                className="bg-white/10 border-white/20 text-purple-200 hover:bg-white/20 rounded-xl"
            >
                <Upload className="w-4 h-4 mr-2" />
                Change Picture
            </Button>
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">
            Full Name
          </label>
          <Input
            value={formData.full_name}
            onChange={(e) => setFormData({...formData, full_name: e.target.value})}
            className="bg-white/10 border-white/20 text-white placeholder-purple-300 rounded-xl"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">
            Zodiac Sign
          </label>
          <Select
            value={formData.zodiac_sign}
            onValueChange={(value) => setFormData({...formData, zodiac_sign: value})}
          >
            <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-xl">
              <SelectValue placeholder="Choose your zodiac sign" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-white/20">
              {zodiacSigns.map((sign) => (
                <SelectItem key={sign} value={sign} className="text-white hover:bg-purple-600/20">
                  {sign}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1 bg-white/10 border-white/20 text-purple-200 hover:bg-white/20 rounded-xl"
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
            disabled={isSaving}
          >
            {isSaving ? (
                <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                </>
            ) : (
                <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}