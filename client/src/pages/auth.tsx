import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";
import { AccountTypeModal } from "@/components/account-type-modal";
import { ArrowLeft } from "lucide-react";

export default function Auth() {
  const [isOpen, setIsOpen] = useState(false);
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("login");
  
  // Mock form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  
  const handleLogin = () => {
    // In a real app, we would validate and send to backend
    // For now, just open the account type modal
    setIsOpen(true);
  };
  
  const handleRegister = () => {
    // In a real app, we would validate and send to backend
    // For now, just open the account type modal
    setIsOpen(true);
  };
  
  const handleRoleSelected = (role: "resident" | "admin") => {
    // Store the selected role
    sessionStorage.setItem('userRole', role);
    // Close the modal
    setIsOpen(false);
    // Navigate to dashboard
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="absolute top-6 left-6 text-muted-foreground hover:text-foreground" 
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver
      </Button>
      
      {/* Logo and header */}
      <div className="mb-8 text-center">
        <Logo size="md" showText textColor="gold" />
        <p className="text-muted-foreground mt-2">
          Accede a tu plataforma de gestión residencial
        </p>
      </div>
      
      {/* Auth form */}
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Tabs 
          defaultValue="login" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="p-6 border rounded-lg bg-card mt-2">
            {/* Google login button */}
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 mb-4"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M12.545 12.151L12.545 12.151 12.545 12.151C12.545 11.166 12.466 10.294 12.32 9.535H6.187V13.304H9.844C9.635 14.272 9.001 15.041 8.048 15.57V18.114H9.994C11.149 17.014 11.879 15.382 11.879 13.304 11.88 13.004 11.953 12.635 12.545 12.151Z" fill="#4285F4"/>
                <path d="M6.187 21.001C7.861 21.001 9.276 20.472 10.362 19.601L8.048 17.428C7.496 17.837 6.909 18.075 6.187 18.075C4.571 18.075 3.225 16.999 2.733 15.5H0.723V18.099C1.718 19.859 3.842 21.001 6.187 21.001Z" fill="#34A853"/>
                <path d="M2.733 15.5C2.615 15.112 2.528 14.725 2.528 14.3C2.528 13.935 2.602 13.536 2.733 13.06V10.757H0.723C0.259 11.897 0 13.1 0 14.3C0 15.5 0.259 16.663 0.723 17.804L2.733 15.5Z" fill="#FBBC05"/>
                <path d="M6.187 10.526C7.075 10.526 7.876 10.839 8.538 11.471L10.622 9.386C9.531 8.359 8.116 7.699 6.187 7.699C3.842 7.699 1.718 8.841 0.723 10.602L2.733 12.901C3.225 11.402 4.571 10.526 6.187 10.526Z" fill="#EA4335"/>
              </svg>
              Iniciar Sesión con Google
            </Button>
            
            <div className="relative flex items-center my-4">
              <div className="flex-grow border-t border-muted"></div>
              <span className="flex-shrink mx-4 text-muted-foreground text-sm">O continuar con</span>
              <div className="flex-grow border-t border-muted"></div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nombre de usuario</Label>
                <Input 
                  id="username" 
                  placeholder="usuario" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember-me" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => 
                      setRememberMe(checked as boolean)
                    }
                  />
                  <Label htmlFor="remember-me" className="text-sm">Recordarme</Label>
                </div>
                <a href="#" className="text-sm text-amber-500 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              
              <Button 
                className="w-full gold-gradient-bg text-black hover:opacity-90"
                onClick={handleLogin}
              >
                Iniciar sesión
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="register" className="p-6 border rounded-lg bg-card mt-2">
            {/* Google registration button */}
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 mb-4"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M12.545 12.151L12.545 12.151 12.545 12.151C12.545 11.166 12.466 10.294 12.32 9.535H6.187V13.304H9.844C9.635 14.272 9.001 15.041 8.048 15.57V18.114H9.994C11.149 17.014 11.879 15.382 11.879 13.304 11.88 13.004 11.953 12.635 12.545 12.151Z" fill="#4285F4"/>
                <path d="M6.187 21.001C7.861 21.001 9.276 20.472 10.362 19.601L8.048 17.428C7.496 17.837 6.909 18.075 6.187 18.075C4.571 18.075 3.225 16.999 2.733 15.5H0.723V18.099C1.718 19.859 3.842 21.001 6.187 21.001Z" fill="#34A853"/>
                <path d="M2.733 15.5C2.615 15.112 2.528 14.725 2.528 14.3C2.528 13.935 2.602 13.536 2.733 13.06V10.757H0.723C0.259 11.897 0 13.1 0 14.3C0 15.5 0.259 16.663 0.723 17.804L2.733 15.5Z" fill="#FBBC05"/>
                <path d="M6.187 10.526C7.075 10.526 7.876 10.839 8.538 11.471L10.622 9.386C9.531 8.359 8.116 7.699 6.187 7.699C3.842 7.699 1.718 8.841 0.723 10.602L2.733 12.901C3.225 11.402 4.571 10.526 6.187 10.526Z" fill="#EA4335"/>
              </svg>
              Registrarse con Google
            </Button>
            
            <div className="relative flex items-center my-4">
              <div className="flex-grow border-t border-muted"></div>
              <span className="flex-shrink mx-4 text-muted-foreground text-sm">O registrarse con</span>
              <div className="flex-grow border-t border-muted"></div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullname">Nombre completo</Label>
                <Input 
                  id="fullname" 
                  placeholder="Juan Pérez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="juan@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reg-username">Nombre de usuario</Label>
                <Input 
                  id="reg-username" 
                  placeholder="usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reg-password">Contraseña</Label>
                <Input 
                  id="reg-password" 
                  type="password" 
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <Button 
                className="w-full gold-gradient-bg text-black hover:opacity-90"
                onClick={handleRegister}
              >
                Registrarse
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      {/* Account type selection modal */}
      <AccountTypeModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        onRoleSelected={handleRoleSelected}
      />
    </div>
  );
}
