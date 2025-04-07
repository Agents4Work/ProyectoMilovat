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
}

export const GradientTracing: React.FC<GradientTracingProps> = ({
  width,
  height,
  baseColor = "black",
  gradientColors = ["#F1C40F", "#E67E22", "#F39C12"],
  animationDuration = 4,
  strokeWidth = 2,
  path = `M0,${height / 2} L${width},${height / 2}`,
  showLightning = false,
}) => {
  const gradientId = `pulse-${Math.random().toString(36).substr(2, 9)}`
  const [isAnimating, setIsAnimating] = useState(true);
  const [showLightningEffect, setShowLightningEffect] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (animationComplete && showLightning) {
      setShowLightningEffect(true);
      const timer = setTimeout(() => {
        setShowLightningEffect(false);
        setAnimationComplete(false);
        setIsAnimating(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [animationComplete, showLightning]);

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    setAnimationComplete(true);
  };

  return (
    <div className="relative" style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
      >
        {/* Silueta base */}
        <path
          d={path}
          stroke={baseColor}
          strokeOpacity="0.8"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Línea animada */}
        <AnimatePresence>
          {isAnimating && (
            <motion.path
              d={path}
              stroke={`url(#${gradientId})`}
              strokeLinecap="round"
              strokeWidth={strokeWidth + 1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: animationDuration,
                ease: "easeInOut",
              }}
              onAnimationComplete={handleAnimationComplete}
            />
          )}
        </AnimatePresence>

        {/* Efecto del rayo cuando termina la animación */}
        {showLightningEffect && showLightning && (
          <motion.path
            d="M100,0 L75,75 L125,75 L50,200 L100,100 L50,100 L100,0"
            stroke={gradientColors[1]}
            strokeWidth={strokeWidth + 2}
            fill="none"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}

        <defs>
          <motion.linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2={width}
            y2="0"
          >
            <stop stopColor={gradientColors[0]} stopOpacity="0" offset="0" />
            <stop stopColor={gradientColors[1]} offset="0.5" />
            <stop stopColor={gradientColors[2]} stopOpacity="0" offset="1" />
            <animate
              attributeName="x1"
              from="0"
              to={width.toString()}
              dur={animationDuration.toString()}
              repeatCount="1"
            />
            <animate
              attributeName="x2"
              from="0"
              to={width.toString()}
              dur={animationDuration.toString()}
              repeatCount="1"
            />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export const BuildingAnimation: React.FC = () => {
  // Silueta del edificio
  const buildingPath = "M60,600 L60,150 L240,150 L240,600 Z";
  
  // Caminos para las líneas que se acercan al edificio
  const approachPaths = [
    "M0,600 L60,600",
    "M20,600 L60,500",
    "M40,600 L60,400",
    "M300,600 L240,600",
    "M280,600 L240,500",
    "M260,600 L240,400",
  ];
  
  // Caminos para las líneas dentro del edificio que suben
  const internalPaths = [
    "M60,600 Q150,450 240,600",
    "M60,500 Q150,350 240,500",
    "M60,400 Q150,250 240,400",
    "M60,300 Q150,150 240,300",
  ];
  
  // Camino del rayo final
  const lightningPath = "M150,150 L130,250 L170,250 L110,450 L150,350 L120,350 L150,150";

  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [showInternal, setShowInternal] = useState(false);
  const [showLightning, setShowLightning] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (animationComplete) {
      const timer = setTimeout(() => {
        setShowLightning(false);
        setShowInternal(false);
        setCurrentPathIndex(0);
        setAnimationComplete(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [animationComplete]);

  const handleApproachComplete = () => {
    if (currentPathIndex < approachPaths.length - 1) {
      setCurrentPathIndex(prev => prev + 1);
    } else {
      setShowInternal(true);
    }
  };

  const handleInternalComplete = () => {
    setShowLightning(true);
    setTimeout(() => {
      setAnimationComplete(true);
    }, 1500);
  };

  return (
    <div className="relative w-full h-full">
      <svg width="300" height="600" viewBox="0 0 300 600" fill="none">
        {/* Silueta del edificio */}
        <path
          d={buildingPath}
          stroke="#333"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Líneas que se acercan */}
        <motion.path
          d={approachPaths[currentPathIndex]}
          stroke="url(#goldGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onAnimationComplete={handleApproachComplete}
        />
        
        {/* Líneas internas curvas */}
        {showInternal && (
          <motion.path
            d={internalPaths[0]}
            stroke="url(#goldGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            onAnimationComplete={handleInternalComplete}
          />
        )}
        
        {/* Rayo final */}
        {showLightning && (
          <motion.path
            d={lightningPath}
            stroke="#F1C40F"
            strokeWidth="4"
            fill="none"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
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