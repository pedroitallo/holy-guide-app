
import React, { useState, useEffect } from 'react';
import { User } from '@/api/entities';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, User as UserIcon, MoreHorizontal, Loader } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { adminCache } from './cache';

export default function UsersTab() {
  const [allUsers, setAllUsers] = useState(adminCache.users.data);
  const [filteredUsers, setFilteredUsers] = useState(adminCache.users.data);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(!adminCache.users.loaded);

  useEffect(() => {
    if (adminCache.users.loaded) {
      return;
    }

    const fetchUsers = async () => {
      try {
        const users = await User.list('-created_date');
        adminCache.users.data = users;
        adminCache.users.loaded = true;
        setAllUsers(users);
        setFilteredUsers(users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = allUsers.filter(user => {
      return (
        user.full_name?.toLowerCase().includes(lowercasedFilter) ||
        user.email?.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredUsers(filtered);
  }, [searchTerm, allUsers]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Buscar Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input 
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              Resultados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{filteredUsers.length}</p>
            <p className="text-sm text-zinc-500">de {allUsers.length} usuários</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Último Acesso</TableHead>
                  <TableHead>Data de Registro</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan="6" className="text-center"><Loader className="mx-auto animate-spin" /></TableCell></TableRow>
                ) : (
                  filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.full_name || 'N/A'}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.last_login_date ? format(new Date(user.last_login_date), "dd/MM/yyyy, HH:mm", { locale: ptBR }) : 'Nunca'}</TableCell>
                      <TableCell>{format(new Date(user.created_date), "dd/MM/yyyy, HH:mm", { locale: ptBR })}</TableCell>
                      <TableCell><Badge variant={user.is_premium ? "default" : "secondary"}>{user.is_premium ? 'Premium' : 'Padrão'}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
