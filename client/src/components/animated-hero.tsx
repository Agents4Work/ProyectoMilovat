import { useEffect, useMemo, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import Logo from "./logo";
import logoImage from "@assets/Logo-Milotav-Positivo1-2022.png";

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

  // Usamos setTimeout con un intervalo más largo para reducir la frecuencia de cambios
  useEffect(() => {
    const interval = 8000; // 8 segundos entre cambios para reducir la frecuencia aún más
    
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
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex gap-8 py-10 items-center justify-center flex-col w-full max-w-2xl">
          {/* Logo en la parte superior */}
          <div className="mb-6 flex flex-col items-center w-full">
            <img 
              src={logoImage} 
              alt="Logo Milovat" 
              className="h-24 object-contain mx-auto" 
            />
            <h1 className="text-center text-4xl font-bold mt-4 text-white milovat-text w-full">Milovat</h1>
          </div>
          
          <div className="flex gap-4 flex-col items-center w-full">
            <h1 className="text-4xl md:text-6xl tracking-tighter text-center font-regular w-full">
              <div className="gold-gradient-text milovat-text w-full text-center font-semibold">
                Una plataforma que es
              </div>
              <div className="relative flex w-full justify-center overflow-hidden text-center h-24 md:pb-4 md:pt-1">
                <AnimatePresence mode="wait">
                  {titles.map((title, index) => (
                    titleNumber === index && (
                      <motion.span
                        key={index}
                        className="absolute font-semibold gold-gradient-text mt-2 milovat-text w-full text-center text-5xl md:text-7xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ 
                          duration: 1.2,
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
          
          <div className="flex justify-center mt-8 w-full">
            <Button
              onClick={() => {
                sessionStorage.setItem('isDevelopment', 'true');
                navigate("/auth");
              }}
              className="bg-[#F5A623] text-black px-8 py-6 rounded-lg font-medium text-lg hover:bg-[#E8A826] transition-colors duration-300 mx-auto border-none"
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
