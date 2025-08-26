import React from 'react';

export default function TopicFilters({ topics, activeTopic, setActiveTopic }) {
  return (
    <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
      {Object.keys(topics).map((key) => {
        const topic = topics[key];
        const isActive = activeTopic === key;
        return (
          <button
            key={key}
            onClick={() => setActiveTopic(key)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 transform active:scale-95 ${
              isActive
                ? 'bg-purple-600 text-white shadow-lg cosmic-glow'
                : 'bg-gray-800/60 text-purple-200 hover:bg-gray-700'
            }`}
          >
            <topic.icon className="w-4 h-4" />
            <span>{topic.title}</span>
          </button>
        );
      })}
    </div>
  );
};