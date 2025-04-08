"use client"

import React from "react"
import { motion } from "framer-motion"

interface LightningDemoProps {
  width?: number;
  height?: number;
}

export const LightningDemo: React.FC<LightningDemoProps> = ({
  width = 120,
  height = 120
}) => {
  const gradientId = `pulse-${Math.random().toString(36).substr(2, 9)}`
  const path = "M60,0 L45,45 L75,45 L30,120 L60,60 L30,60 L60,0"
  const gradientColors = ["#F1C40F", "#F1C40F", "#E67E22"]
  const animationDuration = 3
  const strokeWidth = 2
  const baseColor = "black"

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
      </svg>
    </div>
  )
};