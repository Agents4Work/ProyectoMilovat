'use client';

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Plus, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  // Datos de ejemplo para proveedores
  const [proveedores] = useState<Proveedor[]>([
    {
      id: "1",
      servicio: "Limpieza",
      nombre: "Clean Services S.A.",
      monto: 15000,
      frecuencia: 'mensual',
      comentarios: "Servicio de limpieza de áreas comunes y mantenimiento básico",
      contratoUrl: "/contratos/limpieza-cleanservices.pdf",
      fechaInicio: "2025-01-01",
      fechaTermino: "2025-12-31",
      estado: 'activo'
    },
    {
      id: "2",
      servicio: "Jardinería",
      nombre: "Green Gardens",
      monto: 8500,
      frecuencia: 'mensual',
      comentarios: "Mantenimiento de jardines y áreas verdes",
      contratoUrl: "/contratos/jardineria-greengardens.pdf",
      fechaInicio: "2025-02-15",
      fechaTermino: "2026-02-14",
      estado: 'activo'
    },
    {
      id: "3",
      servicio: "Seguridad",
      nombre: "SafeGuard Security",
      monto: 25000,
      frecuencia: 'mensual',
      comentarios: "Servicio de vigilancia 24/7, incluye monitoreo de cámaras",
      contratoUrl: "/contratos/seguridad-safeguard.pdf",
      fechaInicio: "2025-01-01",
      fechaTermino: "2025-12-31",
      estado: 'activo'
    },
    {
      id: "4",
      servicio: "Mantenimiento Elevadores",
      nombre: "Lift Maintenance Co.",
      monto: 12000,
      frecuencia: 'trimestral',
      comentarios: "Servicio preventivo y correctivo para los elevadores",
      contratoUrl: "/contratos/elevadores-liftmaintenance.pdf",
      fechaInicio: "2025-01-01",
      fechaTermino: "2025-12-31",
      estado: 'activo'
    },
    {
      id: "5",
      servicio: "Fumigación",
      nombre: "Pest Control Plus",
      monto: 5000,
      frecuencia: 'trimestral',
      comentarios: "Servicio de control de plagas en áreas comunes",
      contratoUrl: "/contratos/fumigacion-pestcontrol.pdf",
      fechaInicio: "2025-03-10",
      fechaTermino: "2026-03-09",
      estado: 'activo'
    },
    {
      id: "6",
      servicio: "Internet y Telecomunicaciones",
      nombre: "ConnectNet",
      monto: 18000,
      frecuencia: 'mensual',
      comentarios: "Servicio de internet de fibra óptica para áreas comunes y sistema de intercomunicación",
      contratoUrl: "/contratos/internet-connectnet.pdf",
      fechaInicio: "2025-01-15",
      fechaTermino: "2026-01-14",
      estado: 'activo'
    },
    {
      id: "7",
      servicio: "Impermeabilización",
      nombre: "WaterProof Solutions",
      monto: 75000,
      frecuencia: 'único',
      comentarios: "Trabajo de impermeabilización del techo y terrazas",
      contratoUrl: "/contratos/impermeabilizacion-waterproof.pdf",
      fechaInicio: "2025-05-20",
      fechaTermino: null,
      estado: 'inactivo'
    },
    {
      id: "8",
      servicio: "Mantenimiento Piscina",
      nombre: "Blue Pool Services",
      monto: 6000,
      frecuencia: 'mensual',
      comentarios: "Limpieza y mantenimiento de la piscina y áreas adyacentes",
      contratoUrl: "/contratos/piscina-bluepool.pdf",
      fechaInicio: "2025-01-01",
      fechaTermino: "2025-12-31",
      estado: 'activo'
    },
    {
      id: "9",
      servicio: "Mantenimiento Sistema Eléctrico",
      nombre: "ElectriPower",
      monto: 9000,
      frecuencia: 'semestral',
      comentarios: "Revisión y mantenimiento de instalaciones eléctricas comunes",
      contratoUrl: "/contratos/electrico-electripower.pdf",
      fechaInicio: "2025-02-01",
      fechaTermino: "2026-01-31",
      estado: 'activo'
    },
    {
      id: "10",
      servicio: "Pintura",
      nombre: "ColorPaint Pro",
      monto: 120000,
      frecuencia: 'único',
      comentarios: "Servicio de pintura para fachada e interiores de áreas comunes",
      contratoUrl: "/contratos/pintura-colorpaint.pdf",
      fechaInicio: "2025-07-01",
      fechaTermino: null,
      estado: 'inactivo'
    }
  ]);

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

  // Descargar contrato (simulado)
  const handleDescargarContrato = (contratoUrl: string, proveedorNombre: string) => {
    // En un entorno real, esto redigiría a la URL real del contrato
    // Para este ejemplo, simulamos una descarga mostrando una alerta
    alert(`Descargando contrato de ${proveedorNombre}.\nEn un entorno real, se descargaría desde: ${contratoUrl}`);
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