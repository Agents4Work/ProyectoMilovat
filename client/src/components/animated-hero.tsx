import { useEffect, useMemo, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

// Optimized with memo for better performance 
export const AnimatedHero = memo(function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const [, navigate] = useLocation();
  const titles = useMemo(
    () => ["Segura", "Confiable", "Centralizada"],
    []
  );

  // Use requestAnimationFrame for smoother animations
  useEffect(() => {
    let timeoutId: number;
    let startTime: number;
    let frameDuration = 3500; // 3.5 seconds between changes
    
    const animateTitle = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      if (elapsed >= frameDuration) {
        startTime = timestamp;
        // Update the title
        setTitleNumber(prev => 
          prev === titles.length - 1 ? 0 : prev + 1
        );
      }
      
      // Schedule the next frame
      timeoutId = requestAnimationFrame(animateTitle);
    };
    
    // Start the animation
    timeoutId = requestAnimationFrame(animateTitle);
    
    // Cleanup
    return () => cancelAnimationFrame(timeoutId);
  }, [titles.length]);

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <div className="flex gap-8 py-10 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl md:text-6xl max-w-2xl tracking-tighter text-center font-regular">
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Una plataforma que es
              </motion.span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                <AnimatePresence mode="wait">
                  {titles.map((title, index) => (
                    titleNumber === index && (
                      <motion.span
                        key={index}
                        className="absolute font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 80,
                          damping: 12,
                          mass: 1.2,
                          duration: 1.2
                        }}
                      >
                        {title}
                      </motion.span>
                    )
                  ))}
                </AnimatePresence>
              </span>
            </h1>
          </div>
          <motion.div 
            className="flex flex-row gap-3 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            <Button
              onClick={() => {
                // Store development mode flag in sessionStorage
                sessionStorage.setItem('isDevelopment', 'true');
                // Navigate to auth page using wouter's navigate function
                navigate("/auth");
              }}
              className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-6 rounded-lg font-medium text-lg"
            >
              Iniciar Sesión
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});
