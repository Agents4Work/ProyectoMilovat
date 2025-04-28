'use client';

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import DashboardSidebar from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserCheck, LogIn, LogOut } from "lucide-react";
import { useVisits } from "@/hooks/useVisits";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { exportVisitasPdf } from "@/lib/exportVisitasPdf";

export default function Visitas() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: visitas = [], isLoading } = useVisits();

  const filteredVisitas = visitas.filter((visita) => 
    visita.visitorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visita.apartmentId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalVisitas = visitas.length;
  const visitasActivas = visitas.filter(visita => visita.exitTime === null).length;
  const visitasCompletadas = visitas.filter(visita => visita.exitTime !== null).length;

  const formatearFechaHora = (fechaStr: string | null) => {
    if (!fechaStr) return "Pendiente";
    const fecha = new Date(fechaStr);
    return fecha.toLocaleString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleExportarPDF = () => {
    if (visitas.length === 0) {
      toast({
        title: "No hay datos para exportar",
        description: "No se encontraron visitas para exportar",
        variant: "destructive",
      });
      return;
    }

    const visitasData = visitas.map((v) => ({
      residente: "-", 
      departamento: v.apartmentId,
      visitante: v.visitorName,
      fechaEntrada: formatearFechaHora(v.entryTime),
      fechaSalida: v.exitTime ? formatearFechaHora(v.exitTime) : null,
      estado: v.exitTime ? "Completada" : "Activa",
    }));

    exportVisitasPdf(visitasData);
  };

  useEffect(() => {
    const role = sessionStorage.getItem('userRole') as "resident" | "admin" | null;
    if (!role) return navigate('/auth');
    if (role !== "admin") return navigate('/dashboard');
    setUserRole(role);
  }, [navigate]);

  if (!userRole || isLoading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar userRole={userRole} />
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-medium mb-2">Visitas</h1>
        <p className="text-zinc-400 mb-6">Administración de visitas del edificio</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <DashboardCard label="Total de Visitas" value={totalVisitas} />
          <DashboardCard label="Visitas Activas" value={visitasActivas} />
          <DashboardCard label="Visitas Completadas" value={visitasCompletadas} />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            placeholder="Buscar visitante o departamento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-zinc-900/50 border-zinc-800 pl-9"
          />
          <Button
            variant="outline"
            className="border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
            onClick={handleExportarPDF}
          >
            Exportar
          </Button>
        </div>

        <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableCaption>Lista de visitas registradas</TableCaption>
              <TableHeader className="bg-zinc-800/50">
                <TableRow>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Visitante</TableHead>
                  <TableHead>Fecha de Entrada</TableHead>
                  <TableHead>Fecha de Salida</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVisitas.map((visita) => (
                  <TableRow key={visita._id}>
                    <TableCell>{visita.apartmentId}</TableCell>
                    <TableCell>{visita.visitorName}</TableCell>
                    <TableCell>{formatearFechaHora(visita.entryTime)}</TableCell>
                    <TableCell>{formatearFechaHora(visita.exitTime)}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          visita.exitTime
                            ? "bg-green-500/10 text-green-500"
                            : "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        {visita.exitTime ? "Completada" : "Activa"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function DashboardCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}