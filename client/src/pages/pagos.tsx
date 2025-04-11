import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, AlertTriangle, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Interfaces
interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  monto: number;
  fechaVencimiento: string;
  iconoUrl: string;
  estado: "Pendiente" | "Pagado";
}

interface Multa {
  id: string;
  motivo: string;
  descripcion: string;
  monto: number;
  fecha: string;
  estado: "Pendiente" | "Pagado";
}

export default function Pagos() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [activeTab, setActiveTab] = useState("servicios");
  
  // Datos de servicios
  const [servicios] = useState<Servicio[]>([
    {
      id: "1",
      nombre: "Gas",
      descripcion: "Consumo mensual de gas",
      monto: 650,
      fechaVencimiento: "25 abr 2025",
      iconoUrl: "gas.jpg",
      estado: "Pendiente"
    },
    {
      id: "2",
      nombre: "Internet",
      descripcion: "Servicio de internet de alta velocidad",
      monto: 450,
      fechaVencimiento: "25 abr 2025",
      iconoUrl: "inteligente.jpg",
      estado: "Pagado"
    },
    {
      id: "3",
      nombre: "Luz",
      descripcion: "Consumo eléctrico mensual",
      monto: 720,
      fechaVencimiento: "25 abr 2025",
      iconoUrl: "rayo.jpg",
      estado: "Pendiente"
    },
    {
      id: "4",
      nombre: "Agua",
      descripcion: "Consumo de agua potable",
      monto: 380,
      fechaVencimiento: "25 abr 2025",
      iconoUrl: "gota.jpg",
      estado: "Pendiente"
    },
    {
      id: "5",
      nombre: "Mantenimiento",
      descripcion: "Mantenimiento de áreas comunes",
      monto: 1200,
      fechaVencimiento: "25 abr 2025",
      iconoUrl: "edificio.jpg",
      estado: "Pendiente"
    }
  ]);
  
  // Datos de multas
  const [multas] = useState<Multa[]>([
    {
      id: "1",
      motivo: "Ruido excesivo",
      descripcion: "Reporte por ruido excesivo después de las 23:00 hrs",
      monto: 500,
      fecha: "2 abr 2025",
      estado: "Pendiente"
    },
    {
      id: "2",
      motivo: "Uso indebido de estacionamiento",
      descripcion: "Estacionamiento en área no asignada por más de 3 horas",
      monto: 350,
      fecha: "8 abr 2025",
      estado: "Pagado"
    }
  ]);
  
  // Cálculo de totales
  const totalServicios = servicios
    .filter(serv => serv.estado === "Pendiente")
    .reduce((acc, serv) => acc + serv.monto, 0);
  
  const totalMultas = multas
    .filter(multa => multa.estado === "Pendiente")
    .reduce((acc, multa) => acc + multa.monto, 0);
  
  const totalPendiente = totalServicios + totalMultas;
  
  // Verificar autenticación
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
  
  // Función para manejar la descarga de documentos
  const handleDownloadDocument = (id: string, tipo: "servicio" | "multa") => {
    // Aquí iría la lógica para descargar el documento
    console.log(`Descargando documento de ${tipo} con ID: ${id}`);
    alert(`Descargando comprobante de ${tipo} con ID: ${id}`);
  };
  
  // Esperar hasta que hayamos determinado el rol del usuario
  if (!userRole) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar userRole={userRole} />
      
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-medium">Pagos y Servicios</h1>
            <p className="text-zinc-500">Gestiona tus pagos y visualiza el estado de tus servicios</p>
          </div>
          
          <Card className="bg-black/20 border-zinc-800 w-full md:w-auto">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Total pendiente</p>
                  <p className="text-2xl font-bold">${totalPendiente.toLocaleString('es-MX')}</p>
                </div>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                  Pagar todo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs para Servicios y Multas */}
        <Tabs defaultValue="servicios" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-black/20 border border-zinc-800">
            <TabsTrigger value="servicios" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              Servicios
            </TabsTrigger>
            <TabsTrigger value="multas" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              Multas
            </TabsTrigger>
          </TabsList>
          
          {/* Contenido de Servicios */}
          <TabsContent value="servicios" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicios.map((servicio) => (
                <Card key={servicio.id} className="bg-zinc-900/70 border-zinc-800 overflow-hidden">
                  <div className="relative h-24">
                    <div 
                      className="absolute inset-0 bg-cover bg-center" 
                      style={{ 
                        backgroundImage: `url(/attached_assets/${servicio.iconoUrl})`,
                        opacity: 0.6
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent" />
                    <div className="absolute bottom-2 left-4 right-4 flex justify-between items-end">
                      <h3 className="text-xl font-bold">{servicio.nombre}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        servicio.estado === "Pendiente" ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
                      }`}>
                        {servicio.estado}
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="pt-4">
                    <p className="text-sm text-zinc-400 mb-3">{servicio.descripcion}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-zinc-400 text-xs">Vencimiento: {servicio.fechaVencimiento}</span>
                      <span className="text-lg font-bold">${servicio.monto.toLocaleString('es-MX')}</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="ghost" size="sm" className="hover:bg-zinc-800"
                      onClick={() => handleDownloadDocument(servicio.id, "servicio")}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Ver factura
                    </Button>
                    {servicio.estado === "Pendiente" && (
                      <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                        Pagar
                      </Button>
                    )}
                    {servicio.estado === "Pagado" && (
                      <Button variant="outline" size="sm" className="hover:bg-zinc-800"
                        onClick={() => handleDownloadDocument(servicio.id, "servicio")}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Comprobante
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Contenido de Multas */}
          <TabsContent value="multas" className="mt-6">
            <div className="bg-black/20 rounded-lg border border-zinc-800 mb-6">
              <div className="p-4 border-b border-zinc-800">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-medium">Multas pendientes</h2>
                    <p className="text-sm text-zinc-500">Revisión de multas y sanciones</p>
                  </div>
                  {totalMultas > 0 && (
                    <div className="flex items-center text-amber-500">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <span className="text-sm">Tienes {multas.filter(m => m.estado === "Pendiente").length} multa(s) pendiente(s)</span>
                    </div>
                  )}
                </div>
              </div>
              
              {multas.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-zinc-500">No tienes multas pendientes</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left p-4 text-sm font-medium">Motivo</th>
                        <th className="text-left p-4 text-sm font-medium">Descripción</th>
                        <th className="text-left p-4 text-sm font-medium">Fecha</th>
                        <th className="text-left p-4 text-sm font-medium">Monto</th>
                        <th className="text-left p-4 text-sm font-medium">Estado</th>
                        <th className="text-left p-4 text-sm font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {multas.map((multa) => (
                        <tr key={multa.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition">
                          <td className="p-4">{multa.motivo}</td>
                          <td className="p-4 text-zinc-400">
                            <span className="line-clamp-1">{multa.descripcion}</span>
                          </td>
                          <td className="p-4 text-zinc-400">{multa.fecha}</td>
                          <td className="p-4 font-medium">${multa.monto.toLocaleString('es-MX')}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              multa.estado === "Pendiente" ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
                            }`}>
                              {multa.estado}
                            </span>
                          </td>
                          <td className="p-4">
                            {multa.estado === "Pendiente" ? (
                              <Button className="bg-amber-500 hover:bg-amber-600 text-black" size="sm">
                                Pagar
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm" className="hover:bg-zinc-800"
                                onClick={() => handleDownloadDocument(multa.id, "multa")}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Comprobante
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            {/* Historial de multas */}
            <Card className="bg-zinc-900/70 border-zinc-800">
              <CardHeader>
                <CardTitle>Historial de multas</CardTitle>
                <CardDescription>Registro completo de multas pagadas y pendientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Multas pagadas</span>
                      <span>{multas.filter(m => m.estado === "Pagado").length} de {multas.length}</span>
                    </div>
                    <Progress value={(multas.filter(m => m.estado === "Pagado").length / multas.length) * 100} className="h-2" />
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="text-sm font-medium mb-3">Últimas acciones</h4>
                    <ul className="space-y-2">
                      {multas.map((multa) => (
                        <li key={multa.id} className="text-sm flex items-start">
                          <span className={`w-2 h-2 rounded-full mt-1.5 mr-2 ${
                            multa.estado === "Pendiente" ? "bg-red-400" : "bg-green-400"
                          }`}></span>
                          <div>
                            <p className="text-zinc-300">{multa.motivo}</p>
                            <p className="text-zinc-500 text-xs">{multa.fecha} - {multa.estado}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full hover:bg-zinc-800">
                  Ver todas las multas
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Resumen de pagos */}
        <Card className="bg-black/20 border-zinc-800">
          <CardHeader>
            <CardTitle>Resumen de pagos</CardTitle>
            <CardDescription>Desglose total de tus pagos mensuales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900/50 rounded-lg p-4">
                  <p className="text-zinc-400 text-sm mb-1">Servicios pendientes</p>
                  <p className="text-xl font-bold">${totalServicios.toLocaleString('es-MX')}</p>
                </div>
                <div className="bg-zinc-900/50 rounded-lg p-4">
                  <p className="text-zinc-400 text-sm mb-1">Multas pendientes</p>
                  <p className="text-xl font-bold">${totalMultas.toLocaleString('es-MX')}</p>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between mb-1 font-medium">
                  <span>Total a pagar</span>
                  <span>${totalPendiente.toLocaleString('es-MX')}</span>
                </div>
                <p className="text-zinc-500 text-sm">Fecha límite de pago: 25 de abril, 2025</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4 flex-col sm:flex-row">
            <Button className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-black">
              Pagar ahora
            </Button>
            <Button variant="outline" className="w-full sm:w-auto hover:bg-zinc-800">
              <Download className="mr-2 h-4 w-4" />
              Descargar estado de cuenta
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}