
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Share, MoreVertical, PlusSquare } from 'lucide-react';

const AddToHomeScreenPopup = ({ isOpen, onClose }) => {
  const [os, setOs] = useState('unknown');

  useEffect(() => {
    if (!isOpen) return;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      setOs('android');
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setOs('ios');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const IosInstructions = () => (
    <div className="space-y-4 text-left">
      <div className="flex items-start space-x-3">
        <div className="text-lg font-semibold text-white/50">1.</div>
        <p className="text-white/90">Tap the <span className="font-bold">Share</span> button in the menu bar.</p>
        <Share className="w-5 h-5 text-white/80 flex-shrink-0 mt-1" />
      </div>
      <div className="flex items-start space-x-3">
        <div className="text-lg font-semibold text-white/50">2.</div>
        <p className="text-white/90">Scroll down and tap on <span className="font-bold">'Add to Home Screen'</span>.</p>
        <PlusSquare className="w-5 h-5 text-white/80 flex-shrink-0 mt-1" />
      </div>
      <div className="flex items-start space-x-3">
        <div className="text-lg font-semibold text-white/50">3.</div>
        <p className="text-white/90">Tap <span className="font-bold">'Add'</span> in the top-right corner.</p>
      </div>
    </div>
  );

  const AndroidInstructions = () => (
    <div className="space-y-4 text-left">
      <div className="flex items-start space-x-3">
        <div className="text-lg font-semibold text-white/50">1.</div>
        <p className="text-white/90">Tap the <span className="font-bold">three-dots menu</span> icon.</p>
        <MoreVertical className="w-5 h-5 text-white/80 flex-shrink-0 mt-1" />
      </div>
       <div className="flex items-start space-x-3">
        <div className="text-lg font-semibold text-white/50">2.</div>
        <p className="text-white/90">Tap on <span className="font-bold">'Install app'</span> or <span className="font-bold">'Add to Home Screen'</span>.</p>
      </div>
       <div className="flex items-start space-x-3">
        <div className="text-lg font-semibold text-white/50">3.</div>
        <p className="text-white/90">Follow the on-screen instructions to confirm.</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 max-w-sm w-full cosmic-glow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">
            Better Experience
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-purple-200 text-sm mb-6 text-center">
          For easier access, add HolyGuide to your home screen.
        </p>

        <div className="mb-6">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ce0e96430_image.png"
            alt="Add to Home Screen Instructions"
            className="w-full rounded-xl border border-white/10"
          />
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          {os === 'ios' && <IosInstructions />}
          {os === 'android' && <AndroidInstructions />}
          {os === 'unknown' && <p className="text-white/70 text-center">Open this page in Safari (iOS) or Chrome (Android) to add it to your home screen.</p>}
        </div>

        <Button
          variant="outline"
          onClick={onClose}
          className="w-full mt-6 bg-white/10 border-white/20 text-purple-200 hover:bg-white/20 rounded-xl"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default AddToHomeScreenPopup;
