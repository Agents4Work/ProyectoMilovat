"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface LightningDemoProps {
  width?: number;
  height?: number;
}

export const LightningDemo: React.FC<LightningDemoProps> = ({
  width = 150,
  height = 150
}) => {
  const [flashEffect, setFlashEffect] = useState(false);
  const mainGradientId = `pulse-${Math.random().toString(36).substr(2, 9)}`
  const secondaryGradientId = `glow-${Math.random().toString(36).substr(2, 9)}`
  
  // Rayo principal más grande y con más detalle
  const mainPath = "M75,0 L55,45 L90,45 L35,150 L70,75 L40,75 L75,0"
  const gradientColors = ["#F1C40F", "#F39C12", "#E67E22"]
  const animationDuration = 3
  const strokeWidth = 3
  const baseColor = "#222"
  
  // Rayos secundarios a los costados
  const leftRayPath = "M30,50 L20,80 L40,80 L15,120"
  const rightRayPath = "M120,50 L110,80 L130,80 L105,120"

  // Efectos de destello periódicos
  useEffect(() => {
    const flashInterval = setInterval(() => {
      setFlashEffect(true);
      setTimeout(() => setFlashEffect(false), 200);
    }, 4000);
    
    return () => clearInterval(flashInterval);
  }, []);

  return (
    <div className="relative" style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
      >
        {/* Círculo de fondo con destello */}
        <motion.circle 
          cx={width/2} 
          cy={height/2} 
          r={width/3}
          fill="rgba(243, 156, 18, 0.05)"
          initial={{ opacity: 0.1 }}
          animate={{ 
            opacity: flashEffect ? [0.1, 0.3, 0.1] : 0.1,
            r: flashEffect ? [width/3, width/2.7, width/3] : width/3
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Rayos pequeños en los costados */}
        <path
          d={leftRayPath}
          stroke={baseColor}
          strokeOpacity="0.2"
          strokeWidth={strokeWidth-1}
        />
        <path
          d={leftRayPath}
          stroke={`url(#${secondaryGradientId})`}
          strokeLinecap="round"
          strokeWidth={strokeWidth-1}
        />
        
        <path
          d={rightRayPath}
          stroke={baseColor}
          strokeOpacity="0.2"
          strokeWidth={strokeWidth-1}
        />
        <path
          d={rightRayPath}
          stroke={`url(#${secondaryGradientId})`}
          strokeLinecap="round"
          strokeWidth={strokeWidth-1}
        />
        
        {/* Rayo principal */}
        <path
          d={mainPath}
          stroke={baseColor}
          strokeOpacity="0.2"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
        <motion.path
          d={mainPath}
          stroke={`url(#${mainGradientId})`}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          filter={flashEffect ? "drop-shadow(0 0 8px rgba(243, 156, 18, 0.7))" : "none"}
          animate={{ 
            strokeWidth: flashEffect ? [strokeWidth, strokeWidth+1, strokeWidth] : strokeWidth 
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Puntos de energía en los nodos del rayo principal */}
        {flashEffect && (
          <>
            <circle cx={75} cy={0} r={2} fill="#F1C40F" />
            <circle cx={55} cy={45} r={2} fill="#F1C40F" />
            <circle cx={90} cy={45} r={2} fill="#F1C40F" />
            <circle cx={40} cy={75} r={2} fill="#F1C40F" />
            <circle cx={70} cy={75} r={2} fill="#F1C40F" />
            <circle cx={35} cy={150} r={2} fill="#F1C40F" />
          </>
        )}
        
        <defs>
          {/* Gradiente para el rayo principal */}
          <motion.linearGradient
            animate={{
              x1: [0, width * 2],
              x2: [0, width],
            }}
            transition={{
              duration: animationDuration,
              repeat: Infinity,
              ease: "linear",
            }}
            id={mainGradientId}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColors[0]} stopOpacity="0" />
            <stop stopColor={gradientColors[1]} />
            <stop offset="1" stopColor={gradientColors[2]} stopOpacity="0" />
          </motion.linearGradient>
          
          {/* Gradiente para los rayos secundarios */}
          <motion.linearGradient
            animate={{
              x1: [0, width * 2],
              x2: [0, width],
            }}
            transition={{
              duration: animationDuration * 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            id={secondaryGradientId}
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
};