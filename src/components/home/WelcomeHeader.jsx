import React from 'react';

export default function WelcomeHeader({ user }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (!user) {
    return (
      <div className="space-y-2 animate-pulse">
        <div className="h-7 bg-white/10 rounded-md w-48"></div>
      </div>);

  }

  return (
    <div>
      <h1 className="text-[#e0ccf0] text-sm font-medium uppercase tracking-wider">
        {getGreeting()}, {user.full_name || "Seeker"}
      </h1>
    </div>);

}