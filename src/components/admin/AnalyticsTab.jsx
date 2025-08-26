
import React, { useState, useEffect } from 'react';
import { User } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserPlus, TrendingUp } from 'lucide-react';
import { differenceInDays } from 'date-fns';
import { adminCache } from './cache';

const StatCard = ({ title, value, icon: Icon, details }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-zinc-600">{title}</CardTitle>
      <Icon className="h-4 w-4 text-zinc-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {details && <p className="text-xs text-zinc-500">{details}</p>}
    </CardContent>
  </Card>
);

export default function AnalyticsTab() {
  const [stats, setStats] = useState(adminCache.analytics.data);
  const [isLoading, setIsLoading] = useState(!adminCache.analytics.loaded);

  useEffect(() => {
    if (adminCache.analytics.loaded) {
      return;
    }

    const fetchStats = async () => {
      try {
        const allUsers = await User.list();
        const now = new Date();
        
        const totalUsers = allUsers.length;
        const premiumUsers = allUsers.filter(u => u.is_premium).length;
        const newLast7Days = allUsers.filter(u => differenceInDays(now, new Date(u.created_date)) <= 7).length;
        const newLast15Days = allUsers.filter(u => differenceInDays(now, new Date(u.created_date)) <= 15).length;
        const newLast30Days = allUsers.filter(u => differenceInDays(now, new Date(u.created_date)) <= 30).length;

        const newStats = { totalUsers, premiumUsers, newLast7Days, newLast15Days, newLast30Days };
        adminCache.analytics.data = newStats;
        adminCache.analytics.loaded = true;
        setStats(newStats);
      } catch (error) {
        console.error("Failed to fetch user stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array(4).fill(0).map((_, i) => (
        <Card key={i}><CardHeader><CardTitle className="text-sm font-medium text-zinc-600">Carregando...</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold h-8 bg-zinc-200 rounded animate-pulse"></div></CardContent></Card>
      ))}
    </div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Usuários Totais" value={stats.totalUsers} icon={Users} />
      <StatCard title="Usuários Premium" value={stats.premiumUsers} icon={UserCheck} details="Assinantes ativos" />
      <StatCard title="Novos Usuários" value={stats.newLast30Days} icon={UserPlus} details="Últimos 30 dias" />
      <StatCard title="Crescimento" value={`${stats.newLast7Days} / ${stats.newLast15Days}`} icon={TrendingUp} details="7 dias / 15 dias" />
    </div>
  );
}
