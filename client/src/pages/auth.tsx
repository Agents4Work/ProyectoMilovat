import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Logo from "@/components/logo";
import { ArrowLeft } from "lucide-react";

export default function Auth() {
  const [, navigate] = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        alert("Credenciales incorrectas");
        return;
      }

      const data = await res.json();

      // Guardar datos de sesión
      sessionStorage.setItem("userRole", data.role);
      sessionStorage.setItem("userId", data.userId);
      sessionStorage.setItem("token", data.token);

      // Redirección
      navigate("/dashboard");

    } catch (err) {
      console.error("Error al conectar con backend:", err);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      <Button
        variant="ghost"
        className="absolute top-6 left-6 text-muted-foreground hover:text-foreground"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver
      </Button>

      <div className="mb-8 text-center">
        <Logo size="md" showText textColor="gold" />
        <p className="text-muted-foreground mt-2">
          Accede a tu plataforma de gestión residencial
        </p>
      </div>

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border rounded-lg bg-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                  onCheckedChange={(checked : boolean) =>
                    setRememberMe(checked)
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
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
