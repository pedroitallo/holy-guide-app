import React from 'react';

export default function JourneyCard({ card }) {
  const { icon: Icon, title, subtitle, type } = card;
  const imageUrl = `https://source.unsplash.com/random/300x400/?${type},spiritual,abstract`;

  return (
    <div className="flex-shrink-0 w-40 sm:w-48 group cursor-pointer" role="button" tabIndex="0">
      <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-gray-800 shadow-lg cosmic-glow transition-all duration-300 group-hover:shadow-purple-500/30 group-hover:-translate-y-1">
        <img src={imageUrl} alt={`Cover for ${title} - ${subtitle}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm p-2 rounded-full">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs text-purple-300 uppercase font-semibold tracking-wider">{title}</p>
          <h4 className="text-white font-medium mt-1 leading-tight text-sm">{subtitle}</h4>
        </div>
      </div>
    </div>
  );
};