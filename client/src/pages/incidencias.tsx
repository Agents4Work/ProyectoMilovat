"use client";

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { IncidenciaFormModal } from "@/components/incidencia-form-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, AlertCircle, Clock, CheckCircle2 } from "lucide-react";

// Estados de incidencias
type IncidenciaEstado = "Abierto" | "En Proceso" | "Resuelto" | "Todos";

// Departamentos
type Departamento = "Piso 1" | "Piso 2" | "Piso 3" | "Deudores" | "Todos";

// Interfaz para incidencias
interface Incidencia {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  estado: "Abierto" | "En Proceso" | "Resuelto";
  departamento: string;
}

// Ejemplos de datos iniciales (para hacer pruebas)
const ejemplosIncidencias: Incidencia[] = [
  {
    id: "1",
    titulo: "Fuga de agua en baño",
    descripcion: "Hay una fuga de agua en el baño principal que está causando humedades en el techo del vecino de abajo",
    fecha: "11 abr 2025",
    estado: "Abierto",
    departamento: "Piso 2"
  },
  {
    id: "2",
    titulo: "Problemas con electricidad",
    descripcion: "Los enchufes de la cocina no están funcionando correctamente, se apagan y encienden solos",
    fecha: "09 abr 2025",
    estado: "En Proceso",
    departamento: "Piso 1"
  },
];

export default function Incidencias() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<IncidenciaEstado>("Todos");
  const [filtroDepartamento, setFiltroDepartamento] = useState<Departamento>("Todos");
  const [incidencias, setIncidencias] = useState<Incidencia[]>(ejemplosIncidencias);
  const [incidenciasFiltradas, setIncidenciasFiltradas] = useState<Incidencia[]>(ejemplosIncidencias);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estadísticas para el dashboard
  const contarPorEstado = (estado: "Abierto" | "En Proceso" | "Resuelto") => {
    return incidencias.filter(inc => inc.estado === estado).length;
  };
  
  const numAbiertas = contarPorEstado("Abierto");
  const numEnProceso = contarPorEstado("En Proceso");
  const numResueltos = contarPorEstado("Resuelto");
  
  useEffect(() => {
    // Get user role from session storage
    const role = sessionStorage.getItem('userRole') as "resident" | "admin" | null;
    
    if (!role) {
      // Redirect to login if no role
      navigate('/auth');
      return;
    }
    
    setUserRole(role);
  }, [navigate]);
  
  // Función para agregar una nueva incidencia
  const handleAddIncidencia = (data: { titulo: string; descripcion: string; departamento: string }) => {
    const fechaActual = new Date();
    const opciones: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opciones);
    
    const nuevaIncidencia: Incidencia = {
      id: (incidencias.length + 1).toString(),
      titulo: data.titulo,
      descripcion: data.descripcion,
      fecha: fechaFormateada,
      estado: "Abierto",
      departamento: data.departamento
    };
    
    setIncidencias([...incidencias, nuevaIncidencia]);
    setIsModalOpen(false);
  };

  // Filtrar incidencias basado en búsqueda, estado y departamento
  useEffect(() => {
    let filtered = [...incidencias];
    
    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(inc => 
        inc.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || 
        inc.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filtrar por estado
    if (filtroEstado !== "Todos") {
      filtered = filtered.filter(inc => inc.estado === filtroEstado);
    }
    
    // Filtrar por departamento
    if (filtroDepartamento !== "Todos") {
      filtered = filtered.filter(inc => inc.departamento === filtroDepartamento);
    }
    
    setIncidenciasFiltradas(filtered);
  }, [incidencias, searchQuery, filtroEstado, filtroDepartamento]);
  
  // Esperar hasta que hayamos determinado el rol del usuario
  if (!userRole) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar userRole={userRole} />
      
      {/* Modal de nueva incidencia */}
      <IncidenciaFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddIncidencia}
      />
      
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium">Gestión de Incidencias</h1>
          <Button 
            className="bg-amber-500 hover:bg-amber-600 text-black"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Nueva Incidencia
          </Button>
        </div>
        
        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input 
              placeholder="Buscar incidencias..."
              className="bg-zinc-900/50 border-zinc-800 pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={filtroDepartamento} onValueChange={(val) => setFiltroDepartamento(val as Departamento)}>
            <SelectTrigger className="bg-zinc-900/50 border-zinc-800">
              <SelectValue placeholder="Todos los departamentos" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Todos">Todos los departamentos</SelectItem>
                <SelectItem value="Piso 1">Piso 1</SelectItem>
                <SelectItem value="Piso 2">Piso 2</SelectItem>
                <SelectItem value="Piso 3">Piso 3</SelectItem>
                <SelectItem value="Deudores">Deudores</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Select value={filtroEstado} onValueChange={(val) => setFiltroEstado(val as IncidenciaEstado)}>
            <SelectTrigger className="bg-zinc-900/50 border-zinc-800">
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Todos">Todos los estados</SelectItem>
                <SelectItem value="Abierto">Abierto</SelectItem>
                <SelectItem value="En Proceso">En Proceso</SelectItem>
                <SelectItem value="Resuelto">Resuelto</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {/* Botón de nueva incidencia (versión móvil) */}
        <div className="md:hidden mb-6">
          <Button 
            className="bg-amber-500 hover:bg-amber-600 text-black w-full"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Nueva Incidencia
          </Button>
        </div>
        
        {/* Cards de estado */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm text-zinc-400">Incidencias Abiertas</span>
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <h3 className="text-3xl font-bold mb-1">{numAbiertas}</h3>
            <p className="text-xs text-zinc-500">Sin asignar</p>
          </div>
          
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm text-zinc-400">En Proceso</span>
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
            <h3 className="text-3xl font-bold mb-1">{numEnProceso}</h3>
            <p className="text-xs text-zinc-500">Siendo atendidos</p>
          </div>
          
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm text-zinc-400">Resueltos</span>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold mb-1">{numResueltos}</h3>
            <p className="text-xs text-zinc-500">Esperando confirmación</p>
          </div>
        </div>
        
        {/* Tabla de incidencias */}
        <div className="bg-black/20 rounded-lg border border-zinc-800">
          <div className="p-4 border-b border-zinc-800">
            <h2 className="text-lg font-medium">Incidencias</h2>
            <p className="text-sm text-zinc-500">Visualiza el estado de tus incidencias</p>
          </div>
          
          {incidenciasFiltradas.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-zinc-500">No se encontraron incidencias que coincidan con tu búsqueda</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left p-4 text-sm font-medium">Título</th>
                    <th className="text-left p-4 text-sm font-medium">Descripción</th>
                    <th className="text-left p-4 text-sm font-medium">Fecha</th>
                    <th className="text-left p-4 text-sm font-medium">Estado</th>
                    <th className="text-left p-4 text-sm font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {incidenciasFiltradas.map((incidencia) => (
                    <tr key={incidencia.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition">
                      <td className="p-4">{incidencia.titulo}</td>
                      <td className="p-4 text-zinc-400">
                        <span className="line-clamp-1">{incidencia.descripcion}</span>
                      </td>
                      <td className="p-4 text-zinc-400">{incidencia.fecha}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          incidencia.estado === "Abierto" ? "bg-red-500/20 text-red-400" :
                          incidencia.estado === "En Proceso" ? "bg-amber-500/20 text-amber-400" :
                          incidencia.estado === "Resuelto" ? "bg-green-500/20 text-green-400" :
                          "bg-zinc-500/20 text-zinc-400"
                        }`}>
                          {incidencia.estado}
                        </span>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm" className="hover:bg-zinc-800">
                          Detalles
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}