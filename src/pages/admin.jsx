import React, { useState, useEffect } from 'react';
import { User } from '@/api/entities';
import { Shield, AlertTriangle, Loader, LayoutDashboard, Bell, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsTab from '../components/admin/AnalyticsTab';
import NotificationsTab from '../components/admin/NotificationsTab';
import UsersTab from '../components/admin/UsersTab';

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await User.me();
        if (currentUser && currentUser.role === 'admin') {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Authentication check failed", error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <Loader className="w-8 h-8 text-purple-600 animate-spin mx-auto" />
          <p className="text-zinc-600 mt-2">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <div className="bg-white border border-red-200 p-8 rounded-2xl max-w-md shadow-md">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-zinc-800">Acesso Negado</h1>
          <p className="text-zinc-600 mt-2">
            Você não tem permissão para acessar esta página. Apenas administradores podem visualizar este conteúdo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-900">Admin Dashboard</h1>
          <p className="text-zinc-500 mt-1">Gerencie notificações, usuários e veja análises</p>
        </div>

        <Tabs defaultValue="analytics" className="w-full">
          <div className="flex justify-center">
            <TabsList className="bg-zinc-200 p-1.5 rounded-xl">
              <TabsTrigger value="analytics" className="px-4 py-2 flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md"><LayoutDashboard className="w-4 h-4" /> Visão Geral</TabsTrigger>
              <TabsTrigger value="notifications" className="px-4 py-2 flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md"><Bell className="w-4 h-4" /> Notificações</TabsTrigger>
              <TabsTrigger value="users" className="px-4 py-2 flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md"><Users className="w-4 h-4" /> Usuários</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="analytics" className="mt-6">
            <AnalyticsTab />
          </TabsContent>
          <TabsContent value="notifications" className="mt-6">
            <NotificationsTab />
          </TabsContent>
          <TabsContent value="users" className="mt-6">
            <UsersTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}