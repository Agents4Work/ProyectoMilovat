"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { GradientTracing } from "./gradient-tracing"
import { LightningDemo } from "./demo"

export const BuildingAnimation: React.FC = () => {
  // Contorno del edificio (sin la línea de abajo)
  const buildingPath = "M60,600 L60,150 L240,150 L240,600";
  
  const [showLeftLine, setShowLeftLine] = useState(false);
  const [showRightLine, setShowRightLine] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Iniciar secuencia de animación
  useEffect(() => {
    if (!animationComplete) {
      // Iniciar con líneas entrantes
      setShowLeftLine(true);
      setShowRightLine(true);
    }
  }, [animationComplete]);

  // Reiniciar el ciclo de animación cuando se completa
  useEffect(() => {
    if (animationComplete) {
      const timer = setTimeout(() => {
        setShowLeftLine(false);
        setShowRightLine(false);
        setAnimationComplete(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [animationComplete]);

  // Gestionar la secuencia de animación
  const handleLeftLineComplete = () => {
    setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
  };

  const handleRightLineComplete = () => {
    // No necesitamos hacer nada aquí, ya que estamos simplificando la animación
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <svg width="300" height="600" viewBox="0 0 300 600" fill="none">
        {/* Fondo del edificio con gradiente */}
        <path
          d={buildingPath}
          fill="url(#buildingBgGradient)"
          fillOpacity="0.15"
        />
        
        {/* Contorno del edificio con resplandor dorado */}
        <path
          d={buildingPath}
          stroke="#333"
          strokeWidth="8"
          fill="none"
          filter="url(#buildingGlow)"
        />
        <path
          d={buildingPath}
          stroke="url(#buildingGradient)"
          strokeWidth="2"
          strokeOpacity="0.8"
          fill="none"
        />
        
        {/* Demo component arriba del edificio */}
        <foreignObject x="70" y="160" width="160" height="200">
          <LightningDemo width={160} height={200} />
        </foreignObject>
        
        {/* Iconos de servicios con efecto glow */}
        {/* Agua con brillo azul (izquierda) */}
        <motion.g 
          filter="url(#waterGlow)" 
          transform="translate(90, 380)"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path 
            d="M20,0 C10,15 0,30 0,40 C0,51 9,60 20,60 C31,60 40,51 40,40 C40,30 30,15 20,0 Z"
            stroke="black" 
            strokeWidth="3" 
            fill="none" />
          <motion.path 
            d="M28,40 C28,25 15,28 15,45" 
            stroke="black" 
            strokeWidth="2" 
            fill="none"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.g>
        
        {/* Gas con brillo blanco (centro) */}
        <motion.g 
          filter="url(#gasGlow)" 
          transform="translate(130, 380)"
          animate={{ 
            scale: [1, 1.05, 1],
            y: [0, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <path d="M25,0 H35 V5 H40 V10 H20 V5 H25 V0 Z" stroke="black" strokeWidth="3" fill="none" />
          <path d="M10,10 H50 C50,10 60,20 60,30 C60,45 50,50 45,60 H15 C10,50 0,45 0,30 C0,20 10,10 10,10 Z" 
                stroke="black" strokeWidth="3" fill="none" />
          <path d="M10,60 H50 V65 H10 V60 Z" stroke="black" strokeWidth="3" fill="none" />
          <path d="M20,65 H25 V70 H20 V65 Z M35,65 H40 V70 H35 V65 Z" stroke="black" strokeWidth="3" fill="none" />
          {/* Animación de llama */}
          <motion.path 
            d="M30,35 L25,30 L35,30 L30,35 Z" 
            stroke="black" 
            strokeWidth="2" 
            fill="none"
            animate={{ 
              y: [0, -3, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.g>
        
        {/* Dinero con brillo verde (derecha) */}
        <motion.g 
          filter="url(#moneyGlow)" 
          transform="translate(180, 380)"
          animate={{ 
            rotate: [0, 5, 0, -5, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <rect x="0" y="0" width="60" height="40" rx="5" stroke="black" strokeWidth="3" fill="none" />
          <rect x="5" y="5" width="50" height="30" rx="2" stroke="black" strokeWidth="1.5" fill="none" />
          <circle cx="30" cy="20" r="12" stroke="black" strokeWidth="2" fill="none" />
          <text x="30" y="25" textAnchor="middle" fill="black" fontWeight="bold" fontSize="18">$</text>
          <text x="8" y="15" textAnchor="start" fill="black" fontWeight="bold" fontSize="10">1</text>
          <text x="52" y="35" textAnchor="start" fill="black" fontWeight="bold" fontSize="10">1</text>
        </motion.g>
        
        {/* Línea izquierda que se acerca - usando una motion.path directa */}
        {showLeftLine && (
          <motion.path
            d="M0,600 L60,600"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "linear" }}
            onAnimationComplete={handleLeftLineComplete}
          />
        )}
        
        {/* Línea derecha que se acerca - usando una motion.path directa con gradiente invertido */}
        {showRightLine && (
          <foreignObject x="240" y="590" width="60" height="20" style={{ transform: 'scaleX(-1)' }}>
            <GradientTracing 
              width={60} 
              height={20} 
              path="M0,10 L60,10" 
              gradientColors={["#F1C40F", "#F1C40F", "#F39C12"]}
              animationDuration={3}
              onAnimationEnd={handleRightLineComplete}
            />
          </foreignObject>
        )}
        
        {/* Definiciones de gradientes */}
        <defs>
          {/* Gradiente dorado para línea izquierda */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F1C40F" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#F39C12" />
            <stop offset="100%" stopColor="#F1C40F" stopOpacity="0.2" />
          </linearGradient>
          
          {/* Gradiente dorado invertido para línea derecha */}
          <linearGradient id="rightGoldGradient" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F1C40F" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#F39C12" />
            <stop offset="100%" stopColor="#F1C40F" stopOpacity="0.2" />
          </linearGradient>
          
          {/* Gradiente para el fondo del edificio */}
          <linearGradient id="buildingBgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="50%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          
          {/* Gradiente para el contorno del edificio */}
          <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F1C40F" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#F39C12" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E67E22" stopOpacity="0.7" />
          </linearGradient>
          
          {/* Filtro de resplandor para el edificio */}
          <filter id="buildingGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feFlood floodColor="#F1C40F" floodOpacity="0.2" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Filtro de resplandor azul para agua */}
          <filter id="waterGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#0088ff" floodOpacity="0.8" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Filtro de resplandor blanco para gas */}
          <filter id="gasGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#ffffff" floodOpacity="0.8" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Filtro de resplandor verde para dinero */}
          <filter id="moneyGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#00ff44" floodOpacity="0.8" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Gradiente para el rayo */}
          <linearGradient id="boltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F1C40F" />
            <stop offset="50%" stopColor="#F39C12" />
            <stop offset="100%" stopColor="#E67E22" />
          </linearGradient>
          
          {/* Gradiente animado */}
          <motion.linearGradient
            animate={{
              x1: [0, 400],
              x2: [0, 200],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "linear",
            }}
            id="rayoGradient"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F1C40F" stopOpacity="0" />
            <stop stopColor="#F1C40F" />
            <stop offset="1" stopColor="#E67E22" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  );
};