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

'use client';

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search, PlusCircle, AlertTriangle
} from "lucide-react";
import { VisitFormModal } from "@/components/visit-form-modal";
import { PackageListModal } from "@/components/package-list-modal";
import { CrearAnuncioModal } from "@/components/crear-anuncio-modal";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "@/hooks/use-toast";
import { useCreateAnuncio } from "@/hooks/useCreateAnuncio";
import { useAnnouncements } from "@/hooks/useAnnouncements";

// Interfaces
interface Paquete {
  id: string;
  empresa: string;
  fechaLlegada: string;
  hora: string;
  destinatario: string;
  estado: "Pendiente" | "Recogido";
  apartamento: string;
}

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [showPackageList, setShowPackageList] = useState(false);
  const [showAnuncioModal, setShowAnuncioModal] = useState(false);
  const [filtroAnuncios, setFiltroAnuncios] = useState<"todos" | "destacados">("todos");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: anuncios = [], refetch } = useAnnouncements();
  const createAnuncio = useCreateAnuncio();

  const [currentUser] = useState({
    nombre: "",
    apartamento: ""
  });

  const [paquetes] = useState<Paquete[]>([]);
  const paquetesUsuario = paquetes.filter(p => userRole === "admin" || p.apartamento === currentUser.apartamento);
  const pendingPackages = paquetesUsuario.filter(p => p.estado === "Pendiente").length;

  useEffect(() => {
    const role = sessionStorage.getItem('userRole') as "resident" | "admin" | null;
    if (!role) return navigate('/auth');
    setUserRole(role);
  }, [navigate]);

  if (!userRole) return <div className="flex items-center justify-center h-screen">Cargando...</div>;

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar userRole={userRole} />

      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-medium mb-6">
          Dashboard {userRole === "admin" ? "de Administrador" : ""}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 🟡 Anuncios */}
          <div className="lg:col-span-2">
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader className="border-b border-zinc-800 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">Anuncios y comunicados</CardTitle>
                    <p className="text-sm text-zinc-400">Comunicación entre residentes y administración</p>
                  </div>
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
                  anuncios.map((anuncio: any) => (
                    <div key={anuncio._id} className={`py-4 ${anuncio.highlight ? 'bg-amber-500/5 -mx-4 px-4 border-l-4 border-amber-500' : ''}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium">{anuncio.title}</h3>
                        {anuncio.highlight && (
                          <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-500">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Destacado
                          </Badge>
                        )}
                      </div>
                      <div className="mb-3">
                        <Badge variant="outline" className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400">
                          {anuncio.category}
                        </Badge>
                        <span className="text-xs text-zinc-500 ml-2">
                          {anuncio.createdAt ? format(new Date(anuncio.createdAt), "d 'de' MMMM, yyyy", { locale: es }) : "Fecha desconocida"}
                        </span>
                      </div>
                      <p className="text-zinc-300 mb-3">{anuncio.description}</p>
                      {anuncio.imageUrl && (
                        <div className="rounded-md overflow-hidden mb-3 bg-zinc-800/30 max-h-56">
                          <img src={anuncio.imageUrl} alt={anuncio.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="text-right text-xs text-zinc-500">{anuncio.autor || "Administración"}</div>
                    </div>
                  ))
                ) : (
                  <div className="min-h-[200px] flex items-center justify-center text-zinc-500">
                    No hay anuncios todavía
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 🔎 Filtro */}
          <div>
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
                className={`${filtroAnuncios === "todos" ? "border-amber-500 bg-amber-500/20 text-amber-500" : "border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"} flex-1`}
                onClick={() => setFiltroAnuncios("todos")}
              >
                Todos
              </Button>
              <Button
                variant="outline"
                className={`${filtroAnuncios === "destacados" ? "border-amber-500 bg-amber-500/20 text-amber-500" : "border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"} flex-1`}
                onClick={() => setFiltroAnuncios("destacados")}
              >
                Destacados
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Modales */}
      <VisitFormModal isOpen={showVisitForm} onClose={() => setShowVisitForm(false)} />
      <PackageListModal isOpen={showPackageList} onClose={() => setShowPackageList(false)} paquetes={paquetesUsuario} />
      <CrearAnuncioModal
        isOpen={showAnuncioModal}
        onClose={() => setShowAnuncioModal(false)}
        onSave={async (anuncio) => {
          try {
            await createAnuncio.mutateAsync({
              ...anuncio,
              fechaCreacion: new Date().toISOString(),
            });
            toast({
              title: "Anuncio creado",
              description: "Se ha publicado correctamente.",
            });
            setShowAnuncioModal(false);
            refetch();
          } catch (err) {
            toast({
              title: "Error",
              description: "No se pudo guardar el anuncio",
              variant: "destructive",
            });
          }
        }}
      />
    </div>
  );
}