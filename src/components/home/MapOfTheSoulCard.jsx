import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ChevronRight } from 'lucide-react';

export default function MapOfTheSoulCard() {
  return (
    <Link to={createPageUrl('journeys')} className="block group">
      <div className="bg-[#a400d6] p-5 rounded-2xl border border-[var(--card-border)] cosmic-glow shadow-2xl animate-in fade-in duration-500 hover:border-[var(--text-secondary)]/50 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--text-secondary)]">Your spiritual map is waiting</p>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Access the Map of the Soul</h3>
          </div>
          <div className="p-2 transition-transform duration-300 group-hover:translate-x-1">
            <ChevronRight className="w-5 h-5 text-[var(--text-primary)]" />
          </div>
        </div>
      </div>
    </Link>
  );
}