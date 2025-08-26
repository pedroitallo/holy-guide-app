
import React from 'react';
import JourneyCard from './JourneyCard';
import { ChevronRight } from 'lucide-react';

export default function JourneySection({ section }) {
  return (
    <section className="space-y-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between px-4 sm:px-0">
        <div>
          <h3 className="text-xl font-semibold text-white">{section.title}</h3>
          <p className="text-sm text-purple-200">{section.description}</p>
        </div>
        <button className="flex items-center text-sm text-purple-300 hover:text-white transition-colors group">
          <span>See all</span>
          <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        {section.cards.map((card, index) => (
          <JourneyCard key={index} card={card} />
        ))}
         <div className="flex-shrink-0 w-1"></div>
      </div>
    </section>
  );
};
