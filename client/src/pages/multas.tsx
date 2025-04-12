'use client';

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, DollarSign, Home, Check, AlertCircle } from "lucide-react";
import { MultaDescripcionModal } from "@/components/multa-descripcion-modal";
import { NuevaMultaModal } from "@/components/nueva-multa-modal";
import { toast } from "@/hooks/use-toast";

// Definición de una multa
interface Multa {
  id: string;
  departamento: string;
  propietario: string;
  monto: number;
  estatus: 'Completo' | 'Incompleto';
  descripcion: string;
  fecha: string;
}

export default function Multas() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMulta, setSelectedMulta] = useState<Multa | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showNuevaMultaModal, setShowNuevaMultaModal] = useState(false);
  
  // Lista de multas (datos de ejemplo)
  const [multas, setMultas] = useState<Multa[]>([
    {
      id: "1",
      departamento: "2A",
      propietario: "Ana González",
      monto: 1500,
      estatus: "Incompleto",
      descripcion: "Ruido excesivo después de las 22:00 hrs. Múltiples reportes de vecinos por fiesta realizada el día sábado 5 de abril. Segunda infracción en el mes.",
      fecha: "2025-04-06"
    },
    {
      id: "2",
      departamento: "4B",
      propietario: "Carlos Ramírez",
      monto: 500,
      estatus: "Completo",
      descripcion: "Obstrucción de áreas comunes. Colocación de objetos personales en el pasillo que impiden el libre tránsito.",
      fecha: "2025-04-02"
    },
    {
      id: "3",
      departamento: "7C",
      propietario: "María Sánchez",
      monto: 2000,
      estatus: "Incompleto",
      descripcion: "Daños a propiedad común. Rayones en pared del elevador realizados por hijo menor de edad. Se requiere pago para restauración.",
      fecha: "2025-04-08"
    },
    {
      id: "4",
      departamento: "5D",
      propietario: "Juan Méndez",
      monto: 800,
      estatus: "Incompleto",
      descripcion: "Uso indebido de estacionamiento. Ocupación recurrente de espacios asignados a otros residentes.",
      fecha: "2025-04-05"
    },
    {
      id: "5",
      departamento: "1F",
      propietario: "Sofía Torres",
      monto: 1200,
      estatus: "Completo",
      descripcion: "Incumplimiento de reglamento de mascotas. Perro sin correa en áreas comunes y no recoger desechos.",
      fecha: "2025-04-01"
    }
  ]);

  // Filtrar multas basado en la búsqueda
  const filteredMultas = multas.filter(multa => 
    multa.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    multa.propietario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular estadísticas
  const montoTotal = multas.reduce((total, multa) => total + multa.monto, 0);
  const departamentosConMultas = new Set(multas.map(multa => multa.departamento)).size;
  const multasCompletas = multas.filter(multa => multa.estatus === "Completo").length;
  const porcentajeCompleto = Math.round((multasCompletas / multas.length) * 100);

  // Abrir modal de descripción
  const handleVerDescripcion = (multa: Multa) => {
    setSelectedMulta(multa);
    setShowModal(true);
  };
  
  // Función para marcar una multa como pagada
  const handleMarcarComoPagado = (multaId: string) => {
    // Actualizar el estado de la multa a "Completo"
    setMultas(multas.map(multa => 
      multa.id === multaId 
        ? { ...multa, estatus: 'Completo' } 
        : multa
    ));
    
    // Cerrar el modal
    setShowModal(false);
    
    // Mostrar mensaje de confirmación
    toast({
      title: "Estado actualizado",
      description: "La multa ha sido marcada como pagada",
    });
  };
  
  // Función para abrir el modal de nueva multa
  const handleMostrarNuevaMultaModal = () => {
    setShowNuevaMultaModal(true);
  };
  
  // Función para agregar una nueva multa
  const handleAgregarMulta = (nuevaMultaData: {
    departamento: string;
    propietario: string;
    monto: number;
    descripcion: string;
  }) => {
    // Generar un ID único
    const nuevoId = (multas.length + 1).toString();
    
    // Crear la nueva multa con la fecha actual
    const nuevaMulta: Multa = {
      id: nuevoId,
      ...nuevaMultaData,
      estatus: 'Incompleto', // Por defecto es incompleto
      fecha: new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
    };
    
    // Actualizar la lista de multas
    setMultas([...multas, nuevaMulta]);
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
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar userRole={userRole} />
      
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-medium mb-2">Multas</h1>
        <p className="text-zinc-400 mb-6">Administración de multas del edificio</p>
        
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Monto */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Monto Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-amber-500/10 p-2">
                  <DollarSign className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">${montoTotal.toLocaleString()}</div>
                  <p className="text-xs text-zinc-500">Por conceptos de sanciones</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Departamentos con Multas */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Departamentos con Multas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-amber-500/10 p-2">
                  <Home className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{departamentosConMultas}</div>
                  <p className="text-xs text-zinc-500">De {departamentosConMultas + 5} departamentos totales</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Estatus */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Estatus de Pagos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-amber-500/10 p-2">
                  {porcentajeCompleto >= 50 ? (
                    <Check className="h-5 w-5 text-amber-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  )}
                </div>
                <div>
                  <div className="text-2xl font-bold">{porcentajeCompleto}%</div>
                  <p className="text-xs text-zinc-500">
                    {multasCompletas} de {multas.length} multas pagadas
                  </p>
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
              placeholder="Buscar por departamento o propietario..." 
              className="bg-zinc-900/50 border-zinc-800 pl-9" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
              onClick={handleMostrarNuevaMultaModal}
            >
              Nueva Multa
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
              <TableCaption>Lista de multas administradas</TableCaption>
              <TableHeader className="bg-zinc-800/50">
                <TableRow>
                  <TableHead className="w-[100px]">Departamento</TableHead>
                  <TableHead>Nombre del Propietario</TableHead>
                  <TableHead className="w-[120px]">Monto</TableHead>
                  <TableHead className="w-[120px]">Estatus</TableHead>
                  <TableHead className="w-[180px]">Descripción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMultas.length > 0 ? (
                  filteredMultas.map((multa) => (
                    <TableRow key={multa.id}>
                      <TableCell className="font-medium">{multa.departamento}</TableCell>
                      <TableCell>{multa.propietario}</TableCell>
                      <TableCell>${multa.monto.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge 
                          className={`${
                            multa.estatus === "Completo" 
                              ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" 
                              : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                          }`}
                        >
                          {multa.estatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-zinc-800"
                          onClick={() => handleVerDescripcion(multa)}
                        >
                          Ver detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-zinc-500">
                      No se encontraron multas
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      
      {/* Modal de descripción */}
      {selectedMulta && (
        <MultaDescripcionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          multa={selectedMulta}
          onMarcarComoPagado={handleMarcarComoPagado}
        />
      )}
      
      {/* Modal de nueva multa */}
      <NuevaMultaModal
        isOpen={showNuevaMultaModal}
        onClose={() => setShowNuevaMultaModal(false)}
        onSave={handleAgregarMulta}
      />
    </div>
  );
}