import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';

export default function NotificationAutomations() {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto bg-zinc-100 rounded-full p-3 w-fit">
            <Wand2 className="w-8 h-8 text-purple-600" />
        </div>
        <CardTitle className="mt-4">Automações de Notificações</CardTitle>
        <CardDescription>Esta funcionalidade está em desenvolvimento.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-zinc-600">
          Em breve, você poderá criar regras para enviar notificações automáticas 
          com base em ações do usuário, como por exemplo, um lembrete de reflexão 
          para usuários inativos há 7 dias.
        </p>
      </CardContent>
    </Card>
  );
}