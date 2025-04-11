import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, Package } from "lucide-react";

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [pendingPackages, setPendingPackages] = useState(0);
  
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
                <div className="flex flex-col space-y-1">
                  <CardTitle className="text-xl">Anuncios y comunicados</CardTitle>
                  <p className="text-sm text-zinc-400">Comunicación entre residentes y administración</p>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="min-h-[400px] flex items-center justify-center text-zinc-500">
                  No hay anuncios todavía
                </div>
              </CardContent>
            </Card>
            
            {/* Action Buttons */}
            <div className="mt-6 space-y-4">
              {/* Formulario de Visitas Button */}
              <Button 
                variant="outline" 
                className="w-full justify-between p-4 h-auto border-zinc-800 bg-zinc-900/30 hover:bg-zinc-800"
                onClick={() => navigate('/dashboard/visitas')}
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
                onClick={() => navigate('/dashboard/paquetes')}
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
          </div>
          
          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input 
                placeholder="Buscar anuncios..." 
                className="bg-zinc-900/50 border-zinc-800 pl-9" 
              />
            </div>
            
            <div className="mt-4 flex space-x-2">
              <Button 
                variant="outline" 
                className="border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 flex-1"
              >
                Todos
              </Button>

              <Button 
                variant="outline" 
                className="border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 flex-1"
              >
                Destacados
              </Button>
            </div>
            
            <h3 className="font-medium mt-6 mb-4">Anuncios Recientes</h3>
            
            <div className="text-center py-8 text-zinc-500 text-sm">
              No se encontraron anuncios
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
