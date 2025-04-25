'use client';

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import  DashboardSidebar  from "@/components/dashboard-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Plus, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProveedorModal, ProveedorFormData } from "@/components/proveedor-modal";
import { toast } from "@/hooks/use-toast";

// Definición de un proveedor
interface Proveedor {
  id: string;
  servicio: string;
  nombre: string;
  monto: number;
  frecuencia: 'mensual' | 'trimestral' | 'semestral' | 'anual' | 'único';
  comentarios: string;
  contratoUrl: string;
  fechaInicio: string;
  fechaTermino: string | null;
  estado: 'activo' | 'inactivo';
}

export default function Proveedores() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);

  // Filtrar proveedores basado en la búsqueda
  const proveedoresFiltrados = proveedores.filter(proveedor => 
    proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.servicio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Formatear valor monetario
  const formatearMonto = (monto: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(monto);
  };

  // Manejar añadir nuevo proveedor
  const handleAgregarProveedor = (formData: ProveedorFormData) => {
    // Crear nuevo proveedor desde los datos del formulario
    const nuevoProveedor: Proveedor = {
      id: `prov_${Date.now()}`,  // Generamos un ID único
      servicio: formData.servicio,
      nombre: formData.nombre,
      monto: parseFloat(formData.monto),
      frecuencia: formData.frecuencia,
      comentarios: formData.comentarios,
      contratoUrl: "#", // En un sistema real, esto sería la URL del contrato subido
      fechaInicio: formData.fechaInicio,
      fechaTermino: formData.fechaTermino || null,
      estado: formData.estado
    };
    
    // Añadir a la lista de proveedores
    setProveedores(prev => [...prev, nuevoProveedor]);
    
    // Mostrar mensaje de éxito
    toast({
      title: "Proveedor añadido",
      description: `El proveedor ${nuevoProveedor.nombre} ha sido añadido exitosamente.`
    });
  };

  // Descargar contrato (simulado)
  const handleDescargarContrato = (contratoUrl: string, proveedorNombre: string) => {
    // En un entorno real, esto redigiría a la URL real del contrato
    // Para este ejemplo, simulamos una descarga mostrando una alerta
    toast({
      title: "Descargando contrato",
      description: `Contrato de ${proveedorNombre} en proceso de descarga.`
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
    <div className="flex h-screen bg-background">
      {/* Modal para añadir nuevo proveedor */}
      <ProveedorModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAgregarProveedor}
      />
      
      {/* Sidebar */}
      <DashboardSidebar userRole={userRole} />
      
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-medium mb-2">Proveedores</h1>
        <p className="text-zinc-400 mb-6">Gestión de contratos y servicios externos</p>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
            <Input 
              placeholder="Buscar por servicio o nombre del proveedor..." 
              className="bg-zinc-900/50 border-zinc-800 pl-9" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button 
            className="bg-amber-500 hover:bg-amber-600 text-black"
            onClick={() => setShowModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Proveedor
          </Button>
        </div>
        
        {/* Lista de Proveedores */}
        <Card className="border-zinc-800 bg-zinc-900/50 overflow-hidden">
          <CardHeader className="border-b border-zinc-800 pb-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">Proveedores y Servicios</CardTitle>
                <CardDescription className="text-zinc-400">
                  Listado de proveedores contratados por el edificio
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/50">
                    <th className="text-left py-3 px-4 font-medium text-zinc-400">Servicio</th>
                    <th className="text-left py-3 px-4 font-medium text-zinc-400">Proveedor</th>
                    <th className="text-left py-3 px-4 font-medium text-zinc-400">Monto</th>
                    <th className="text-left py-3 px-4 font-medium text-zinc-400">Comentarios</th>
                    <th className="text-center py-3 px-4 font-medium text-zinc-400">Contrato</th>
                  </tr>
                </thead>
                <tbody>
                  {proveedoresFiltrados.length > 0 ? (
                    proveedoresFiltrados.map((proveedor) => (
                      <tr key={proveedor.id} className="border-b border-zinc-800 hover:bg-zinc-800/30">
                        <td className="py-3 px-4">
                          <div className="font-medium">{proveedor.servicio}</div>
                          <div className="text-xs text-zinc-500 mt-1">{proveedor.frecuencia}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div>{proveedor.nombre}</div>
                          <div className="flex mt-1">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                proveedor.estado === 'activo'
                                  ? "bg-green-500/10 text-green-500 border-green-500/30" 
                                  : "bg-red-500/10 text-red-500 border-red-500/30"
                              }`}
                            >
                              {proveedor.estado === 'activo' ? 'Activo' : 'Inactivo'}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-amber-500 font-medium">{formatearMonto(proveedor.monto)}</div>
                          <div className="text-xs text-zinc-500 mt-1">
                            {proveedor.frecuencia === 'mensual' ? 'Mensual' :
                             proveedor.frecuencia === 'trimestral' ? 'Trimestral' :
                             proveedor.frecuencia === 'semestral' ? 'Semestral' :
                             proveedor.frecuencia === 'anual' ? 'Anual' : 'Pago único'}
                          </div>
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          <div className="text-sm text-zinc-300 line-clamp-2">{proveedor.comentarios}</div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                            onClick={() => handleDescargarContrato(proveedor.contratoUrl, proveedor.nombre)}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Descargar
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-zinc-500">
                        No se encontraron proveedores que coincidan con la búsqueda
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}