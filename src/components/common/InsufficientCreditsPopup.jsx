import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle, X } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function InsufficientCreditsPopup({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-gradient-to-br from-slate-800 to-indigo-900 border border-purple-500/50 rounded-2xl p-6 text-center max-w-sm w-full cosmic-glow animate-in zoom-in duration-300 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X className="w-5 h-5"/>
                </button>
                <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Insufficient Credits</h2>
                <p className="text-purple-200 mb-6">
                    You need at least 2 credits to send a message. Please purchase more to continue.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={onClose} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10 rounded-xl">
                        Maybe Later
                    </Button>
                    <Link to={createPageUrl("coins")} className="flex-1">
                        <Button className="w-full bg-yellow-600 hover:bg-yellow-700 rounded-xl">
                            Buy Credits
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}