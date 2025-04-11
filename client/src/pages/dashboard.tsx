import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Package, Calendar } from "lucide-react";
import Logo from "@/components/logo";

// Datos de ejemplo para los anuncios
const anuncioActual = {
  titulo: "Corte de agua programado",
  texto: "Estimados residentes, les informamos que el día 15 de abril se realizará un corte de agua programado desde las 10:00 hasta las 14:00 horas para mantenimiento del sistema. Recomendamos almacenar agua para uso doméstico durante ese periodo. Disculpen las molestias.",
  fecha: "10 de abril, 2025",
  autor: "Administración"
};

const anunciosPasados = [
  { id: 1, titulo: "Asamblea de propietarios", fecha: "5 de abril, 2025" },
  { id: 2, titulo: "Mantenimiento de ascensores", fecha: "28 de marzo, 2025" },
  { id: 3, titulo: "Inspección de seguridad", fecha: "15 de marzo, 2025" }
];

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  
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

  const handleVisitasClick = () => {
    // Navegar a la página de visitas cuando esté implementada
    navigate('/dashboard/reservas');
  };
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar userRole={userRole} />
      
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-medium mb-6">
          Dashboard {userRole === "admin" ? "de Administrador" : ""}
        </h1>
        
        {/* Sección de anuncios */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-grow bg-white dark:bg-zinc-800 rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-zinc-700">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-bold gold-gradient">Anuncios y comunicados</h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Comunicación entre administración y residentes</p>
              
              <div className="my-4 border-b border-gray-200 dark:border-gray-700"></div>
              
              <div className="flex items-start gap-4 mt-6">
                <div className="gold-gradient-bg rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-black font-medium">A</span>
                </div>
                <div className="flex-grow">
                  <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">
                    <h3 className="font-semibold gold-gradient">{anuncioActual.titulo}</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{anuncioActual.texto}</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Publicado: {anuncioActual.fecha}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-64 lg:w-80 bg-white dark:bg-zinc-800 rounded-lg shadow-md border border-gray-100 dark:border-zinc-700">
            <div className="p-5">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-zinc-700 pb-2">
                <span className="text-sm font-medium gold-gradient">Todas</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">|</span>
                <span className="text-sm font-medium">Destacadas</span>
              </div>
              
              <h3 className="font-medium mt-4 mb-3 gold-gradient">Anuncios</h3>
              <ul className="space-y-3">
                {anunciosPasados.map(anuncio => (
                  <li key={anuncio.id} className="text-sm border-b border-gray-100 dark:border-zinc-700 pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    <span className="font-medium">{anuncio.titulo}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{anuncio.fecha}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Formulario de visitas */}
        <div 
          className="mb-6 bg-white dark:bg-zinc-800 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200 shadow-md border border-gray-100 dark:border-zinc-700 group"
          onClick={handleVisitasClick}
        >
          <div className="p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="gold-gradient-bg rounded-full p-2 shadow-sm">
                <Calendar className="h-6 w-6 text-black" />
              </div>
              <h2 className="text-xl font-bold">Formulario de Visitas</h2>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors" />
          </div>
        </div>
        
        {/* Paquetería */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md border border-gray-100 dark:border-zinc-700">
          <div className="p-6 flex items-center gap-4">
            <div className="gold-gradient-bg rounded-full p-3 shadow-sm">
              <Package className="h-6 w-6 text-black" />
            </div>
            <div>
              <h2 className="text-lg font-medium">Paquetes por recoger:</h2>
              <p className="text-4xl font-bold gold-gradient">0</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
