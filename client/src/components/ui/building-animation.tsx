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
        
        {/* Demo component en el centro del edificio */}
        <foreignObject x="70" y="200" width="160" height="200">
          <LightningDemo width={160} height={200} />
        </foreignObject>
        
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