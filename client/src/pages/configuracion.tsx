import { useState } from "react";
import { useLocation } from "wouter";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { User, LockKeyhole, Bell } from "lucide-react";

export default function Configuracion() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [activeTab, setActiveTab] = useState<"perfil" | "seguridad" | "notificaciones">("perfil");
  
  // Form states
  const [nombre, setNombre] = useState("Usuario de Desarrollo");
  const [correo, setCorreo] = useState("dev@milovat.com");
  const [telefono, setTelefono] = useState("");
  const [contactoEmergencia, setContactoEmergencia] = useState("");
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);
  const [newAnnouncements, setNewAnnouncements] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [maintenanceUpdates, setMaintenanceUpdates] = useState(true);
  
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
  
  const handleSaveProfile = () => {
    // Aquí iría la lógica para guardar el perfil
    console.log("Perfil guardado", { nombre, correo, telefono, contactoEmergencia });
    // Mostrar mensaje de éxito
  };
  
  const handleChangePassword = () => {
    // Aquí iría la lógica para cambiar la contraseña
    if (newPassword !== confirmPassword) {
      console.log("Las contraseñas no coinciden");
      return;
    }
    console.log("Contraseña cambiada");
    // Limpiar campos y mostrar mensaje de éxito
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  const handleSavePreferences = () => {
    // Aquí iría la lógica para guardar preferencias de notificaciones
    console.log("Preferencias guardadas", { 
      emailNotifications, 
      paymentReminders, 
      newAnnouncements, 
      securityAlerts, 
      maintenanceUpdates 
    });
    // Mostrar mensaje de éxito
  };
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar userRole={userRole} />
      
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-medium mb-6">
          Configuración
        </h1>
        
        {/* Tabs */}
        <div className="bg-zinc-900 rounded-lg mb-6">
          <div className="flex border-b border-zinc-800">
            <button
              className={`flex-1 py-3 px-4 text-center ${activeTab === "perfil" ? "text-amber-500 border-b-2 border-amber-500" : "text-zinc-400 hover:text-zinc-300"}`}
              onClick={() => setActiveTab("perfil")}
            >
              <span className="flex items-center justify-center">
                <User className="w-4 h-4 mr-2" />
                Perfil
              </span>
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center ${activeTab === "seguridad" ? "text-amber-500 border-b-2 border-amber-500" : "text-zinc-400 hover:text-zinc-300"}`}
              onClick={() => setActiveTab("seguridad")}
            >
              <span className="flex items-center justify-center">
                <LockKeyhole className="w-4 h-4 mr-2" />
                Seguridad
              </span>
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center ${activeTab === "notificaciones" ? "text-amber-500 border-b-2 border-amber-500" : "text-zinc-400 hover:text-zinc-300"}`}
              onClick={() => setActiveTab("notificaciones")}
            >
              <span className="flex items-center justify-center">
                <Bell className="w-4 h-4 mr-2" />
                Notificaciones
              </span>
            </button>
          </div>
          
          <div className="p-6">
            {/* Perfil Personal */}
            {activeTab === "perfil" && (
              <div>
                <div className="flex flex-col space-y-1 mb-4">
                  <h2 className="text-xl font-medium">Perfil Personal</h2>
                  <p className="text-sm text-zinc-400">Actualiza tu información personal y de contacto</p>
                </div>
                
                <div className="space-y-4 mt-6">
                  <div>
                    <Label htmlFor="nombre">Nombre completo</Label>
                    <Input
                      id="nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="correo">Correo electrónico</Label>
                    <Input
                      id="correo"
                      type="email"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contacto-emergencia">Número de contacto para emergencias</Label>
                    <Input
                      id="contacto-emergencia"
                      value={contactoEmergencia}
                      onChange={(e) => setContactoEmergencia(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 mt-1"
                    />
                  </div>
                  
                  <Button 
                    className="mt-4 bg-amber-500 hover:bg-amber-600 text-black"
                    onClick={handleSaveProfile}
                  >
                    Guardar cambios
                  </Button>
                </div>
              </div>
            )}
            
            {/* Seguridad */}
            {activeTab === "seguridad" && (
              <div>
                <div className="flex flex-col space-y-1 mb-4">
                  <h2 className="text-xl font-medium">Seguridad</h2>
                  <p className="text-sm text-zinc-400">Gestiona tu contraseña y opciones de seguridad</p>
                </div>
                
                <div className="space-y-4 mt-6">
                  <div>
                    <Label htmlFor="current-password">Contraseña actual</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="new-password">Nueva contraseña</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 mt-1"
                    />
                    <p className="text-xs text-zinc-500 mt-1">Al menos 6 caracteres, incluyendo letras y números</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 mt-1"
                    />
                  </div>
                  
                  <Button 
                    className="mt-4 bg-amber-500 hover:bg-amber-600 text-black"
                    onClick={handleChangePassword}
                  >
                    Cambiar contraseña
                  </Button>
                  
                  <div className="mt-8 pt-6 border-t border-zinc-800">
                    <h3 className="text-lg font-medium mb-2">Sesiones activas</h3>
                    <p className="text-sm text-zinc-400 mb-4">Dispositivos en los que has iniciado sesión</p>
                    
                    <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
                      <div>
                        <p className="font-medium">Este dispositivo</p>
                        <p className="text-xs text-zinc-400">Última activación: Ahora</p>
                      </div>
                      <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">Activo</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Notificaciones */}
            {activeTab === "notificaciones" && (
              <div>
                <div className="flex flex-col space-y-1 mb-4">
                  <h2 className="text-xl font-medium">Preferencias de notificaciones</h2>
                  <p className="text-sm text-zinc-400">Configura cómo quieres recibir notificaciones</p>
                </div>
                
                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <div>
                      <p className="font-medium">Notificaciones por correo</p>
                      <p className="text-xs text-zinc-400">Recibe notificaciones generales por correo electrónico</p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                      className="data-[state=checked]:bg-amber-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <div>
                      <p className="font-medium">Recordatorios de pago</p>
                      <p className="text-xs text-zinc-400">Recibe recordatorios antes del vencimiento de pagos</p>
                    </div>
                    <Switch
                      checked={paymentReminders}
                      onCheckedChange={setPaymentReminders}
                      className="data-[state=checked]:bg-amber-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <div>
                      <p className="font-medium">Nuevos anuncios</p>
                      <p className="text-xs text-zinc-400">Recibe notificaciones cuando se publiquen nuevos anuncios</p>
                    </div>
                    <Switch
                      checked={newAnnouncements}
                      onCheckedChange={setNewAnnouncements}
                      className="data-[state=checked]:bg-amber-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <div>
                      <p className="font-medium">Alertas de seguridad</p>
                      <p className="text-xs text-zinc-400">Recibe alertas sobre incidentes de seguridad</p>
                    </div>
                    <Switch
                      checked={securityAlerts}
                      onCheckedChange={setSecurityAlerts}
                      className="data-[state=checked]:bg-amber-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <div>
                      <p className="font-medium">Actualizaciones de mantenimiento</p>
                      <p className="text-xs text-zinc-400">Recibe notificaciones sobre trabajos de mantenimiento</p>
                    </div>
                    <Switch
                      checked={maintenanceUpdates}
                      onCheckedChange={setMaintenanceUpdates}
                      className="data-[state=checked]:bg-amber-500"
                    />
                  </div>
                  
                  <Button 
                    className="mt-4 bg-amber-500 hover:bg-amber-600 text-black"
                    onClick={handleSavePreferences}
                  >
                    Guardar preferencias
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}