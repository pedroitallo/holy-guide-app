import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Coins, Edit2, Plus, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProfileHeader({ user, onEditClick }) {
    const [language, setLanguage] = useState('en');

    if (!user) {
        return (
            <div className="text-center space-y-4 animate-pulse">
                <div className="h-10 w-40 bg-white/10 rounded-xl mx-auto mb-4"></div>
                <div className="w-24 h-24 rounded-full bg-white/10 mx-auto border-4 border-white/20"></div>
                <div className="space-y-2">
                    <div className="h-7 bg-white/20 rounded-md w-3/4 mx-auto"></div>
                    <div className="h-4 bg-white/10 rounded-md w-1/2 mx-auto"></div>
                </div>
                <div className="h-10 bg-white/10 rounded-full w-48 mx-auto"></div>
            </div>
        );
    }

    return (
        <div className="text-center space-y-4">
             {/* Language Selector */}
            <div className="flex justify-center mb-4">
                 <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-[150px] bg-white/5 border-white/20 text-purple-200 hover:bg-white/10 rounded-xl">
                        <Globe className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                        <SelectItem value="en" className="text-white hover:bg-purple-600/20">
                          <span role="img" aria-label="USA Flag" className="mr-2">🇺🇸</span> English
                        </SelectItem>
                        <SelectItem value="es" className="text-white hover:bg-purple-600/20">
                          <span role="img" aria-label="Spain Flag" className="mr-2">🇪🇸</span> Español
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="relative inline-block">
                <img 
                    src={user.profile_picture_url || `https://ui-avatars.com/api/?name=${user.full_name}&background=8B5CF6&color=fff&size=128`} 
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto border-4 border-white/20 shadow-lg object-cover"
                />
                <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800/80 border-white/20 rounded-full"
                    onClick={onEditClick}
                >
                    <Edit2 className="w-4 h-4 text-white" />
                </Button>
            </div>
            
            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-white">{user.full_name || "Spiritual Seeker"}</h1>
                <p className="text-sm text-purple-200">{user.email}</p>
            </div>
            
            <div className="flex justify-center items-center space-x-2">
                <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-400/20 px-4 py-2 rounded-full">
                    <Coins className="w-5 h-5 text-yellow-300" />
                    <span className="font-bold text-white">{user.coins || 0} Credits</span>
                </div>
                <Link to={createPageUrl("coins")}>
                    <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center px-4 py-2"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Buy
                    </Button>
                </Link>
            </div>
        </div>
    );
}