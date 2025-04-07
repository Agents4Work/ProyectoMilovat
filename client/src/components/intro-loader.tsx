import { useEffect, useState, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { BuildingSilhouette } from "@/components/ui/building-silhouette";
import logoImage from "@assets/Logo-Milotav-Positivo1-2022.png";

// Declaramos window.introCompleted y window.forceSkipIntro para el TS
declare global {
  interface Window {
    introCompleted?: boolean;
    forceSkipIntro?: boolean;
  }
}

// Componente optimizado con memo
const IntroLoader = memo(function IntroLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [typedText, setTypedText] = useState("");
  const finalText = "Toda la información de tu departamento\nen una sola plataforma";
  const startTimeRef = useRef(Date.now());
  const typingCompleteRef = useRef(false);
  
  // Velocidad de escritura por carácter (ligeramente más lenta para que coincida con los 4.5 segundos)
  const charSpeed = 40; // ms
  
  // Tiempo total mínimo 
  const totalMinTime = 4500; // ms (4.5 segundos)
  
  // Función para omitir la animación
  const skipAnimation = () => {
    setIsVisible(false);
    window.introCompleted = true;
  };
  
  // Efecto optimizado para la animación
  useEffect(() => {
    // Si ya completamos la intro o la estamos forzando a omitir, salimos inmediatamente
    if (window.introCompleted || window.forceSkipIntro) {
      setIsVisible(false);
      window.introCompleted = true;
      return;
    }
    
    // Guardamos el tiempo de inicio
    startTimeRef.current = Date.now();
    
    // Función de escritura optimizada con requestAnimationFrame para mejor rendimiento
    let charIndex = 0;
    let lastFrameTime = 0;
    
    const animateTyping = (currentTime: number) => {
      if (!isVisible) return;
      
      if (!lastFrameTime) lastFrameTime = currentTime;
      
      // Calculamos cuánto tiempo ha pasado desde el último frame
      const deltaTime = currentTime - lastFrameTime;
      
      // Si ha pasado suficiente tiempo, actualizamos el texto
      if (deltaTime >= charSpeed) {
        lastFrameTime = currentTime;
        
        // Actualizamos el texto mostrado
        setTypedText(finalText.substring(0, charIndex));
        charIndex++;
        
        // Si hemos terminado de escribir, lo marcamos
        if (charIndex > finalText.length) {
          typingCompleteRef.current = true;
          
          // Calculamos cuánto tiempo ha pasado desde el inicio
          const elapsedSoFar = Date.now() - startTimeRef.current;
          
          // Calculamos cuánto tiempo adicional necesitamos esperar
          const remainingTime = Math.max(300, totalMinTime - elapsedSoFar);
          
          // Timeout final para ocultar después del tiempo calculado
          setTimeout(() => {
            setIsVisible(false);
            window.introCompleted = true;
          }, remainingTime);
          
          return;
        }
      }
      
      // Si no hemos terminado, seguimos animando
      if (!typingCompleteRef.current) {
        requestAnimationFrame(animateTyping);
      }
    };
    
    // Iniciamos la animación con requestAnimationFrame
    const animationId = requestAnimationFrame(animateTyping);
    
    // Limpieza
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A] overflow-hidden cursor-pointer"
      onClick={skipAnimation}  // Permite hacer clic en cualquier lugar para saltar
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Silueta de edificios en el fondo con animación mejorada */}
      <motion.div 
        className="absolute bottom-0 w-full h-80 md:h-96 overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="w-full opacity-40">
          <BuildingSilhouette className="w-full h-full text-gray-300" />
        </div>
      </motion.div>
      
      <motion.div 
        className="text-center z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mb-8 flex flex-col items-center">
          <motion.img 
            src={logoImage} 
            alt="Milovat Logo" 
            className="h-36 md:h-44 lg:h-48 mb-4" 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <motion.h2 
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span
              className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600"
              )}
            >
              Milovat
            </span>
          </motion.h2>
        </div>
        
        <div className="text-xl sm:text-2xl md:text-3xl text-white/80 mb-6 leading-relaxed font-light tracking-wide max-w-3xl mx-auto px-4 min-h-[6rem]">
          <span className="inline-block whitespace-pre-line">{typedText}</span>
          <motion.span 
            className="inline-block ml-1 bg-white/80 w-[2px] h-[1em]"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>


        
        <motion.div 
          className="h-px w-72 mx-auto bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 my-8"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "18rem", opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        />
        
        {/* Botón para saltar con animación */}
        <motion.button 
          className="mt-4 px-6 py-2 bg-amber-600/20 text-amber-400 hover:bg-amber-600/30 transition-colors rounded-md text-sm font-medium"
          onClick={skipAnimation}
          aria-label="Saltar animación de introducción"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          Saltar
        </motion.button>
      </motion.div>
    </motion.div>
  );
});

export default IntroLoader;