"use client"

import React from "react"
import { motion } from "framer-motion"

// Componente del edificio con contorno blanco (más ancho y moderno)
const BuildingComponent: React.FC = () => (
  <g transform="scale(0.8)">
    {/* Contorno principal del edificio moderno - Mucho más amplio */}
    <path 
      d="M20,580 V20 H350 V580 H20 Z" 
      stroke="white" 
      strokeWidth="6" 
      fill="none"
    />
    
    {/* Sección superior con ventanas panorámicas */}
    <path 
      d="M40,50 H330 V120 H40 Z" 
      stroke="white" 
      strokeWidth="4" 
      fill="none"
    />
    
    {/* Líneas horizontales que dividen los pisos */}
    <path 
      d="M40,200 H330 M40,280 H330 M40,360 H330 M40,440 H330" 
      stroke="white" 
      strokeWidth="3" 
      fill="none"
    />
    
    {/* Ventanas modernas (rectangulares y más grandes) */}
    <path 
      d="M60,130 H140 V190 H60 V130 Z
         M160,130 H240 V190 H160 V130 Z
         M260,130 H320 V190 H260 V130 Z
         
         M60,210 H140 V270 H60 V210 Z
         M160,210 H240 V270 H160 V210 Z
         M260,210 H320 V270 H260 V210 Z
         
         M60,290 H140 V350 H60 V290 Z
         M160,290 H240 V350 H160 V290 Z
         M260,290 H320 V350 H260 V290 Z
         
         M60,370 H140 V430 H60 V370 Z
         M160,370 H240 V430 H160 V370 Z
         M260,370 H320 V430 H260 V370 Z"
      stroke="white" 
      strokeWidth="4" 
      fill="none"
    />
    
    {/* Líneas verticales de las ventanas panorámicas */}
    <path 
      d="M70,50 V120
         M110,50 V120
         M150,50 V120
         M190,50 V120
         M230,50 V120
         M270,50 V120
         M310,50 V120"
      stroke="white" 
      strokeWidth="3" 
      fill="none"
    />
    
    {/* Entrada principal moderna */}
    <path 
      d="M100,580 V480 H270 V580" 
      stroke="white" 
      strokeWidth="5" 
      fill="none"
    />
    
    {/* Detalles de la entrada */}
    <path 
      d="M120,580 V480 
         M140,580 V480
         M160,580 V480
         M180,580 V480
         M200,580 V480
         M220,580 V480
         M240,580 V480"
      stroke="white" 
      strokeWidth="3" 
      fill="none"
    />
    
    {/* Entrada secundaria con detalles modernos */}
    <path 
      d="M290,580 V510 H335 V580" 
      stroke="white" 
      strokeWidth="4" 
      fill="none"
    />
    
    {/* Detalles arquitectónicos adicionales */}
    <line x1="20" y1="50" x2="350" y2="50" stroke="white" strokeWidth="4" />
    <line x1="20" y1="480" x2="350" y2="480" stroke="white" strokeWidth="4" />
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
    {/* Reducido el tamaño del tanque de gas */}
    <path d="M-20,-20 H20 V-12 H28 V-4 H-28 V-12 H-20 V-20 Z" stroke="#aaaaaa" strokeWidth="4" fill="none" />
    <path d="M-28,-4 H28 C28,-4 36,12 36,28 C36,44 28,52 20,60 H-20 C-28,52 -36,44 -36,28 C-36,12 -28,-4 -28,-4 Z" 
          stroke="#aaaaaa" strokeWidth="4" fill="none" />
    <path d="M-28,60 H28 V68 H-28 V60 Z" stroke="#aaaaaa" strokeWidth="4" fill="none" />
    <path d="M-16,68 H-8 V76 H-16 V68 Z M8,68 H16 V76 H8 V68 Z" stroke="#aaaaaa" strokeWidth="4" fill="none" />
    
    {/* Gota dentro del tanque */}
    <path 
      d="M0,24 C-4,32 -8,36 -8,40 C-8,46 -4,52 0,52 C4,52 8,46 8,40 C8,36 4,32 0,24 Z" 
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
      <svg width="550" height="600" viewBox="0 0 550 600" fill="none" className="mr-0">
        {/* 1. EDIFICIO BLANCO (IZQUIERDA) */}
        <g transform="translate(70, 0)">
          <BuildingComponent />
        </g>
        
        {/* 2. RAYO CON CONTORNO NARANJA/DORADO GLOW (PRIMERA POSICIÓN DERECHA) */}
        <g transform="translate(420, 100)">
          <LightningComponent />
        </g>
        
        {/* 3. GOTA DE AGUA CON CONTORNO AZUL GLOW (SEGUNDA POSICIÓN) */}
        <g transform="translate(420, 230)">
          <WaterDropComponent />
        </g>
        
        {/* 4. TANQUE DE GAS CON CONTORNO GRIS GLOW (TERCERA POSICIÓN) */}
        <g transform="translate(420, 360)">
          <GasTankComponent />
        </g>
        
        {/* 5. BILLETE CON CONTORNO VERDE GLOW (CUARTA POSICIÓN) */}
        <g transform="translate(420, 490)">
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