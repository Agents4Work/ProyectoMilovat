"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface GradientTracingProps {
  width: number
  height: number
  baseColor?: string
  gradientColors?: [string, string, string]
  animationDuration?: number
  strokeWidth?: number
  path?: string
  showLightning?: boolean
  onAnimationEnd?: () => void
}

export const GradientTracing: React.FC<GradientTracingProps> = ({
  width,
  height,
  baseColor = "black",
  gradientColors = ["#F1C40F", "#F1C40F", "#F39C12"],
  animationDuration = 2,
  strokeWidth = 2,
  path = `M0,${height / 2} L${width},${height / 2}`,
  showLightning = false,
  onAnimationEnd
}) => {
  const gradientId = `pulse-${Math.random().toString(36).substr(2, 9)}`
  
  // Usar useEffect para llamar al callback después de un tiempo
  useEffect(() => {
    if (onAnimationEnd) {
      const timer = setTimeout(() => {
        onAnimationEnd();
      }, animationDuration * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [animationDuration, onAnimationEnd]);

  return (
    <div className="relative" style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
      >
        <path
          d={path}
          stroke={baseColor}
          strokeOpacity="0.2"
          strokeWidth={strokeWidth}
        />
        <path
          d={path}
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <defs>
          <motion.linearGradient
            animate={{
              x1: [0, width * 2],
              x2: [0, width],
            }}
            transition={{
              duration: animationDuration,
              repeat: 0,
              ease: "linear",
            }}
            id={gradientId}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColors[0]} stopOpacity="0" />
            <stop stopColor={gradientColors[1]} />
            <stop offset="1" stopColor={gradientColors[2]} stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  )
}

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
      }, 2000);
      
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
    <div className="relative w-full h-full">
      <svg width="300" height="600" viewBox="0 0 300 600" fill="none">
        {/* Contorno del edificio */}
        <path
          d={buildingPath}
          stroke="#333"
          strokeWidth="8"
          fill="none"
        />
        
        {/* Línea izquierda que se acerca - usando GradientTracing */}
        {showLeftLine && (
          <foreignObject x="0" y="590" width="60" height="20">
            <GradientTracing 
              width={60} 
              height={20} 
              path="M0,10 L60,10" 
              gradientColors={["#F1C40F", "#F1C40F", "#F39C12"]}
              animationDuration={2}
              onAnimationEnd={handleLeftLineComplete}
            />
          </foreignObject>
        )}
        
        {/* Línea derecha que se acerca - usando GradientTracing */}
        {showRightLine && (
          <foreignObject x="240" y="590" width="60" height="20" style={{ transform: 'scaleX(-1)' }}>
            <GradientTracing 
              width={60} 
              height={20} 
              path="M0,10 L60,10" 
              gradientColors={["#F1C40F", "#F1C40F", "#F39C12"]}
              animationDuration={2}
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
        </defs>
      </svg>
    </div>
  );
};