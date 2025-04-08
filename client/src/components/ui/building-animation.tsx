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
  const [showEnergyPoints, setShowEnergyPoints] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Iniciar secuencia de animación
  useEffect(() => {
    if (!animationComplete) {
      // Iniciar con líneas entrantes
      setShowLeftLine(true);
      setShowRightLine(true);
      
      // Mostrar los puntos de energía después de un tiempo
      const energyTimer = setTimeout(() => {
        setShowEnergyPoints(true);
      }, 1500);
      
      return () => clearTimeout(energyTimer);
    }
  }, [animationComplete]);

  // Reiniciar el ciclo de animación cuando se completa
  useEffect(() => {
    if (animationComplete) {
      const timer = setTimeout(() => {
        setShowLeftLine(false);
        setShowRightLine(false);
        setShowEnergyPoints(false);
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
        {/* Fondo decorativo - Círculos de energía */}
        <circle cx="150" cy="300" r="100" fill="rgba(243, 156, 18, 0.03)" />
        
        {/* Contorno del edificio */}
        <path
          d={buildingPath}
          stroke="#333"
          strokeWidth="8"
          fill="none"
        />
        
        {/* Elementos decorativos adicionales - Ventanas */}
        <g opacity="0.5">
          <rect x="80" y="180" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          <rect x="115" y="180" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          <rect x="150" y="180" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          <rect x="185" y="180" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          
          <rect x="80" y="380" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          <rect x="115" y="380" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          <rect x="150" y="380" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          <rect x="185" y="380" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          
          <rect x="80" y="430" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          <rect x="115" y="430" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          <rect x="150" y="430" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          <rect x="185" y="430" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          
          <rect x="80" y="480" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          <rect x="115" y="480" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          <rect x="150" y="480" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          <rect x="185" y="480" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          
          <rect x="80" y="530" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          <rect x="115" y="530" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          <rect x="150" y="530" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
          <rect x="185" y="530" width="20" height="30" fill="rgba(243, 156, 18, 0.1)" />
        </g>
        
        {/* Líneas de energía verticales */}
        <motion.path
          d="M100,150 L100,220"
          stroke="rgba(243, 156, 18, 0.2)"
          strokeWidth="1"
          strokeDasharray="2 4"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        
        <motion.path
          d="M200,150 L200,220"
          stroke="rgba(243, 156, 18, 0.2)"
          strokeWidth="1"
          strokeDasharray="2 4"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />
        
        {/* Puntos de energía en el edificio */}
        {showEnergyPoints && (
          <>
            <motion.circle 
              cx="75" 
              cy="200" 
              r="3" 
              fill="#F39C12" 
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            />
            <motion.circle 
              cx="225" 
              cy="200" 
              r="3" 
              fill="#F39C12" 
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.circle 
              cx="75" 
              cy="400" 
              r="3" 
              fill="#F39C12" 
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
            <motion.circle 
              cx="225" 
              cy="400" 
              r="3" 
              fill="#F39C12" 
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
          </>
        )}
        
        {/* Demo component en el centro del edificio */}
        <foreignObject x="75" y="230" width="150" height="150">
          <LightningDemo />
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
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F1C40F" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#F39C12" />
            <stop offset="100%" stopColor="#F1C40F" stopOpacity="0.2" />
          </linearGradient>
          
          <linearGradient id="rightGoldGradient" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F1C40F" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#F39C12" />
            <stop offset="100%" stopColor="#F1C40F" stopOpacity="0.2" />
          </linearGradient>
          
          <linearGradient id="boltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F1C40F" />
            <stop offset="50%" stopColor="#F39C12" />
            <stop offset="100%" stopColor="#E67E22" />
          </linearGradient>
          
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