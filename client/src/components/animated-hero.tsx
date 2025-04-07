import { useEffect, useMemo, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import Logo from "./logo";
import logoImage from "../assets/Logo-Milotav-Positivo1-2022.png";

/**
 * Componente AnimatedHero
 * 
 * Este componente muestra el área principal de la página de inicio.
 * Incluye un texto animado que cambia entre diferentes palabras,
 * el logo de la aplicación y un botón para iniciar sesión.
 * 
 * Características:
 * - Animación de texto rotativo
 * - Transiciones suaves
 * - Control de renderizado para optimización
 */
export const AnimatedHero = memo(function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const [, navigate] = useLocation();
  const titles = useMemo(
    () => ["Segura", "Confiable", "Centralizada"],
    []
  );

  // Usamos setTimeout en lugar de requestAnimationFrame para mayor estabilidad
  useEffect(() => {
    const interval = 5000; // 5 segundos entre cambios para reducir frecuencia
    
    // Utilizamos el timer estándar para evitar problemas de rendimiento
    const timer = setTimeout(() => {
      setTitleNumber(prev => 
        prev === titles.length - 1 ? 0 : prev + 1
      );
    }, interval);
    
    // Limpieza del timer
    return () => clearTimeout(timer);
  }, [titleNumber, titles.length]); // Dependencias actualizadas

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-10 items-center justify-center flex-col">
          {/* Logo en la parte superior */}
          <div className="mb-6 flex flex-col items-center">
            <img 
              src={logoImage} 
              alt="Logo Milovat" 
              className="h-24 object-contain" 
            />
            <h1 className="text-center text-4xl font-normal mt-4 text-white milovat-text">Milovat</h1>
          </div>
          
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl md:text-6xl max-w-2xl tracking-tighter text-center font-regular">
              <div className="gold-gradient milovat-text">
                Una plataforma que es
              </div>
              <div className="relative flex w-full justify-center overflow-hidden text-center h-24 md:pb-4 md:pt-1">
                <AnimatePresence mode="wait">
                  {titles.map((title, index) => (
                    titleNumber === index && (
                      <motion.span
                        key={index}
                        className="absolute font-semibold gold-gradient-text mt-2 milovat-text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ 
                          duration: 0.8,
                          ease: "easeInOut"
                        }}
                      >
                        {title}
                      </motion.span>
                    )
                  ))}
                </AnimatePresence>
              </div>
            </h1>
          </div>
          
          <div className="flex flex-row gap-3 mt-8">
            <Button
              onClick={() => {
                sessionStorage.setItem('isDevelopment', 'true');
                navigate("/auth");
              }}
              className="gold-gradient-bg text-black px-6 py-6 rounded-lg font-medium text-lg hover:opacity-90"
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
