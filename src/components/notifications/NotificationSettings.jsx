import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, BellOff, Clock, Moon, Sparkles } from "lucide-react";
import { User } from "@/api/entities";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    dailyReadings: true,
    moonPhases: true,
    journeyReminders: false,
    weeklyInsights: true
  });
  const [permission, setPermission] = useState('default');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSettings();
    checkPermissionStatus();
  }, []);

  const loadSettings = async () => {
    try {
      const user = await User.me();
      if (user.notification_settings) {
        setSettings({ ...settings, ...user.notification_settings });
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  };

  const checkPermissionStatus = () => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  };

  const requestPermission = async () => {
    setIsLoading(true);
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      await User.updateMyUserData({
        notification_permission: result,
        notification_permission_asked: true
      });

      if (result === 'granted') {
        new Notification('🔮 HolyGuide', {
          body: 'Notificações ativadas com sucesso!',
          icon: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/782699588_LogoHolyGuide1.png'
        });
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
    }
    setIsLoading(false);
  };

  const updateSetting = async (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    try {
      await User.updateMyUserData({
        notification_settings: newSettings
      });
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
    }
  };

  const settingsOptions = [
    {
      key: 'dailyReadings',
      title: 'Leituras Diárias',
      description: 'Receba sua energia reading diária',
      icon: Sparkles
    },
    {
      key: 'moonPhases',
      title: 'Fases da Lua',
      description: 'Notificações sobre mudanças lunares',
      icon: Moon
    },
    {
      key: 'journeyReminders',
      title: 'Lembretes de Reflexão',
      description: 'Lembrete para registrar suas experiências',
      icon: Clock
    },
    {
      key: 'weeklyInsights',
      title: 'Insights Semanais',
      description: 'Resumo semanal do seu crescimento espiritual',
      icon: Bell
    }
  ];

  if (permission === 'denied') {
    return (
      <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 cosmic-glow">
        <div className="text-center space-y-4">
          <BellOff className="w-12 h-12 text-gray-400 mx-auto" />
          <div>
            <h3 className="text-lg font-medium text-white mb-2">
              Notificações Bloqueadas
            </h3>
            <p className="text-purple-200 text-sm">
              Para receber notificações, ative-as nas configurações do seu navegador.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {permission !== 'granted' && (
        <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 cosmic-glow">
          <div className="text-center space-y-4">
            <Bell className="w-12 h-12 text-purple-300 mx-auto" />
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                Ativar Notificações
              </h3>
              <p className="text-purple-200 text-sm mb-4">
                Receba lembretes espirituais e orientações diárias
              </p>
              <Button
                onClick={requestPermission}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
              >
                {isLoading ? 'Ativando...' : 'Permitir Notificações'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {permission === 'granted' && (
        <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 cosmic-glow">
          <h3 className="text-lg font-medium text-white mb-4">
            Configurações de Notificação
          </h3>
          
          <div className="space-y-4">
            {settingsOptions.map((option) => (
              <div
                key={option.key}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex items-center space-x-3">
                  <option.icon className="w-5 h-5 text-purple-300" />
                  <div>
                    <p className="text-white font-medium text-sm">{option.title}</p>
                    <p className="text-purple-200 text-xs">{option.description}</p>
                  </div>
                </div>
                <Switch
                  checked={settings[option.key]}
                  onCheckedChange={(value) => updateSetting(option.key, value)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}