"use client";

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { IncidenciaFormModal } from "@/components/incidencia-form-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { useIncidents, Incident } from "@/hooks/useIncidents";
import { EstadoDropdown } from "@/components/EstadoDropdown";

type Estado = "open" | "in_progress" | "resolved" | "Todos";
type Departamento = "Piso 1" | "Piso 2" | "Piso 3" | "Areas comunes" | "Todos";

export default function Incidencias() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<Estado>("Todos");
  const [filtroDepartamento, setFiltroDepartamento] = useState<Departamento>("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: incidencias = [], refetch } = useIncidents(); // 🔥

  useEffect(() => {
    const role = sessionStorage.getItem("userRole") as "resident" | "admin" | null;
    if (!role) {
      navigate("/auth");
      return;
    }
    setUserRole(role);
  }, [navigate]);

  const incidenciasFiltradas = incidencias.filter((incidencia) => {
    const matchesSearch =
      incidencia.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incidencia.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEstado =
      filtroEstado === "Todos" || incidencia.status === filtroEstado;
    const matchesDepartamento =
      filtroDepartamento === "Todos" || incidencia.category === filtroDepartamento;
    return matchesSearch && matchesEstado && matchesDepartamento;
  });

  if (!userRole) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar userRole={userRole} />

      <IncidenciaFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={refetch} />

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium">Gestión de Incidencias</h1>
          <Button className="bg-amber-500 hover:bg-amber-600 text-black" onClick={() => setIsModalOpen(true)}>
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
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Piso 1">Piso 1</SelectItem>
                <SelectItem value="Piso 2">Piso 2</SelectItem>
                <SelectItem value="Piso 3">Piso 3</SelectItem>
                <SelectItem value="Areas comunes">Áreas comunes</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={filtroEstado} onValueChange={(val) => setFiltroEstado(val as Estado)}>
            <SelectTrigger className="bg-zinc-900/50 border-zinc-800">
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="open">Abierto</SelectItem>
                <SelectItem value="in_progress">En proceso</SelectItem>
                <SelectItem value="resolved">Resuelto</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatusCard title="Incidencias Abiertas" icon={<AlertCircle className="h-5 w-5 text-red-500" />} count={incidencias.filter(i => i.status === "open").length} />
          <StatusCard title="En Proceso" icon={<Clock className="h-5 w-5 text-amber-500" />} count={incidencias.filter(i => i.status === "in_progress").length} />
          <StatusCard title="Resueltas" icon={<CheckCircle2 className="h-5 w-5 text-green-500" />} count={incidencias.filter(i => i.status === "resolved").length} />
        </div>

        {/* Tabla de incidencias */}
        <div className="bg-black/20 rounded-lg border border-zinc-800">
          <div className="p-4 border-b border-zinc-800">
            <h2 className="text-lg font-medium">Incidencias</h2>
            <p className="text-sm text-zinc-500">Listado de incidencias registradas</p>
          </div>

          {incidenciasFiltradas.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-zinc-500">No se encontraron incidencias</p>
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
                  </tr>
                </thead>
                <tbody>
                  {incidenciasFiltradas.map((incidencia) => (
                    <tr key={incidencia._id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition">
                      <td className="p-4">{incidencia.title}</td>
                      <td className="p-4 text-zinc-400">{incidencia.description}</td>
                      <td className="p-4 text-zinc-400">{new Date(incidencia.createdAt).toLocaleDateString()}</td>
                      <td className="p-4">
                        {/* Aquí cambiamos el estado con EstadoDropdown */}
                        <EstadoDropdown incidentId={incidencia._id} currentStatus={incidencia.status as "open" | "in_progress" | "resolved"} refetch={refetch}/>
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

function StatusCard({ title, icon, count }: { title: string; icon: React.ReactNode; count: number }) {
  return (
    <div className="bg-zinc-900/70 border border-zinc-800 rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm text-zinc-400">{title}</span>
        {icon}
      </div>
      <h3 className="text-3xl font-bold mb-1">{count}</h3>
    </div>
  );
}