
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Users, Map, BookOpen, HelpCircle } from "lucide-react";

const navigationItems = [
  { title: "Home", url: createPageUrl("home"), icon: Home },
  { title: "Consultants", url: createPageUrl("chats"), icon: Users },
  { title: "Journey", url: createPageUrl("journeys"), icon: Map },
  { title: "Reading", url: createPageUrl("reading"), icon: BookOpen },
  { title: "Guide", url: createPageUrl("guide"), icon: HelpCircle },
];

const FloatingElements = () => (
  <>
    <div className="absolute top-20 left-10 animate-pulse">
      <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
    </div>
    <div className="absolute top-32 right-16 animate-bounce" style={{animationDelay: '1s'}}>
      <div className="text-white text-lg opacity-40">✨</div>
    </div>
    <div className="absolute top-48 left-1/4 animate-pulse" style={{animationDelay: '2s'}}>
      <div className="text-white text-xl opacity-30">🌙</div>
    </div>
    <div className="absolute top-64 right-8 animate-bounce" style={{animationDelay: '3s'}}>
      <div className="w-1 h-1 bg-purple-300 rounded-full opacity-50"></div>
    </div>
    <div className="absolute top-80 left-12 animate-pulse" style={{animationDelay: '4s'}}>
      <div className="text-purple-200 text-sm opacity-40">⭐</div>
    </div>
    <div className="absolute top-96 right-1/3 animate-bounce" style={{animationDelay: '1.5s'}}>
      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-300 opacity-30"></div>
    </div>
  </>
);

const isPublicPage = () => {
  const currentPath = window.location.pathname;
  const publicPages = ['/onboarding']; 
  return publicPages.some(page => currentPath.startsWith(page));
};

const isAdminPage = () => {
  const currentPath = window.location.pathname;
  return currentPath.includes('/admin');
};

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  if (isPublicPage()) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--background-start)] to-[var(--background-end)]">
        <style>{`
           :root {
              --background-start: #1C132F;
              --background-end: #0F0A1A;
            }
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
          * { font-family: 'Inter', sans-serif; }
          .font-serif { font-family: 'Playfair Display', serif; }
        `}</style>
        {children}
      </div>
    );
  }

  if (currentPageName && currentPageName.toLowerCase() === 'admin') {
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900">
        {children}
      </div>
    );
  }

  if (currentPageName && (currentPageName.toLowerCase() === 'chat' || currentPageName.toLowerCase() === 'chats')) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--background-start)] to-[var(--background-end)] relative overflow-hidden">
      <style>{`
        :root {
          --background-start: #1C132F;
          --background-end: #0F0A1A;
          --card-background: rgba(42, 33, 64, 0.4);
          --card-border: rgba(175, 163, 222, 0.2);
          --text-primary: #FFFFFF;
          --text-secondary: #D7CFFC;
          --icon-primary: #D7CFFC;
          --nav-background: rgba(28, 19, 47, 0.8);
        }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .cosmic-glow { box-shadow: 0 0 20px rgba(42, 33, 64, 0.5); }
        .nav-glow { box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3); }
      `}</style>
      <FloatingElements />
      <main className="relative z-10 pb-24">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <div className="mx-auto w-full max-w-md">
          <div className="bg-[var(--nav-background)] backdrop-blur-lg border border-[var(--card-border)] rounded-2xl px-2 py-2 nav-glow">
            <div className="flex justify-around items-center">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url || (item.title === 'Consultants' && location.pathname.startsWith('/chat'));
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`flex flex-col items-center justify-center w-full h-14 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/5' : 'hover:bg-white/5'}`}
                  >
                    <item.icon className={`w-5 h-5 mb-1 transition-colors duration-300 ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--icon-primary)]'}`} />
                    <span className={`text-xs font-medium transition-colors duration-300 ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--icon-primary)]'}`}>
                      {item.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
