import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Sparkles, Moon, Heart, Star, MessageCircle, Zap } from "lucide-react";

const actions = [
  { title: "Daily Reading", icon: Sparkles, url: createPageUrl("reading") },
  { title: "Spiritual Chat", icon: MessageCircle, url: createPageUrl("chats") },
  { title: "Dream Analysis", description: "Unlock subconscious messages", icon: Moon, url: createPageUrl("dream-analysis") },
  { title: "Love Compatibility", description: "Discover your cosmic match", icon: Heart, url: createPageUrl("love-compatibility") },
  { title: "Self-Care", icon: Star, url: createPageUrl("journeys") },
  { title: "Energy Cleanse", description: "Purify your spiritual field", icon: Zap, url: createPageUrl("fast-energy-cleansing") }
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action) => (
        <Link
          key={action.title}
          to={action.url}
          className="group block"
        >
          <div className="bg-[var(--card-background)] border border-[var(--card-border)] p-4 rounded-2xl shadow-lg transform transition-all duration-300 group-hover:border-[var(--text-secondary)]/40 group-active:scale-95 cosmic-glow h-full flex flex-col justify-center aspect-square">
            <div className="text-center space-y-2">
              <action.icon className="w-7 h-7 text-[var(--icon-primary)] mx-auto mb-2" />
              <div>
                <p className="text-[var(--text-primary)] text-sm font-medium">{action.title}</p>
                {action.description && <p className="text-[var(--text-secondary)] text-xs leading-tight">{action.description}</p>}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}