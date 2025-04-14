/**
 * Página Dashboard
 * 
 * Panel principal de la aplicación Milovat para la administración de edificios.
 * Proporciona una vista general de las funcionalidades principales y acceso
 * rápido a las tareas más comunes.
 * 
 * Características principales:
 * - Panel de control con tarjetas informativas para diferentes módulos
 * - Gestión de visitantes con registro y seguimiento
 * - Control de paquetería para residentes
 * - Publicación de anuncios para la comunidad
 * - Monitoreo de incidencias recientes
 * - Navegación a los diferentes módulos de la aplicación
 * - Estadísticas de uso y resumen de actividades
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, Package, PlusCircle, AlertTriangle, Calendar, Megaphone, ChevronRight, Settings, Briefcase, DollarSign } from "lucide-react";
import { VisitFormModal } from "@/components/visit-form-modal";
import { PackageListModal } from "@/components/package-list-modal";
import { CrearAnuncioModal } from "@/components/crear-anuncio-modal";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

// Interfaz para los paquetes
interface Paquete {
  id: string;
  empresa: string;
  fechaLlegada: string;
  hora: string;
  destinatario: string;
  estado: "Pendiente" | "Recogido";
  apartamento: string;
}

// Interfaz para los anuncios
interface Anuncio {
  id: string;
  titulo: string;
  contenido: string;
  categoria: string;
  destacado: boolean;
  imageUrl?: string;
  fechaCreacion: string;
  autor: string;
}

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [showPackageList, setShowPackageList] = useState(false);
  const [showAnuncioModal, setShowAnuncioModal] = useState(false);
  const [filtroAnuncios, setFiltroAnuncios] = useState<"todos" | "destacados">("todos");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Información del usuario actual (simulación)
  const [currentUser] = useState({
    nombre: "Carlos Ramírez", 
    apartamento: "4B"
  });
  
  // Datos de ejemplo para anuncios
  const [anuncios, setAnuncios] = useState<Anuncio[]>([
    {
      id: "1",
      titulo: "Mantenimiento de Elevadores",
      contenido: "Se realizará mantenimiento en los elevadores el día 15 de abril de 2025 de 9:00 a 14:00 horas. Durante este periodo los elevadores estarán fuera de servicio. Disculpe las molestias.",
      categoria: "mantenimiento",
      destacado: true,
      fechaCreacion: "2025-04-10T10:00:00",
      autor: "Administración"
    },
    {
      id: "2",
      titulo: "Reunión de Propietarios",
      contenido: "Se convoca a reunión de propietarios el día 20 de abril a las 19:00 horas en el salón de eventos para tratar temas relacionados con el presupuesto anual y proyectos de mejora.",
      categoria: "comunicados",
      destacado: true,
      fechaCreacion: "2025-04-09T15:30:00",
      autor: "Administración"
    },
    {
      id: "3",
      titulo: "Nuevo sistema de seguridad",
      contenido: "Informamos que se ha implementado un nuevo sistema de seguridad en el edificio que incluye reconocimiento facial para el ingreso. Todos los residentes deben registrarse en administración.",
      categoria: "seguridad",
      destacado: false,
      imageUrl: "/anuncios/seguridad.jpg",
      fechaCreacion: "2025-04-08T09:15:00",
      autor: "Administración"
    }
  ]);

  // Datos de ejemplo para paquetes
  const [paquetes] = useState<Paquete[]>([
    {
      id: "1",
      empresa: "Amazon",
      fechaLlegada: "11 abr 2025",
      hora: "10:25 AM",
      destinatario: "Carlos Ramírez",
      estado: "Pendiente",
      apartamento: "4B"
    },
    {
      id: "2",
      empresa: "DHL",
      fechaLlegada: "10 abr 2025",
      hora: "15:40 PM",
      destinatario: "Lucía González",
      estado: "Pendiente",
      apartamento: "2A"
    },
    {
      id: "3",
      empresa: "FedEx",
      fechaLlegada: "09 abr 2025",
      hora: "12:15 PM",
      destinatario: "Carlos Ramírez",
      estado: "Recogido",
      apartamento: "4B"
    }
  ]);
  
  // Filtrar paquetes solo para el usuario actual
  const paquetesUsuario = paquetes.filter(p => 
    userRole === "admin" || p.apartamento === currentUser.apartamento
  );
  
  // Calcular el número de paquetes pendientes del usuario actual
  const pendingPackages = paquetesUsuario.filter(p => p.estado === "Pendiente").length;
  
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
        <h1 className="text-2xl font-medium mb-6">
          Dashboard {userRole === "admin" ? "de Administrador" : ""}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Anuncios section - spanning 2 columns */}
          <div className="lg:col-span-2">
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader className="border-b border-zinc-800 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">Anuncios y comunicados</CardTitle>
                    <p className="text-sm text-zinc-400">Comunicación entre residentes y administración</p>
                  </div>
                  
                  {/* Botón para crear anuncios (solo para administradores) */}
                  {userRole === "admin" && (
                    <Button 
                      className="bg-amber-500 hover:bg-amber-600 text-black"
                      onClick={() => setShowAnuncioModal(true)}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Crear Anuncio
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4 divide-y divide-zinc-800">
                {anuncios.length > 0 ? (
                  anuncios.map((anuncio) => (
                    <div key={anuncio.id} className={`py-4 ${anuncio.destacado ? 'bg-amber-500/5 -mx-4 px-4 border-l-4 border-amber-500' : ''}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium">
                          {anuncio.titulo}
                        </h3>
                        {anuncio.destacado && (
                          <Badge 
                            variant="outline" 
                            className="border-amber-500/30 bg-amber-500/10 text-amber-500"
                          >
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Destacado
                          </Badge>
                        )}
                      </div>
                      
                      <div className="mb-3">
                        <Badge 
                          variant="outline" 
                          className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                        >
                          {anuncio.categoria === 'general' ? 'General' :
                           anuncio.categoria === 'mantenimiento' ? 'Mantenimiento' :
                           anuncio.categoria === 'eventos' ? 'Eventos' :
                           anuncio.categoria === 'seguridad' ? 'Seguridad' :
                           anuncio.categoria === 'comunicados' ? 'Comunicado oficial' : 
                           anuncio.categoria === 'avisos' ? 'Aviso importante' : anuncio.categoria}
                        </Badge>
                        <span className="text-xs text-zinc-500 ml-2">
                          {format(new Date(anuncio.fechaCreacion), "d 'de' MMMM, yyyy", { locale: es })}
                        </span>
                      </div>
                      
                      <p className="text-zinc-300 mb-3">{anuncio.contenido}</p>
                      
                      {anuncio.imageUrl && (
                        <div className="rounded-md overflow-hidden mb-3 bg-zinc-800/30 max-h-56">
                          <img 
                            src={anuncio.imageUrl} 
                            alt={anuncio.titulo} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="text-right text-xs text-zinc-500">
                        {anuncio.autor}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="min-h-[300px] flex items-center justify-center text-zinc-500">
                    No hay anuncios todavía
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Cuadro de overview - solo para administradores */}
            {userRole === "admin" && (
              <div className="mt-6">
                <h2 className="text-xl font-medium mb-4">Resumen del Edificio</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Tarjeta de Visitantes */}
                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-zinc-400">Visitantes</CardTitle>
                        <Users className="h-4 w-4 text-amber-500" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-zinc-500">Hoy:</span>
                          <span className="text-lg font-bold text-zinc-300">12</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-zinc-500">Registrados:</span>
                          <span className="text-sm text-zinc-400">26</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-zinc-500">Completados:</span>
                          <span className="text-sm text-zinc-400">14</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-xs text-amber-500 hover:text-amber-600 p-0"
                        onClick={() => navigate('/dashboard/visitas')}
                      >
                        <span>Ver detalles</span>
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Tarjeta de Costos */}
                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-zinc-400">Costos</CardTitle>
                        <DollarSign className="h-4 w-4 text-amber-500" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-zinc-500">Recaudado:</span>
                          <span className="text-lg font-bold text-zinc-300">50%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-zinc-500">Pendiente:</span>
                          <span className="text-sm text-zinc-400">$125,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-zinc-500">Con multas:</span>
                          <span className="text-sm text-zinc-400">4 departamentos</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-xs text-amber-500 hover:text-amber-600 p-0"
                        onClick={() => navigate('/dashboard/costos')}
                      >
                        <span>Ver detalles</span>
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Tarjeta de Amenidades */}
                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-zinc-400">Amenidades</CardTitle>
                        <Calendar className="h-4 w-4 text-amber-500" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-zinc-500">Reservas hoy:</span>
                          <span className="text-lg font-bold text-zinc-300">3</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-zinc-500">Más popular:</span>
                          <span className="text-sm text-zinc-400">Alberca</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-zinc-500">Total semanal:</span>
                          <span className="text-sm text-zinc-400">18 reservas</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-xs text-amber-500 hover:text-amber-600 p-0"
                        onClick={() => navigate('/dashboard/amenidades')}
                      >
                        <span>Ver detalles</span>
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* Tarjeta de Proveedores */}
                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-zinc-400">Proveedores</CardTitle>
                        <Briefcase className="h-4 w-4 text-amber-500" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-zinc-500">Total activos:</span>
                          <span className="text-lg font-bold text-zinc-300">8</span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-zinc-500">Por renovar:</span>
                          <span className="text-sm text-zinc-400">2 contratos</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="outline" className="text-[10px] h-5 border-zinc-700 bg-zinc-800/50 text-zinc-400">Seguridad</Badge>
                          <Badge variant="outline" className="text-[10px] h-5 border-zinc-700 bg-zinc-800/50 text-zinc-400">Limpieza</Badge>
                          <Badge variant="outline" className="text-[10px] h-5 border-zinc-700 bg-zinc-800/50 text-zinc-400">Mantenimiento</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-xs text-amber-500 hover:text-amber-600 p-0"
                        onClick={() => navigate('/dashboard/proveedores')}
                      >
                        <span>Ver detalles</span>
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Tarjeta de Incidencias */}
                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-zinc-400">Incidencias</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-zinc-500">Sin resolver:</span>
                          <span className="text-lg font-bold text-zinc-300">5</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-zinc-500">Nuevas hoy:</span>
                          <span className="text-sm text-zinc-400">2 incidencias</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-zinc-500">Total mensual:</span>
                          <span className="text-sm text-zinc-400">14 reportes</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-xs text-amber-500 hover:text-amber-600 p-0"
                        onClick={() => navigate('/dashboard/incidencias')}
                      >
                        <span>Ver detalles</span>
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            )}
            
            {/* Action Buttons - solo para residentes */}
            {userRole === "resident" && (
              <div className="mt-6 space-y-4">
                {/* Formulario de Visitas Button */}
                <Button 
                  variant="outline" 
                  className="w-full justify-between p-4 h-auto border-zinc-800 bg-zinc-900/30 hover:bg-zinc-800"
                  onClick={() => setShowVisitForm(true)}
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center mr-3">
                      <Users className="h-5 w-5 text-amber-500" />
                    </div>
                    <span>Formulario de Visitas</span>
                  </div>
                  <span className="text-zinc-500">&rarr;</span>
                </Button>
                
                {/* Paquetes por recoger Button */}
                <Button 
                  variant="outline" 
                  className="w-full justify-between p-4 h-auto border-zinc-800 bg-zinc-900/30 hover:bg-zinc-800"
                  onClick={() => setShowPackageList(true)}
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center mr-3">
                      <Package className="h-5 w-5 text-amber-500" />
                    </div>
                    <span>Paquetes por recoger</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-zinc-800 text-xs">{pendingPackages}</span>
                </Button>
              </div>
            )}
          </div>
          
          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input 
                placeholder="Buscar anuncios..." 
                className="bg-zinc-900/50 border-zinc-800 pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="mt-4 flex space-x-2">
              <Button 
                variant="outline" 
                className={`${
                  filtroAnuncios === "todos" 
                    ? "border-amber-500 bg-amber-500/20 text-amber-500" 
                    : "border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                } flex-1`}
                onClick={() => setFiltroAnuncios("todos")}
              >
                Todos
              </Button>

              <Button 
                variant="outline" 
                className={`${
                  filtroAnuncios === "destacados" 
                    ? "border-amber-500 bg-amber-500/20 text-amber-500" 
                    : "border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                } flex-1`}
                onClick={() => setFiltroAnuncios("destacados")}
              >
                Destacados
              </Button>
            </div>
            
            <h3 className="font-medium mt-6 mb-4">Anuncios Recientes</h3>
            
            {anuncios
              .filter(a => filtroAnuncios === "todos" || (filtroAnuncios === "destacados" && a.destacado))
              .filter(a => 
                a.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                a.contenido.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .slice(0, 3)
              .length > 0 ? (
              <div className="space-y-4">
                {anuncios
                  .filter(a => filtroAnuncios === "todos" || (filtroAnuncios === "destacados" && a.destacado))
                  .filter(a => 
                    a.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    a.contenido.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
                  .slice(0, 3)
                  .map((anuncio) => (
                    <div 
                      key={anuncio.id} 
                      className={`p-3 rounded-md ${
                        anuncio.destacado 
                          ? "bg-amber-500/5 border-l-2 border-amber-500" 
                          : "bg-zinc-800/30"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-sm line-clamp-1">{anuncio.titulo}</h4>
                        {anuncio.destacado && (
                          <AlertTriangle className="h-3 w-3 text-amber-500 flex-shrink-0 ml-2" />
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2 mb-2">{anuncio.contenido}</p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500">
                          {format(new Date(anuncio.fechaCreacion), "d MMM", { locale: es })}
                        </span>
                        <Badge 
                          variant="outline" 
                          className="text-[10px] h-4 border-zinc-700 bg-zinc-800/50 text-zinc-400"
                        >
                          {anuncio.categoria}
                        </Badge>
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className="text-center py-8 text-zinc-500 text-sm">
                No se encontraron anuncios
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Formulario de Visitas Modal */}
      <VisitFormModal 
        isOpen={showVisitForm} 
        onClose={() => setShowVisitForm(false)} 
      />
      
      {/* Modal de Paquetes */}
      <PackageListModal 
        isOpen={showPackageList} 
        onClose={() => setShowPackageList(false)} 
        paquetes={paquetesUsuario}
      />
      
      {/* Modal para crear anuncios */}
      <CrearAnuncioModal
        isOpen={showAnuncioModal}
        onClose={() => setShowAnuncioModal(false)}
        onSave={(nuevoAnuncio) => {
          // Generar un ID único y fecha actual para el nuevo anuncio
          const nuevoAnuncioCompleto: Anuncio = {
            ...nuevoAnuncio,
            id: `anuncio-${Date.now()}`,
            fechaCreacion: new Date().toISOString(),
            autor: "Administración"
          };
          
          // Añadir el anuncio al inicio del array
          setAnuncios([nuevoAnuncioCompleto, ...anuncios]);
        }}
      />
    </div>
  );
}
