"use client"

import React from "react"
import { motion } from "framer-motion"

// Componente del Rayo con glow naranja/dorado
const LightningIcon: React.FC = () => (
  <motion.path 
    d="M0,0 L-10,25 L5,25 L-5,50 L25,20 L10,20 L20,0 Z"
    stroke="#FFA500"
    strokeWidth="2"
    fill="none"
    animate={{ 
      opacity: [0.7, 1, 0.7],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    filter="url(#lightningGlow)"
  />
);

// Componente de Gota de Agua con glow azul
const WaterDropIcon: React.FC = () => (
  <motion.path 
    d="M0,0 C-5,10 -10,20 -10,28 C-10,38 -5,45 0,45 C5,45 10,38 10,28 C10,20 5,10 0,0 Z"
    stroke="#0088ff"
    strokeWidth="2"
    fill="none"
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
  />
);

// Componente del Tanque de Gas con glow gris
const GasTankIcon: React.FC = () => (
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
    <path 
      d="M-15,-15 H15 V-10 H20 V-5 H-20 V-10 H-15 V-15 Z" 
      stroke="#aaaaaa" 
      strokeWidth="2" 
      fill="none" 
    />
    <path 
      d="M-20,-5 H20 C20,-5 25,5 25,15 C25,25 20,30 15,35 H-15 C-20,30 -25,25 -25,15 C-25,5 -20,-5 -20,-5 Z" 
      stroke="#aaaaaa" 
      strokeWidth="2" 
      fill="none" 
    />
    <path 
      d="M-20,35 H20 V40 H-20 V35 Z" 
      stroke="#aaaaaa" 
      strokeWidth="2" 
      fill="none" 
    />
    <path 
      d="M-10,40 H-5 V45 H-10 V40 Z M5,40 H10 V45 H5 V40 Z" 
      stroke="#aaaaaa" 
      strokeWidth="2" 
      fill="none" 
    />
    <path 
      d="M0,15 C-2.5,20 -5,25 -5,27 C-5,30 -2.5,32 0,32 C2.5,32 5,30 5,27 C5,25 2.5,20 0,15 Z" 
      stroke="#aaaaaa" 
      strokeWidth="1.5" 
      fill="none" 
    />
  </motion.g>
);

// Componente del Billete con glow verde
const MoneyIcon: React.FC = () => (
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
    <rect x="-30" y="-15" width="60" height="30" rx="3" stroke="#00ff44" strokeWidth="2" fill="none" />
    <rect x="-25" y="-10" width="50" height="20" rx="2" stroke="#00ff44" strokeWidth="1" fill="none" />
    <circle cx="0" cy="0" r="8" stroke="#00ff44" strokeWidth="1.5" fill="none" />
    <text x="0" y="4" textAnchor="middle" fill="#00ff44" fontWeight="bold" fontSize="10">$</text>
    <text x="-20" y="-5" textAnchor="start" fill="#00ff44" fontWeight="bold" fontSize="6">1</text>
    <text x="20" y="10" textAnchor="end" fill="#00ff44" fontWeight="bold" fontSize="6">1</text>
  </motion.g>
);

// Componente principal de la animación
export const BuildingAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-full flex justify-center items-center bg-black">
      <svg width="300" height="600" viewBox="-150 -300 300 600" fill="none">
        {/* EDIFICIO BLANCO (centrado en el origen) */}
        <g>
          {/* Contorno del edificio principal */}
          <path 
            d="M-80,150 V-150 H80 V150 H-80 Z" 
            stroke="white" 
            strokeWidth="3" 
            fill="none"
          />
          
          {/* Ventanas (4x4 grid) */}
          <path 
            d="M-60,-130 H-40 V-110 H-60 V-130 Z
               M-20,-130 H0 V-110 H-20 V-130 Z
               M20,-130 H40 V-110 H20 V-130 Z
               M60,-130 H40 V-110 H60 V-130 Z
               
               M-60,-90 H-40 V-70 H-60 V-90 Z
               M-20,-90 H0 V-70 H-20 V-90 Z
               M20,-90 H40 V-70 H20 V-90 Z
               M60,-90 H40 V-70 H60 V-90 Z
               
               M-60,-50 H-40 V-30 H-60 V-50 Z
               M-20,-50 H0 V-30 H-20 V-50 Z
               M20,-50 H40 V-30 H20 V-50 Z
               M60,-50 H40 V-30 H60 V-50 Z
               
               M-60,-10 H-40 V10 H-60 V-10 Z
               M-20,-10 H0 V10 H-20 V-10 Z
               M20,-10 H40 V10 H20 V-10 Z
               M60,-10 H40 V10 H60 V-10 Z"
            stroke="white" 
            strokeWidth="2" 
            fill="none"
          />
          
          {/* Entrada con líneas verticales */}
          <path 
            d="M-40,150 V110 H40 V150 M-40,110 V150 M-30,110 V150 M-20,110 V150 M-10,110 V150 M0,110 V150 M10,110 V150 M20,110 V150 M30,110 V150" 
            stroke="white" 
            strokeWidth="2" 
            fill="none"
          />
          
          {/* Puerta pequeña */}
          <path 
            d="M65,150 V130 H80 V150" 
            stroke="white" 
            strokeWidth="2" 
            fill="none"
          />
        </g>
        
        {/* ICONOS CON EFECTOS GLOW (posicionados alrededor del edificio) */}
        
        {/* Rayo (parte superior izquierda) */}
        <g transform="translate(-60, -220)">
          <LightningIcon />
        </g>
        
        {/* Billete (parte superior) con efecto 'flotante' */}
        <g transform="translate(40, -220)">
          <MoneyIcon />
        </g>
        
        {/* Gota de agua (esquina) */}
        <g transform="translate(-90, -170)">
          <WaterDropIcon />
        </g>
        
        {/* Tanque de gas (sobre el edificio) */}
        <g transform="translate(0, -80)">
          <GasTankIcon />
        </g>
        
        {/* Definiciones de filtros para los efectos glow */}
        <defs>
          {/* Filtro de resplandor azul para agua */}
          <filter id="waterGlow" x="-300%" y="-300%" width="600%" height="600%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#0088ff" floodOpacity="0.9" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Filtro de resplandor gris para gas */}
          <filter id="gasGlow" x="-300%" y="-300%" width="600%" height="600%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#aaaaaa" floodOpacity="0.8" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Filtro de resplandor verde para dinero */}
          <filter id="moneyGlow" x="-300%" y="-300%" width="600%" height="600%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="#00ff44" floodOpacity="1" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Filtro de resplandor naranja/dorado para rayo */}
          <filter id="lightningGlow" x="-300%" y="-300%" width="600%" height="600%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feFlood floodColor="#FFA500" floodOpacity="1" result="color" />
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