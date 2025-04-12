'use client';

import { useState, useEffect, Fragment } from 'react';
import { useLocation } from 'wouter';
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, UserCheck, LogIn, LogOut, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RegistrarVisitaModal } from "@/components/registrar-visita-modal";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Definición de una visita
interface Visita {
  id: string;
  residente: string;
  departamento: string;
  visitante: string;
  fechaEntrada: string;
  fechaSalida: string | null;
  estado: 'Pendiente' | 'Activa' | 'Completada';
}

export default function Visitas() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  
  // Lista de visitas (datos de ejemplo)
  const [visitas, setVisitas] = useState<Visita[]>([
    {
      id: "1",
      residente: "Ana González",
      departamento: "2A",
      visitante: "Carlos Martínez",
      fechaEntrada: "2025-04-10T14:30:00",
      fechaSalida: "2025-04-10T18:45:00",
      estado: 'Completada'
    },
    {
      id: "2",
      residente: "Roberto Vega",
      departamento: "5C",
      visitante: "María López",
      fechaEntrada: "2025-04-11T10:15:00",
      fechaSalida: null,
      estado: 'Activa'
    },
    {
      id: "3",
      residente: "Laura Sánchez",
      departamento: "3B",
      visitante: "Pedro Ramírez",
      fechaEntrada: "2025-04-12T12:00:00",
      fechaSalida: "2025-04-12T14:20:00",
      estado: 'Completada'
    },
    {
      id: "4",
      residente: "Miguel Torres",
      departamento: "1D",
      visitante: "Julia García",
      fechaEntrada: "2025-04-12T16:30:00",
      fechaSalida: null,
      estado: 'Activa'
    },
    {
      id: "5",
      residente: "Carmen Flores",
      departamento: "7A",
      visitante: "Jorge Mendoza",
      fechaEntrada: "2025-04-13T09:00:00",
      fechaSalida: null,
      estado: 'Pendiente'
    }
  ]);

  // Filtrar visitas basado en la búsqueda
  const filteredVisitas = visitas.filter(visita => 
    visita.residente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visita.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visita.visitante.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular estadísticas
  const totalVisitas = visitas.length;
  const visitasActivas = visitas.filter(visita => visita.estado === 'Activa').length;
  const visitasCompletadas = visitas.filter(visita => visita.estado === 'Completada').length;

  // Formatear fecha para mostrarla en formato legible
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
  
  // Abrir modal de registro de visita
  const handleMostrarRegistroModal = () => {
    setShowRegistroModal(true);
  };
  
  // Función para registrar una nueva visita
  const handleAgregarVisita = (nuevaVisitaData: {
    residente: string;
    departamento: string;
    visitante: string;
    fechaEntrada: string;
  }) => {
    // Generar un ID único
    const nuevoId = (visitas.length + 1).toString();
    
    // Crear nueva visita
    const nuevaVisita: Visita = {
      id: nuevoId,
      ...nuevaVisitaData,
      fechaSalida: null,
      estado: 'Pendiente' // Por defecto es pendiente
    };
    
    // Actualizar el estado
    setVisitas([...visitas, nuevaVisita]);
    
    // Mostrar notificación
    toast({
      title: "Visita registrada",
      description: `Se ha registrado una visita de ${nuevaVisitaData.visitante} para el departamento ${nuevaVisitaData.departamento}`,
    });
  };
  
  // Función para cambiar el estado de una visita
  const handleCambiarEstado = (id: string, nuevoEstado: 'Pendiente' | 'Activa' | 'Completada') => {
    // Actualizar la lista de visitas con el nuevo estado
    const visitasActualizadas = visitas.map(visita => {
      if (visita.id === id) {
        // Si el estado cambia a Completada, agregar fecha de salida
        const fechaSalida = nuevoEstado === 'Completada' ? new Date().toISOString() : visita.fechaSalida;
        return {
          ...visita,
          estado: nuevoEstado,
          fechaSalida
        };
      }
      return visita;
    });
    
    // Actualizar el estado
    setVisitas(visitasActualizadas);
    
    // Mostrar notificación
    toast({
      title: "Estado actualizado",
      description: `La visita ha sido marcada como ${nuevoEstado}`,
    });
  };

  useEffect(() => {
    // Get user role from session storage
    const role = sessionStorage.getItem('userRole') as "resident" | "admin" | null;
    
    if (!role) {
      // Redirect to login if no role
      navigate('/auth');
      return;
    }
    
    if (role !== "admin") {
      // Si no es administrador, redirigir al dashboard
      navigate('/dashboard');
      return;
    }
    
    setUserRole(role);
  }, [navigate]);
  
  // Wait until we have determined the user role
  if (!userRole) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }
  
  return (
    <Fragment>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <DashboardSidebar userRole={userRole} />
        
        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-medium mb-2">Visitas</h1>
          <p className="text-zinc-400 mb-6">Administración de visitas del edificio</p>
          
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Total Visitas */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Total de Visitas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-amber-500/10 p-2">
                    <UserCheck className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{totalVisitas}</div>
                    <p className="text-xs text-zinc-500">Programadas este día</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Visitas Activas */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Visitas Activas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-amber-500/10 p-2">
                    <LogIn className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{visitasActivas}</div>
                    <p className="text-xs text-zinc-500">Visitantes dentro del edificio</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Visitas Completadas */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Visitas Completadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-amber-500/10 p-2">
                    <LogOut className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{visitasCompletadas}</div>
                    <p className="text-xs text-zinc-500">Visitas que han finalizado</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input 
                placeholder="Buscar por residente, departamento o visitante..." 
                className="bg-zinc-900/50 border-zinc-800 pl-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                onClick={handleMostrarRegistroModal}
              >
                Registrar Visita
              </Button>
              <Button 
                variant="outline" 
                className="border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
              >
                Exportar
              </Button>
            </div>
          </div>
          
          {/* Table */}
          <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableCaption>Lista de visitas registradas</TableCaption>
                <TableHeader className="bg-zinc-800/50">
                  <TableRow>
                    <TableHead className="w-[180px]">Nombre Residente</TableHead>
                    <TableHead className="w-[100px]">Departamento</TableHead>
                    <TableHead className="w-[180px]">Nombre Visitante</TableHead>
                    <TableHead className="w-[180px]">Fecha de Entrada</TableHead>
                    <TableHead className="w-[180px]">Fecha de Salida</TableHead>
                    <TableHead className="w-[100px]">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVisitas.length > 0 ? (
                    filteredVisitas.map((visita) => (
                      <TableRow key={visita.id}>
                        <TableCell className="font-medium">{visita.residente}</TableCell>
                        <TableCell>{visita.departamento}</TableCell>
                        <TableCell>{visita.visitante}</TableCell>
                        <TableCell>{formatearFechaHora(visita.fechaEntrada)}</TableCell>
                        <TableCell>{formatearFechaHora(visita.fechaSalida)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <div className="flex items-center space-x-2">
                                <Badge 
                                  className={`${
                                    visita.estado === "Completada" 
                                      ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" 
                                      : visita.estado === "Activa"
                                        ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                                        : "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                                  }`}
                                >
                                  {visita.estado}
                                </Badge>
                                <MoreHorizontal className="h-4 w-4 text-zinc-500" />
                              </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => handleCambiarEstado(visita.id, 'Pendiente')}
                                className="text-amber-500"
                              >
                                Pendiente
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleCambiarEstado(visita.id, 'Activa')}
                                className="text-blue-500"
                              >
                                Activa
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleCambiarEstado(visita.id, 'Completada')}
                                className="text-green-500"
                              >
                                Completada
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24 text-zinc-500">
                        No se encontraron visitas
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      <RegistrarVisitaModal
        isOpen={showRegistroModal}
        onClose={() => setShowRegistroModal(false)}
        onSave={handleAgregarVisita}
      />
    </Fragment>
  );
}