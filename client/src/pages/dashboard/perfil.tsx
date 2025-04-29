'use client';

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DashboardSidebar from '@/components/dashboard-sidebar';
import { useUpdatePassword } from '@/hooks/useProfile';
import { toast } from '@/hooks/use-toast';

export default function Perfil() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updatePassword = useUpdatePassword();

  useEffect(() => {
    const role = sessionStorage.getItem('userRole') as "resident" | "admin" | null;
    const id = sessionStorage.getItem('userId');

    if (!role || !id) {
      navigate('/auth');
      return;
    }

    if (role !== "admin") {
      navigate('/dashboard');
      return;
    }

    setUserRole(role);
    setUserId(id);
  }, [navigate]);

  if (!userRole || !userId) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast({
        title: "Error de validación",
        description: "La contraseña debe tener al menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden.",
        variant: "destructive",
      });
      return;
    }

    try {
      await updatePassword.mutateAsync({
        userId,
        newPassword,
      });

      toast({
        title: "Contraseña actualizada",
        description: "Se ha cambiado la contraseña exitosamente.",
      });

      setNewPassword('');
      setConfirmPassword('');
    } catch {
      toast({
        title: "Error",
        description: "Hubo un error al actualizar la contraseña.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar userRole={userRole} />

      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-medium mb-6">Configuración de Perfil</h1>

        <Card className="bg-zinc-900/50 border-zinc-800 w-full max-w-lg mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Actualizar Contraseña</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirmar nueva contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button onClick={handleChangePassword} className="bg-amber-500 hover:bg-amber-600 text-black">
              Guardar cambios
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}