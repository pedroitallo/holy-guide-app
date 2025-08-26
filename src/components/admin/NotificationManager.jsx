import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bell, Send, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { sendPushNotification } from '@/api/functions';

export default function NotificationManager({ onNotificationSent }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleSendNotification = async () => {
    if (!title || !body) {
      setFeedback({ type: 'error', message: 'Título e corpo são obrigatórios.' });
      return;
    }

    setIsSending(true);
    setFeedback({ type: '', message: '' });

    try {
      const { data, error } = await sendPushNotification({ title, body, topic: 'holyguide_users' });

      if (error || (data && data.success === false)) {
        const fcmError = data?.fcm_response?.results?.[0]?.error;
        const errorMessage = data?.error || fcmError || 'Ocorreu um erro desconhecido.';
        setFeedback({ type: 'error', message: `Falha ao enviar: ${errorMessage}` });
      } else {
        setFeedback({ type: 'success', message: 'Notificação enviada com sucesso!' });
        setTitle('');
        setBody('');
        if (onNotificationSent) {
          onNotificationSent({ title, body, status: 'success', fcm_response: data.fcm_response });
        }
      }
    } catch (e) {
      setFeedback({ type: 'error', message: `Erro de comunicação: ${e.message}. Verifique os logs da função para mais detalhes.` });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Gerenciador de Notificação Push
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Título da Notificação"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Mensagem da Notificação"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        {feedback.message && (
          <div className={`p-3 rounded-lg text-sm flex items-start gap-3 ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {feedback.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <div>{feedback.message}</div>
          </div>
        )}

        <Button onClick={handleSendNotification} disabled={isSending} className="w-full">
          {isSending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          Enviar Notificação para Todos
        </Button>
      </CardContent>
    </Card>
  );
}