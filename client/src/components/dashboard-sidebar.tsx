import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import Logo from "@/components/logo";
import {
  Home,
  CreditCard,
  Calendar,
  AlertTriangle,
  FileText,
  Settings,
  LogOut
} from "lucide-react";

/**
 * Interfaz NavItem
 * 
 * Define la estructura de cada elemento de navegación en la barra lateral.
 * 
 * @property icon - Icono que representa visualmente la opción de menú
 * @property label - Texto descriptivo que aparece junto al icono
 * @property href - Ruta de navegación que se activará al hacer clic
 */
interface NavItem {
  icon: JSX.Element;
  label: string;
  href: string;
}

/**
 * Interfaz DashboardSidebarProps
 * 
 * Define las propiedades recibidas por el componente DashboardSidebar.
 * 
 * @property userRole - Rol del usuario que determina qué opciones de menú se mostrarán
 *                     "resident" para residentes del edificio
 *                     "admin" para administradores del sistema
 */
interface DashboardSidebarProps {
  userRole: "resident" | "admin";
}

/**
 * Componente DashboardSidebar
 * 
 * Este componente representa la barra lateral de navegación del panel de control.
 * Muestra diferentes opciones de menú según el rol del usuario (residente o administrador).
 * 
 * Funcionalidades:
 * - Muestra el logo de Milovat y el rol del usuario
 * - Presenta un menú de navegación con iconos y etiquetas
 * - Resalta visualmente la opción de menú activa
 * - Proporciona una sección para información del usuario y cierre de sesión
 * - Adapta las opciones de menú según el rol del usuario
 * 
 * @param userRole - Rol del usuario ("resident" o "admin")
 */
export function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const [location, navigate] = useLocation();
  
  // Determinar qué ruta está activa basado en la ubicación actual
  const getActivePath = () => {
    if (location.startsWith('/dashboard/configuracion')) return '/dashboard/configuracion';
    if (location.startsWith('/dashboard/pagos')) return '/dashboard/pagos';
    if (location.startsWith('/dashboard/incidencias')) return '/dashboard/incidencias';
    if (location.startsWith('/dashboard/amenidades')) return '/dashboard/amenidades';
    if (location.startsWith('/dashboard/documentos')) return '/dashboard/documentos';
    return '/dashboard';
  };
  
  const activePath = getActivePath();
  
  const residentNavItems: NavItem[] = [
    { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/dashboard" },
    { icon: <CreditCard className="h-5 w-5" />, label: "Pagos", href: "/dashboard/pagos" },
    { icon: <AlertTriangle className="h-5 w-5" />, label: "Incidencias", href: "/dashboard/incidencias" },
    { icon: <Calendar className="h-5 w-5" />, label: "Amenidades", href: "/dashboard/amenidades" },
    { icon: <FileText className="h-5 w-5" />, label: "Documentos", href: "/dashboard/documentos" },
    { icon: <Settings className="h-5 w-5" />, label: "Configuración", href: "/dashboard/configuracion" },
  ];
  
  // Add additional items for admin
  const adminNavItems: NavItem[] = [
    ...residentNavItems,
  ];
  
  // Choose the right navigation items based on user role
  const navItems = userRole === "admin" ? adminNavItems : residentNavItems;


  
  const handleNavigation = (href: string) => {
    navigate(href);
  };
  
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('isDevelopment');
    // Navigate to home page
    navigate('/');
  };
  
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      {/* Logo & User role */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <h1 className="text-xl gold-gradient font-medium">milovat</h1>
        </div>
        <p className="text-sm text-sidebar-foreground/70 mt-1">
          {userRole === "resident" ? "Residente" : "Administrador"}
        </p>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-grow py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activePath === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/10"
                }`}
                onClick={() => handleNavigation(item.href)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* User Profile & Logout */}
      <div className="p-4 border-t border-sidebar-border mt-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-sidebar-accent/10 flex items-center justify-center">
            <span className="text-sidebar-foreground">U</span>
          </div>
          <div>
            <p className="font-medium">Usuario de Desarrollo</p>
            <p className="text-sm text-sidebar-foreground/70">dev@milovat.com</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>Cerrar sesión</span>
        </Button>
      </div>
    </aside>
  );
}
