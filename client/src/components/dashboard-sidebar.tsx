'use client';

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import {
  Home, CreditCard, Calendar, AlertTriangle, FileText, Settings,
  LogOut, Truck, DollarSign, Ban, Users
} from "lucide-react";

interface NavItem {
  icon: JSX.Element;
  label: string;
  href: string;
}

interface DashboardSidebarProps {
  userRole: "resident" | "admin";
}

function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const [location, navigate] = useLocation();

  const getActivePath = () => {
    if (location.startsWith('/dashboard/configuracion')) return '/dashboard/configuracion';
    if (location.startsWith('/dashboard/pagos')) return '/dashboard/pagos';
    if (location.startsWith('/dashboard/incidencias')) return '/dashboard/incidencias';
    if (location.startsWith('/dashboard/amenidades')) return '/dashboard/amenidades';
    if (location.startsWith('/dashboard/documentos')) return '/dashboard/documentos';
    if (location.startsWith('/dashboard/proveedores')) return '/dashboard/proveedores';
    if (location.startsWith('/dashboard/costos')) return '/dashboard/costos';
    if (location.startsWith('/dashboard/multas')) return '/dashboard/multas';
    if (location.startsWith('/dashboard/visitas')) return '/dashboard/visitas';
    return '/dashboard';
  };

  const activePath = getActivePath();

  const residentNavItems: NavItem[] = [
    { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/dashboard" },
    { icon: <CreditCard className="h-5 w-5" />, label: "Pagos", href: "/dashboard/pagos" },
    { icon: <AlertTriangle className="h-5 w-5" />, label: "Incidencias", href: "/dashboard/incidencias" },
    { icon: <Calendar className="h-5 w-5" />, label: "Reservas", href: "/dashboard/amenidades" },
    { icon: <FileText className="h-5 w-5" />, label: "Documentos", href: "/dashboard/documentos" },
    { icon: <Settings className="h-5 w-5" />, label: "Configuración", href: "/dashboard/configuracion" },
  ];

  const adminNavItems: NavItem[] = [
    { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/dashboard" },
    { icon: <Truck className="h-5 w-5" />, label: "Proveedores", href: "/dashboard/proveedores" },
    { icon: <AlertTriangle className="h-5 w-5" />, label: "Incidentes", href: "/dashboard/incidencias" },
    { icon: <Calendar className="h-5 w-5" />, label: "Reservas", href: "/dashboard/amenidades" },
    { icon: <DollarSign className="h-5 w-5" />, label: "Costos", href: "/dashboard/costos" },
    { icon: <Ban className="h-5 w-5" />, label: "Multas", href: "/dashboard/multas" },
    { icon: <Users className="h-5 w-5" />, label: "Visitas", href: "/dashboard/visitas" },
    { icon: <Settings className="h-5 w-5" />, label: "Configuración", href: "/dashboard/configuracion" },
  ];

  const navItems = userRole === "admin" ? adminNavItems : residentNavItems;

  const handleNavigation = (href: string) => navigate(href);

  const handleLogout = () => {
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('isDevelopment');
    navigate('/');
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <h1 className="text-xl gold-gradient font-medium">milovat</h1>
        </div>
        <p className="text-sm text-sidebar-foreground/70 mt-1">
          {userRole === "resident" ? "Residente" : "Administrador"}
        </p>
      </div>

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

export default DashboardSidebar;
