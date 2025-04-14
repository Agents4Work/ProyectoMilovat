/**
 * Archivo App.tsx
 * 
 * Este archivo es el punto de entrada principal de la aplicación React.
 * Define la estructura de rutas y configura el QueryClient para gestionar
 * las consultas a la API, utilizando wouter para la navegación.
 * 
 * Características principales:
 * - Configuración del Router con wouter para gestionar la navegación
 * - Configuración del QueryClientProvider para manejar peticiones a la API
 * - Definición de todas las rutas disponibles en la aplicación
 * - Integración del componente Toaster para mostrar notificaciones
 */

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Auth from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import Configuracion from "@/pages/configuracion";
import Documentos from "@/pages/documentos";
import Incidencias from "@/pages/incidencias";
import Pagos from "@/pages/pagos";
import Amenidades from "@/pages/amenidades";
import Multas from "@/pages/multas";
import Visitas from "@/pages/visitas";
import Costos from "@/pages/costos";
import Proveedores from "@/pages/proveedores";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/configuracion" component={Configuracion} />
      <Route path="/dashboard/documentos" component={Documentos} />
      <Route path="/dashboard/incidencias" component={Incidencias} />
      <Route path="/dashboard/pagos" component={Pagos} />
      <Route path="/dashboard/amenidades" component={Amenidades} />
      <Route path="/dashboard/multas" component={Multas} />
      <Route path="/dashboard/visitas" component={Visitas} />
      <Route path="/dashboard/costos" component={Costos} />
      <Route path="/dashboard/proveedores" component={Proveedores} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
