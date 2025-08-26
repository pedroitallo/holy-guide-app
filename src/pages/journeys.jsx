import React, { useState } from 'react';
import { journeysData } from '../components/journeys/data';
import TopicFilters from '../components/journeys/TopicFilters';
import JourneySection from '../components/journeys/JourneySection';
import { Compass, Lock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyDestineTab from '../components/journeys/MyDestineTab';

export default function JourneysPage() {
  const [activeTopic, setActiveTopic] = useState('love');

  const activeJourney = journeysData[activeTopic];

  return (
    <div className="px-4 pt-12 pb-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center space-x-3">
            <Compass className="w-7 h-7 text-purple-300" />
            <h1 className="text-3xl font-light text-white">Your Destiny</h1>
          </div>
          <p className="text-purple-200 text-sm">
            Interactive guides for your spiritual growth.
          </p>
        </div>

        <Tabs defaultValue="destiny" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/60 p-1.5 rounded-full border border-white/10">
              <TabsTrigger value="destiny" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-full transition-all duration-300 text-purple-200">My Destine</TabsTrigger>
              <TabsTrigger value="explore" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-full transition-all duration-300 text-purple-200 relative">
                <Lock className="w-4 h-4 mr-2" />
                Explore Journeys
              </TabsTrigger>
          </TabsList>
          
          <TabsContent value="destiny" className="mt-6">
              <MyDestineTab />
          </TabsContent>

          <TabsContent value="explore" className="mt-6">
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
              <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center border border-white/10">
                <Lock className="w-12 h-12 text-purple-300" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold text-white">Coming Soon</h3>
                <p className="text-purple-200 text-lg">Shortly...</p>
                <p className="text-purple-300 text-sm max-w-md">
                  We're preparing an incredible collection of spiritual journeys just for you. 
                  Stay tuned for this transformative experience.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}