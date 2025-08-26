import React, { useState, useEffect } from 'react';
import { NotificationLog } from '@/api/entities';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, BarChart, Loader, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

export default function NotificationMetrics() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await NotificationLog.list('-created_date', 50);
        setLogs(data);
      } catch (e) {
        setError("Falha ao carregar os logs de notificação.");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Envios Totais</CardTitle><LineChart className="h-4 w-4 text-zinc-500" /></CardHeader>
            <CardContent><div className="text-2xl font-bold">{logs.length}</div><p className="text-xs text-zinc-500">Nos últimos 50 envios</p></CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle><BarChart className="h-4 w-4 text-zinc-500" /></CardHeader>
            <CardContent><div className="text-2xl font-bold">{logs.length > 0 ? `${((logs.filter(l => l.status === 'success').length / logs.length) * 100).toFixed(1)}%` : 'N/A'}</div><p className="text-xs text-zinc-500">Baseado nos envios recentes</p></CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Envios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sucessos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan="4" className="text-center"><Loader className="mx-auto animate-spin" /></TableCell></TableRow>
                ) : error ? (
                   <TableRow><TableCell colSpan="4" className="text-center text-red-500"><AlertCircle className="inline-block mr-2"/>{error}</TableCell></TableRow>
                ) : logs.map(log => (
                  <TableRow key={log.id}>
                    <TableCell>{format(new Date(log.created_date), "dd/MM/yy HH:mm", { locale: ptBR })}</TableCell>
                    <TableCell className="font-medium">{log.title}</TableCell>
                    <TableCell><Badge variant={log.status === 'success' ? 'success' : 'destructive'}>{log.status}</Badge></TableCell>
                    <TableCell>{log.fcm_response?.success || 0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}