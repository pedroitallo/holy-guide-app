import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function GuideCard({ guide, index }) {
  const Icon = guide.icon;
  
  const getPageUrl = () => {
    if (!guide.interactive) return "#";
    
    const slug = guide.title.toLowerCase().replace(/\s+/g, '-');
    return createPageUrl(slug);
  };
  
  const CardContent = (
    <div 
      className="bg-gray-900/50 backdrop-blur-lg border border-white/10 p-3 rounded-2xl shadow-lg transform transition-all duration-300 hover:bg-white/5 group-active:scale-95 cosmic-glow cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="text-center space-y-2">
        <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center mx-auto">
          <Icon className="w-5 h-5 text-purple-300" />
        </div>
        <div>
          <h3 className="text-white font-medium text-sm">{guide.title}</h3>
          <p className="text-purple-200 text-xs leading-tight">{guide.description}</p>
        </div>
      </div>
    </div>
  );
  
  if (guide.interactive) {
    return (
      <Link to={getPageUrl()}>
        {CardContent}
      </Link>
    );
  }
  
  return CardContent;
}