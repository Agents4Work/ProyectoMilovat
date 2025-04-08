"use client"

import React from "react"
import { motion } from "framer-motion"

// Componente del edificio con contorno blanco (más ancho y moderno)
const BuildingComponent: React.FC = () => (
  <g>
    {/* Contorno principal del edificio moderno */}
    <path 
      d="M20,520 V80 H280 V520 H20 Z" 
      stroke="white" 
      strokeWidth="6" 
      fill="none"
    />
    
    {/* Sección superior con ventanas panorámicas */}
    <path 
      d="M40,120 H260 V200 H40 Z" 
      stroke="white" 
      strokeWidth="3" 
      fill="none"
    />
    
    {/* Líneas horizontales que dividen los pisos */}
    <path 
      d="M40,280 H260 M40,360 H260 M40,440 H260" 
      stroke="white" 
      strokeWidth="2" 
      fill="none"
    />
    
    {/* Ventanas modernas (rectangulares y más grandes) */}
    <path 
      d="M50,220 H100 V260 H50 V220 Z
         M120,220 H180 V260 H120 V220 Z
         M200,220 H250 V260 H200 V220 Z
         
         M50,300 H100 V340 H50 V300 Z
         M120,300 H180 V340 H120 V300 Z
         M200,300 H250 V340 H200 V300 Z
         
         M50,380 H100 V420 H50 V380 Z
         M120,380 H180 V420 H120 V380 Z
         M200,380 H250 V420 H200 V380 Z"
      stroke="white" 
      strokeWidth="3" 
      fill="none"
    />
    
    {/* Líneas verticales de las ventanas panorámicas */}
    <path 
      d="M80,120 V200
         M120,120 V200
         M160,120 V200
         M200,120 V200
         M240,120 V200"
      stroke="white" 
      strokeWidth="2" 
      fill="none"
    />
    
    {/* Entrada principal moderna */}
    <path 
      d="M90,520 V460 H210 V520" 
      stroke="white" 
      strokeWidth="4" 
      fill="none"
    />
    
    {/* Detalles de la entrada */}
    <path 
      d="M110,520 V460 
         M130,520 V460
         M150,520 V460
         M170,520 V460
         M190,520 V460"
      stroke="white" 
      strokeWidth="2" 
      fill="none"
    />
    
    {/* Entrada secundaria con detalles modernos */}
    <path 
      d="M240,520 V480 H270 V520" 
      stroke="white" 
      strokeWidth="3" 
      fill="none"
    />
    
    {/* Detalles arquitectónicos adicionales */}
    <line x1="20" y1="100" x2="280" y2="100" stroke="white" strokeWidth="3" />
    <line x1="20" y1="460" x2="280" y2="460" stroke="white" strokeWidth="3" />
  </g>
);

// Componente del Rayo con glow naranja/dorado
const LightningComponent: React.FC = () => (
  <motion.g
    animate={{ 
      opacity: [0.7, 1, 0.7],
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    filter="url(#lightningGlow)"
  >
    <path 
      d="M0,0 L-15,40 L15,40 L-10,80 L40,30 L15,30 L30,0 Z" 
      stroke="#ffcc00" 
      strokeWidth="4" 
      fill="none"
    />
  </motion.g>
);

// Componente de Gota de Agua con glow azul
const WaterDropComponent: React.FC = () => (
  <motion.g
    animate={{ 
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    filter="url(#waterGlow)"
  >
    <path 
      d="M0,0 C-15,20 -30,40 -30,55 C-30,75 -15,90 0,90 C15,90 30,75 30,55 C30,40 15,20 0,0 Z" 
      stroke="#0088ff" 
      strokeWidth="4" 
      fill="none"
    />
    <path 
      d="M10,55 C10,35 -15,40 -15,70" 
      stroke="#0088ff" 
      strokeWidth="3" 
      fill="none"
    />
  </motion.g>
);

// Componente del Tanque de Gas con glow gris
const GasTankComponent: React.FC = () => (
  <motion.g
    animate={{ 
      opacity: [0.7, 1, 0.7],
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    filter="url(#gasGlow)"
  >
    <path d="M-25,-25 H25 V-15 H35 V-5 H-35 V-15 H-25 V-25 Z" stroke="#aaaaaa" strokeWidth="4" fill="none" />
    <path d="M-35,-5 H35 C35,-5 45,15 45,35 C45,55 35,65 25,75 H-25 C-35,65 -45,55 -45,35 C-45,15 -35,-5 -35,-5 Z" 
          stroke="#aaaaaa" strokeWidth="4" fill="none" />
    <path d="M-35,75 H35 V85 H-35 V75 Z" stroke="#aaaaaa" strokeWidth="4" fill="none" />
    <path d="M-20,85 H-10 V95 H-20 V85 Z M10,85 H20 V95 H10 V85 Z" stroke="#aaaaaa" strokeWidth="4" fill="none" />
    
    {/* Gota dentro del tanque */}
    <path 
      d="M0,30 C-5,40 -10,45 -10,50 C-10,58 -5,65 0,65 C5,65 10,58 10,50 C10,45 5,40 0,30 Z" 
      stroke="#aaaaaa" 
      strokeWidth="3" 
      fill="none" 
    />
  </motion.g>
);

// Componente del Billete con glow verde
const MoneyComponent: React.FC = () => (
  <motion.g
    animate={{ 
      opacity: [0.7, 1, 0.7],
      rotate: [0, 3, 0, -3, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    filter="url(#moneyGlow)"
  >
    <rect x="-50" y="-25" width="100" height="50" rx="5" stroke="#00ff44" strokeWidth="4" fill="none" />
    <rect x="-40" y="-15" width="80" height="30" rx="3" stroke="#00ff44" strokeWidth="3" fill="none" />
    <circle cx="0" cy="0" r="12" stroke="#00ff44" strokeWidth="3" fill="none" />
    <text x="0" y="5" textAnchor="middle" fill="#00ff44" fontWeight="bold" fontSize="18">$</text>
    <text x="-30" y="-8" textAnchor="start" fill="#00ff44" fontWeight="bold" fontSize="12">1</text>
    <text x="30" y="15" textAnchor="end" fill="#00ff44" fontWeight="bold" fontSize="12">1</text>
  </motion.g>
);

// Componente principal de la animación
export const BuildingAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-full flex justify-center items-center bg-black overflow-hidden">
      <svg width="600" height="600" viewBox="0 0 600 600" fill="none">
        {/* 1. EDIFICIO BLANCO (IZQUIERDA) */}
        <BuildingComponent />
        
        {/* 2. RAYO CON CONTORNO NARANJA/DORADO GLOW (PRIMERA POSICIÓN DERECHA) */}
        <g transform="translate(390, 140)">
          <LightningComponent />
        </g>
        
        {/* 3. GOTA DE AGUA CON CONTORNO AZUL GLOW (SEGUNDA POSICIÓN) */}
        <g transform="translate(390, 260)">
          <WaterDropComponent />
        </g>
        
        {/* 4. TANQUE DE GAS CON CONTORNO GRIS GLOW (TERCERA POSICIÓN) */}
        <g transform="translate(390, 380)">
          <GasTankComponent />
        </g>
        
        {/* 5. BILLETE CON CONTORNO VERDE GLOW (CUARTA POSICIÓN) */}
        <g transform="translate(390, 500)">
          <MoneyComponent />
        </g>
        
        {/* Definiciones de filtros para los efectos glow */}
        <defs>
          {/* Filtro de resplandor azul para agua */}
          <filter id="waterGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#0088ff" floodOpacity="1" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Filtro de resplandor gris para gas */}
          <filter id="gasGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#aaaaaa" floodOpacity="1" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Filtro de resplandor verde para dinero */}
          <filter id="moneyGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="#00ff44" floodOpacity="1" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Filtro de resplandor naranja/dorado para rayo */}
          <filter id="lightningGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feFlood floodColor="#ffcc00" floodOpacity="1" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};