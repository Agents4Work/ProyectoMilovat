import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Package } from "lucide-react";
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
          <div className="flex-grow bg-zinc-400 dark:bg-zinc-600 rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-bold">Anuncios y comunicados</h2>
              <p className="text-sm">Comunicación entre administración y residentes</p>
              
              <hr className="border-black/30 dark:border-black/50 my-2" />
              
              <div className="flex items-start gap-4 mt-4">
                <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">A</span>
                </div>
                <div className="flex-grow">
                  <div className="bg-amber-300/80 dark:bg-amber-500/80 rounded-full py-3 px-4 mb-2">
                    <h3 className="font-medium">{anuncioActual.titulo}</h3>
                    <p className="mt-1 text-sm">{anuncioActual.texto}</p>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-200">Publicado: {anuncioActual.fecha}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-64 lg:w-72 bg-amber-300/80 dark:bg-amber-500/80 rounded-lg">
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Todas | Destacadas</h3>
              </div>
              
              <h3 className="font-medium mt-4 mb-2">Anuncios</h3>
              <ul className="space-y-2">
                {anunciosPasados.map(anuncio => (
                  <li key={anuncio.id} className="text-sm cursor-pointer hover:underline">
                    {anuncio.titulo} - <span className="text-xs">{anuncio.fecha}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Formulario de visitas */}
        <div 
          className="mb-6 bg-zinc-400 dark:bg-zinc-600 rounded-lg cursor-pointer hover:bg-amber-400/20 dark:hover:bg-amber-500/20 transition-colors duration-200 border border-amber-300/30 dark:border-amber-500/30"
          onClick={handleVisitasClick}
        >
          <div className="p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Formulario de Visitas</h2>
            <ArrowRight className="h-10 w-10 text-amber-500 dark:text-amber-400" />
          </div>
        </div>
        
        {/* Paquetería */}
        <div className="bg-zinc-400 dark:bg-zinc-600 rounded-lg border border-amber-300/30 dark:border-amber-500/30">
          <div className="p-6 flex items-center gap-4">
            <div className="bg-amber-300/50 dark:bg-amber-500/50 rounded-full p-2">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-medium">Paquetes por recoger:</h2>
              <p className="text-4xl font-bold text-amber-600 dark:text-amber-400">0</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
