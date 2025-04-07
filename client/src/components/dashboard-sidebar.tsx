import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import Logo from "@/components/logo";
import {
  Home,
  CreditCard,
  Bell,
  Calendar,
  Users,
  Package,
  AlertTriangle,
  FileText,
  Settings,
  LogOut,
  Building,
  Cpu
} from "lucide-react";

interface NavItem {
  icon: JSX.Element;
  label: string;
  href: string;
}

interface DashboardSidebarProps {
  userRole: "resident" | "admin";
}

export function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const [, navigate] = useLocation();
  const [activePath, setActivePath] = useState("/dashboard");
  
  const residentNavItems: NavItem[] = [
    { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/dashboard" },
    { icon: <CreditCard className="h-5 w-5" />, label: "Mis Pagos", href: "/dashboard/pagos" },
    { icon: <Bell className="h-5 w-5" />, label: "Anuncios", href: "/dashboard/anuncios" },
    { icon: <Calendar className="h-5 w-5" />, label: "Reservas", href: "/dashboard/reservas" },
    { icon: <Users className="h-5 w-5" />, label: "Visitas", href: "/dashboard/visitas" },
    { icon: <Package className="h-5 w-5" />, label: "Paquetería", href: "/dashboard/paqueteria" },
    { icon: <AlertTriangle className="h-5 w-5" />, label: "Reclamos", href: "/dashboard/reclamos" },
    { icon: <FileText className="h-5 w-5" />, label: "Documentos", href: "/dashboard/documentos" },
    { icon: <Settings className="h-5 w-5" />, label: "Configuración", href: "/dashboard/configuracion" },
  ];
  
  // Add additional items for admin
  const adminNavItems: NavItem[] = [
    ...residentNavItems,
    { icon: <Building className="h-5 w-5" />, label: "Proveedores", href: "/dashboard/proveedores" },
    { icon: <Cpu className="h-5 w-5" />, label: "Sensores", href: "/dashboard/sensores" },
  ];
  
  // Choose the right navigation items based on user role
  const navItems = userRole === "admin" ? adminNavItems : residentNavItems;
  
  const handleNavigation = (href: string) => {
    setActivePath(href);
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
        <p className="text-sm text-sidebar-foreground/70 mt-1 capitalize">
          {userRole}
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
