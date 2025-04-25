'use client';

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import  DashboardSidebar  from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, Download, PieChart, TrendingUp, Users, Eye, X } from "lucide-react";
import { 
  PieChart as RPieChart, 
  Pie, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell,
  BarChart,
  Bar
} from 'recharts';

// Datos para los costos (simulación)
interface ServicioDetalle {
  nombre: string;
  monto: number;
  estado: "Pagado" | "Pendiente";
}

interface CostoData {
  departamento: string;
  titular: string;
  montoTotal: number;
  montoMantenimiento: number;
  fechaCobro: string;
  fechaPago: string | null;
  pagado: boolean;
  multado: boolean;
  servicios: ServicioDetalle[];
}

export default function Costos() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCosto, setSelectedCosto] = useState<CostoData | null>(null);
  
  // Datos para costos (en un entorno real se cargarían de una API)
  const [costos, setCostos] = useState<CostoData[]>([]);

  // Datos para los gráficos
  const pagadoVsNoPagado = [
    { name: 'Pagado', value: costos.filter(c => c.pagado).length },
    { name: 'No Pagado', value: costos.filter(c => !c.pagado).length }
  ];
  
  const porcentajePagado = costos.length > 0 ? (costos.filter(c => c.pagado).length / costos.length) * 100 : 0;
  
  const datosMontosMensuales = [
    { mes: 'Ene', monto: 0 },
    { mes: 'Feb', monto: 0 },
    { mes: 'Mar', monto: 0 },
    { mes: 'Abr', monto: 0 },
    { mes: 'May', monto: 0 },
    { mes: 'Jun', monto: 0 },
  ];
  
  const porcentajeMultas = costos.length > 0 ? (costos.filter(c => c.multado).length / costos.length) * 100 : 0;
  
  // Colores para los gráficos
  const COLORS = ['#10b981', '#ef4444'];
  
  // Filtrar costos basado en la búsqueda
  const costosFiltrados = costos.filter(costo => 
    costo.titular.toLowerCase().includes(searchTerm.toLowerCase()) ||
    costo.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Formatear fecha para mostrarla en formato legible
  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // Exportar datos como CSV
  const exportarCSV = () => {
    // Cabeceras del CSV
    let csvContent = "Departamento,Titular,Monto Total,Monto Mantenimiento,Fecha Cobro,Fecha Pago,Estado\n";
    
    // Añadir cada registro
    costos.forEach(costo => {
      const estado = costo.pagado ? "Pagado" : "Pendiente";
      const fechaPago = costo.fechaPago ? costo.fechaPago : "Pendiente";
      csvContent += `${costo.departamento},${costo.titular},${costo.montoTotal},${costo.montoMantenimiento},${costo.fechaCobro},${fechaPago},${estado}\n`;
    });
    
    // Crear blob y descargar
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'costos.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    <>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <DashboardSidebar userRole={userRole} />
        
        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-medium mb-2">Costos</h1>
          <p className="text-zinc-400 mb-6">Análisis y gestión de costos del edificio</p>
          
          {/* Gráficos y Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Porcentaje Recaudado (Pie Chart) */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium text-zinc-400">Porcentaje Recaudado</CardTitle>
                  <PieChart className="h-5 w-5 text-amber-500" />
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center p-4">
                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RPieChart>
                      <Pie
                        data={pagadoVsNoPagado}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent as number * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pagadoVsNoPagado.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-2">
                  <p className="text-2xl font-bold text-amber-500">{porcentajePagado.toFixed(1)}%</p>
                  <p className="text-sm text-zinc-400">del total ha sido recaudado</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Montos Mensuales (Line Chart) */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium text-zinc-400">Montos Mensuales</CardTitle>
                  <TrendingUp className="h-5 w-5 text-amber-500" />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={datosMontosMensuales}
                      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="mes" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                        formatter={(value) => [`$${value}`, 'Monto']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="monto" 
                        stroke="#f59e0b" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-2">
                  <p className="text-2xl font-bold text-amber-500">
                    ${Math.max(...datosMontosMensuales.map(d => d.monto)).toLocaleString('es-MX')}
                  </p>
                  <p className="text-sm text-zinc-400">monto máximo a pagar</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Porcentaje con Multas (Bar Chart) */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium text-zinc-400">Porcentaje con Multas</CardTitle>
                  <Users className="h-5 w-5 text-amber-500" />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Con Multas', value: porcentajeMultas, color: '#ef4444' },
                        { name: 'Sin Multas', value: 100 - porcentajeMultas, color: '#10b981' }
                      ]}
                      margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                        formatter={(value) => [`${(value as number).toFixed(1)}%`, 'Porcentaje']}
                      />
                      <Bar dataKey="value" name="Porcentaje">
                        {[
                          { name: 'Con Multas', value: porcentajeMultas, color: '#ef4444' },
                          { name: 'Sin Multas', value: 100 - porcentajeMultas, color: '#10b981' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-2">
                  <p className="text-2xl font-bold text-amber-500">{porcentajeMultas.toFixed(1)}%</p>
                  <p className="text-sm text-zinc-400">de residentes tienen multas</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input 
                placeholder="Buscar por titular o departamento..." 
                className="bg-zinc-900/50 border-zinc-800 pl-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button 
              variant="outline" 
              className="border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
              onClick={exportarCSV}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
          
          {/* Table */}
          <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableCaption>Listado de costos por departamento</TableCaption>
                <TableHeader className="bg-zinc-800/50">
                  <TableRow>
                    <TableHead className="w-[80px]">Departamento</TableHead>
                    <TableHead className="w-[160px]">Titular</TableHead>
                    <TableHead className="w-[110px]">Monto Total</TableHead>
                    <TableHead className="w-[140px]">Monto Mantenimiento</TableHead>
                    <TableHead className="w-[120px]">Fecha de Cobro</TableHead>
                    <TableHead className="w-[120px]">Fecha de Pago</TableHead>
                    <TableHead className="w-[80px]">Estado</TableHead>
                    <TableHead className="w-[80px]">Detalles</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costosFiltrados.length > 0 ? (
                    costosFiltrados.map((costo, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{costo.departamento}</TableCell>
                        <TableCell>{costo.titular}</TableCell>
                        <TableCell>${costo.montoTotal.toLocaleString('es-MX')}</TableCell>
                        <TableCell>${costo.montoMantenimiento.toLocaleString('es-MX')}</TableCell>
                        <TableCell>{formatearFecha(costo.fechaCobro)}</TableCell>
                        <TableCell>
                          {costo.fechaPago ? formatearFecha(costo.fechaPago) : "Pendiente"}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            costo.pagado 
                              ? "bg-green-500/10 text-green-500" 
                              : "bg-red-500/10 text-red-500"
                          }`}>
                            {costo.pagado ? "Pagado" : "Pendiente"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-amber-500" onClick={() => setSelectedCosto(costo)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center h-24 text-zinc-500">
                        No se encontraron resultados
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Modal de detalles de servicios */}
      {selectedCosto && (
        <Dialog open={selectedCosto !== null} onOpenChange={(open) => !open && setSelectedCosto(null)}>
          <DialogContent className="sm:max-w-[550px] bg-zinc-950 border-zinc-800">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Detalles de Servicio - Departamento {selectedCosto.departamento}</span>
                <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setSelectedCosto(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
              <DialogDescription>
                Información detallada de los servicios para {selectedCosto.titular}
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col space-y-4 py-4">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <span className="text-zinc-400">Estado:</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  selectedCosto.pagado 
                    ? "bg-green-500/10 text-green-500" 
                    : "bg-red-500/10 text-red-500"
                }`}>
                  {selectedCosto.pagado ? "Pagado" : "Pendiente"}
                </span>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <span className="text-zinc-400">Fecha de Cobro:</span>
                <span>{formatearFecha(selectedCosto.fechaCobro)}</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <span className="text-zinc-400">Fecha de Pago:</span>
                <span>{selectedCosto.fechaPago ? formatearFecha(selectedCosto.fechaPago) : "Pendiente"}</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <span className="text-zinc-400">Monto Total:</span>
                <span className="font-semibold text-amber-500">${selectedCosto.montoTotal.toLocaleString('es-MX')}</span>
              </div>
              
              <h3 className="text-base font-medium pt-2">Desglose de Servicios</h3>
              
              {selectedCosto.servicios.map((servicio, index) => (
                <div key={index} className="flex justify-between items-center pb-2 border-b border-zinc-800">
                  <div className="flex items-center">
                    <span className="text-zinc-300">{servicio.nombre}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>${servicio.monto.toLocaleString('es-MX')}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      servicio.estado === "Pagado" 
                        ? "bg-green-500/10 text-green-500" 
                        : "bg-red-500/10 text-red-500"
                    }`}>
                      {servicio.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <DialogFooter>
              <Button onClick={() => setSelectedCosto(null)} className="bg-zinc-800 hover:bg-zinc-700">
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}