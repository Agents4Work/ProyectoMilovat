"use client"

import React from "react"
import { motion } from "framer-motion"

// Componente del edificio con contorno blanco
const BuildingComponent: React.FC = () => (
  <g>
    {/* Contorno del edificio principal con grosor aumentado */}
    <path 
      d="M40,500 V100 H200 V500 H40 Z" 
      stroke="white" 
      strokeWidth="5" 
      fill="none"
    />
    
    {/* Ventanas del edificio (5 filas de 3 ventanas) */}
    <path 
      d="M70,130 H90 V160 H70 V130 Z
         M120,130 H140 V160 H120 V130 Z
         M170,130 H190 V160 H170 V130 Z
         
         M70,180 H90 V210 H70 V180 Z
         M120,180 H140 V210 H120 V180 Z
         M170,180 H190 V210 H170 V180 Z
         
         M70,230 H90 V260 H70 V230 Z
         M120,230 H140 V260 H120 V230 Z
         M170,230 H190 V260 H170 V230 Z
         
         M70,280 H90 V310 H70 V280 Z
         M120,280 H140 V310 H120 V280 Z
         M170,280 H190 V310 H170 V280 Z
         
         M70,330 H90 V360 H70 V330 Z
         M120,330 H140 V360 H120 V330 Z
         M170,330 H190 V360 H170 V330 Z"
      stroke="white" 
      strokeWidth="3" 
      fill="none"
    />
    
    {/* Entrada del edificio */}
    <path 
      d="M90,500 V440 H150 V500" 
      stroke="white" 
      strokeWidth="3" 
      fill="none"
    />
    
    {/* Líneas verticales en la entrada */}
    <path 
      d="M100,500 V440
         M110,500 V440
         M120,500 V440
         M130,500 V440
         M140,500 V440"
      stroke="white" 
      strokeWidth="2" 
      fill="none"
    />
    
    {/* Puerta pequeña */}
    <path 
      d="M180,500 V460 H200 V500" 
      stroke="white" 
      strokeWidth="3" 
      fill="none"
    />
  </g>
);

// Componente del Rayo con glow naranja/dorado
const LightningComponent: React.FC = () => (
  <motion.g
    animate={{ 
      opacity: [0.7, 1, 0.7],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    filter="url(#lightningGlow)"
  >
    <path 
      d="M0,0 L-10,30 L10,30 L-5,60 L30,25 L10,25 L20,0 Z" 
      stroke="#ffcc00" 
      strokeWidth="3" 
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
      d="M0,0 C-10,15 -20,30 -20,40 C-20,55 -10,65 0,65 C10,65 20,55 20,40 C20,30 10,15 0,0 Z" 
      stroke="#0088ff" 
      strokeWidth="3" 
      fill="none"
    />
    <path 
      d="M5,40 C5,25 -10,30 -10,50" 
      stroke="#0088ff" 
      strokeWidth="2" 
      fill="none"
    />
  </motion.g>
);

// Componente del Tanque de Gas con glow gris
const GasTankComponent: React.FC = () => (
  <motion.g
    animate={{ 
      opacity: [0.7, 1, 0.7],
    }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    filter="url(#gasGlow)"
  >
    <path d="M-15,-15 H15 V-10 H20 V-5 H-20 V-10 H-15 V-15 Z" stroke="#aaaaaa" strokeWidth="3" fill="none" />
    <path d="M-20,-5 H20 C20,-5 25,5 25,15 C25,30 20,35 15,40 H-15 C-20,35 -25,30 -25,15 C-25,5 -20,-5 -20,-5 Z" 
          stroke="#aaaaaa" strokeWidth="3" fill="none" />
    <path d="M-20,40 H20 V45 H-20 V40 Z" stroke="#aaaaaa" strokeWidth="3" fill="none" />
    <path d="M-10,45 H-5 V50 H-10 V45 Z M5,45 H10 V50 H5 V45 Z" stroke="#aaaaaa" strokeWidth="3" fill="none" />
    
    {/* Gota dentro del tanque */}
    <path 
      d="M0,15 C-2,20 -4,25 -4,27 C-4,30 -2,32 0,32 C2,32 4,30 4,27 C4,25 2,20 0,15 Z" 
      stroke="#aaaaaa" 
      strokeWidth="2" 
      fill="none" 
    />
  </motion.g>
);

// Componente del Billete con glow verde
const MoneyComponent: React.FC = () => (
  <motion.g
    animate={{ 
      opacity: [0.7, 1, 0.7],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    filter="url(#moneyGlow)"
  >
    <rect x="-30" y="-15" width="60" height="30" rx="3" stroke="#00ff44" strokeWidth="3" fill="none" />
    <rect x="-25" y="-10" width="50" height="20" rx="2" stroke="#00ff44" strokeWidth="2" fill="none" />
    <circle cx="0" cy="0" r="8" stroke="#00ff44" strokeWidth="2" fill="none" />
    <text x="0" y="4" textAnchor="middle" fill="#00ff44" fontWeight="bold" fontSize="12">$</text>
    <text x="-20" y="-5" textAnchor="start" fill="#00ff44" fontWeight="bold" fontSize="8">1</text>
    <text x="20" y="10" textAnchor="end" fill="#00ff44" fontWeight="bold" fontSize="8">1</text>
  </motion.g>
);

// Componente principal de la animación
export const BuildingAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-full flex justify-center items-center bg-black overflow-hidden">
      <svg width="500" height="600" viewBox="0 0 500 600" fill="none">
        {/* 1. EDIFICIO BLANCO (IZQUIERDA) */}
        <BuildingComponent />
        
        {/* 2. RAYO CON CONTORNO NARANJA/DORADO GLOW (PRIMERA POSICIÓN DERECHA) */}
        <g transform="translate(330, 140)">
          <LightningComponent />
        </g>
        
        {/* 3. GOTA DE AGUA CON CONTORNO AZUL GLOW (SEGUNDA POSICIÓN) */}
        <g transform="translate(330, 260)">
          <WaterDropComponent />
        </g>
        
        {/* 4. TANQUE DE GAS CON CONTORNO GRIS GLOW (TERCERA POSICIÓN) */}
        <g transform="translate(330, 380)">
          <GasTankComponent />
        </g>
        
        {/* 5. BILLETE CON CONTORNO VERDE GLOW (CUARTA POSICIÓN) */}
        <g transform="translate(330, 500)">
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