"use client"

import React, { useEffect } from "react"
import { motion } from "framer-motion"

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
              repeat: onAnimationEnd ? 0 : Infinity,
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