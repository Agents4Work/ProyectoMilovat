import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, FolderClosed, Grid, List } from "lucide-react";

// Categorías de documentos
const DOCUMENT_CATEGORIES = [
  "Todos", 
  "Seguridad", 
  "Proveedores", 
  "Limpieza", 
  "Condominos",
  "Otros"
];

// Interfaz para documentos
interface Document {
  id: string;
  name: string;
  category: string;
  date: string;
  type: string;
  size: string;
  isPublic: boolean;
}

export default function Documentos() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"Todos" | "Públicos" | "Privados">("Todos");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  
  useEffect(() => {
    // Get user role from session storage
    const role = sessionStorage.getItem('userRole') as "resident" | "admin" | null;
    
    if (!role) {
      // Redirect to login if no role
      navigate('/auth');
      return;
    }
    
    setUserRole(role);
    
    // Aquí se cargarían los documentos reales desde una API
    // Por ahora dejamos la lista vacía para mostrar el estado "No se encontraron documentos"
  }, [navigate]);
  
  // Filtrar documentos basado en búsqueda, categoría y tab
  useEffect(() => {
    let filtered = [...documents];
    
    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filtrar por categoría
    if (activeCategory !== "Todos") {
      filtered = filtered.filter(doc => doc.category === activeCategory);
    }
    
    // Filtrar por tab (público/privado)
    if (activeTab === "Públicos") {
      filtered = filtered.filter(doc => doc.isPublic);
    } else if (activeTab === "Privados") {
      filtered = filtered.filter(doc => !doc.isPublic);
    }
    
    setFilteredDocuments(filtered);
  }, [documents, searchQuery, activeCategory, activeTab]);
  
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
        <h1 className="text-2xl font-medium mb-2">Documentos</h1>
        <p className="text-sm text-zinc-400 mb-6">Documentos compartidos por la administración</p>
        
        {/* Búsqueda y filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input 
              placeholder="Buscar documentos..."
              className="bg-zinc-900/50 border-zinc-800 pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="flex bg-zinc-800 rounded-md p-1 w-full">
              <button
                className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "Todos" 
                    ? "bg-amber-500 text-black" 
                    : "text-zinc-400 hover:text-zinc-300"
                }`}
                onClick={() => setActiveTab("Todos")}
              >
                Todos
              </button>
              <button
                className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "Públicos" 
                    ? "bg-amber-500 text-black" 
                    : "text-zinc-400 hover:text-zinc-300"
                }`}
                onClick={() => setActiveTab("Públicos")}
              >
                Públicos
              </button>
              <button
                className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "Privados" 
                    ? "bg-amber-500 text-black" 
                    : "text-zinc-400 hover:text-zinc-300"
                }`}
                onClick={() => setActiveTab("Privados")}
              >
                Privados
              </button>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className={`border-zinc-800 ${viewMode === 'grid' ? 'bg-zinc-800' : 'bg-zinc-900/50'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className={`border-zinc-800 ${viewMode === 'list' ? 'bg-zinc-800' : 'bg-zinc-900/50'}`}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Categorías */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {DOCUMENT_CATEGORIES.map((category) => (
            <Button
              key={category}
              variant="outline"
              className={`border-zinc-800 whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                  : 'bg-zinc-900/50 hover:bg-zinc-800'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Documentos (estado vacío) */}
        {filteredDocuments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-20 w-20 text-zinc-700 mb-4">
              <FileText className="h-20 w-20" />
            </div>
            <h3 className="text-xl font-medium mb-2">No se encontraron documentos</h3>
            <p className="text-sm text-zinc-500">No hay documentos que coincidan con tu búsqueda</p>
          </div>
        )}
        
        {/* Documentos en vista de cuadrícula */}
        {filteredDocuments.length > 0 && viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 hover:bg-zinc-800/50 transition cursor-pointer"
              >
                <div className="h-12 w-12 bg-zinc-800 rounded flex items-center justify-center mb-3">
                  <FolderClosed className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="font-medium mb-1 truncate">{doc.name}</h3>
                <p className="text-xs text-zinc-500">{doc.date} • {doc.size}</p>
              </div>
            ))}
          </div>
        )}
        
        {/* Documentos en vista de lista */}
        {filteredDocuments.length > 0 && viewMode === 'list' && (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left p-4 text-sm font-medium">Nombre</th>
                  <th className="text-left p-4 text-sm font-medium">Categoría</th>
                  <th className="text-left p-4 text-sm font-medium">Fecha</th>
                  <th className="text-left p-4 text-sm font-medium">Tamaño</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition cursor-pointer">
                    <td className="p-4 flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-amber-500" />
                      <span>{doc.name}</span>
                    </td>
                    <td className="p-4 text-zinc-400">{doc.category}</td>
                    <td className="p-4 text-zinc-400">{doc.date}</td>
                    <td className="p-4 text-zinc-400">{doc.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}