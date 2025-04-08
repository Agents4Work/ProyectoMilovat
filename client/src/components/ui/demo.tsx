"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface LightningDemoProps {
  width?: number;
  height?: number;
}

export const LightningDemo: React.FC<LightningDemoProps> = ({
  width = 120,
  height = 120
}) => {
  const [glowIntensity, setGlowIntensity] = useState(2);
  const gradientId = `pulse-${Math.random().toString(36).substr(2, 9)}`
  const filterId = `glow-${Math.random().toString(36).substr(2, 9)}`
  
  // Escalamos el rayo para adaptarlo al contenedor
  const path = "M60,0 L45,45 L75,45 L30,120 L60,60 L30,60 L60,0"
  const gradientColors = ["#F1C40F", "#F1C40F", "#E67E22"]
  const animationDuration = 3
  const strokeWidth = 4  // Aumentamos el grosor del trazo
  const baseColor = "black"

  // Efecto de pulso para el resplandor
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => (prev === 2 ? 5 : 2));
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative" style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 120 120"  // Mantenemos el viewBox original para mantener las proporciones
        fill="none"
      >
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur 
              stdDeviation={glowIntensity} 
              result="blur" 
            />
            <feFlood floodColor="#F1C40F" floodOpacity="0.5" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
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
            id={gradientId}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColors[0]} stopOpacity="0" />
            <stop stopColor={gradientColors[1]} />
            <stop offset="1" stopColor={gradientColors[2]} stopOpacity="0" />
          </motion.linearGradient>
        </defs>
        
        {/* Trazo base del rayo */}
        <path
          d={path}
          stroke={baseColor}
          strokeOpacity="0.2"
          strokeWidth={strokeWidth}
        />
        
        {/* Trazo animado con resplandor */}
        <path
          d={path}
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          filter={`url(#${filterId})`}
        />
        
        {/* Punto de luz en el centro del rayo */}
        <motion.circle 
          cx="60" 
          cy="45" 
          r="3"
          fill="#FFF"
          filter={`url(#${filterId})`}
          animate={{
            opacity: [0.1, 1, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  )
};