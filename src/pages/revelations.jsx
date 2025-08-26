import React, { useState, useEffect } from 'react';
import { Revelation } from '@/api/entities';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Loader, BookOpen, ChevronRight, X } from 'lucide-react';
import { format } from 'date-fns';

const RevelationDetailModal = ({ revelation, onClose }) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
    <div className="bg-gradient-to-br from-slate-800 to-indigo-900 border border-purple-500/50 rounded-2xl p-6 text-left max-w-sm w-full cosmic-glow animate-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">{revelation.type}</h2>
        <button onClick={onClose} className="text-purple-300 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <div>
          <h3 className="text-sm font-semibold text-purple-200 mb-2">Your Prompt</h3>
          <p className="bg-white/5 p-3 rounded-lg text-purple-200 italic text-sm">"{revelation.prompt}"</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-purple-200 mb-2">Azura's Revelation</h3>
          <p className="text-white whitespace-pre-wrap text-sm">{revelation.response.replace(/### .*$/m, "").trim()}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function RevelationsPage() {
  const [revelations, setRevelations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRevelation, setSelectedRevelation] = useState(null);

  useEffect(() => {
    loadRevelations();
  }, []);

  const loadRevelations = async () => {
    try {
      const userRevelations = await Revelation.list('-created_date');
      setRevelations(userRevelations);
    } catch (error) {
      console.error("Error loading revelations:", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 px-4 pt-12 pb-8">
        <div className="max-w-sm mx-auto">
          <div className="relative flex items-center justify-center mb-8">
            <Link to={createPageUrl('profile')} className="absolute left-0 text-white hover:text-purple-300">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-light text-white">My Revelations</h1>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="w-8 h-8 text-purple-300 animate-spin" />
            </div>
          ) : revelations.length > 0 ? (
            <div className="space-y-3">
              {revelations.map((revelation) => (
                <div 
                  key={revelation.id} 
                  className="bg-gray-900/50 backdrop-blur-lg border border-white/10 p-4 rounded-2xl cosmic-glow hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                  onClick={() => setSelectedRevelation(revelation)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">{revelation.type}</h4>
                      <p className="text-sm text-purple-200">{format(new Date(revelation.created_date), 'MMMM d, yyyy')}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-purple-300" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 p-8 rounded-2xl text-center cosmic-glow">
              <BookOpen className="w-10 h-10 mx-auto text-purple-300 mb-4" />
              <p className="text-white font-medium text-lg">No Revelations Found</p>
              <p className="text-sm text-purple-200 mt-2">Your saved analyses from Azura will appear here after you complete and save them.</p>
            </div>
          )}
        </div>
      </div>
      {selectedRevelation && <RevelationDetailModal revelation={selectedRevelation} onClose={() => setSelectedRevelation(null)} />}
    </>
  );
}