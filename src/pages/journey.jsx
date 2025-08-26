import React, { useState, useEffect } from "react";
import { JourneyEntry } from "@/api/entities";
import { Plus, Moon, Heart } from "lucide-react";
import { format } from "date-fns";

import JourneyForm from "../components/journey/JourneyForm";
import JourneyList from "../components/journey/JourneyList";

export default function Journey() {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    const data = await JourneyEntry.list('-created_date', 20);
    setEntries(data);
    setIsLoading(false);
  };

  const handleNewEntry = async (entryData) => {
    const newEntry = await JourneyEntry.create({
      ...entryData,
      date: format(new Date(), 'yyyy-MM-dd')
    });
    setEntries([newEntry, ...entries]);
    setShowForm(false);
  };

  return (
    <div className="px-4 pt-12 pb-8">
      <div className="max-w-sm mx-auto space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center space-x-2">
            <Moon className="w-6 h-6 text-purple-300" />
            <h1 className="text-2xl font-light text-white">Spiritual Journey</h1>
            <Heart className="w-6 h-6 text-pink-300" />
          </div>
          <p className="text-purple-200 text-sm">
            Reflect on your path and inner growth
          </p>
        </div>

        {!showForm ? (
          <div className="space-y-4">
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-2xl font-medium shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 cosmic-glow"
            >
              <div className="flex items-center justify-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>New Reflection</span>
              </div>
            </button>
            
            <JourneyList entries={entries} isLoading={isLoading} />
          </div>
        ) : (
          <JourneyForm 
            onSave={handleNewEntry}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
}