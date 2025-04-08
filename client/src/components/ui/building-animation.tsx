"use client"

import React from "react"
import { motion } from "framer-motion"

export const BuildingAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-full flex justify-center items-center bg-black">
      <svg width="850" height="600" viewBox="0 0 850 600" fill="none">
        {/* EDIFICIO BLANCO EN LADO IZQUIERDO */}
        <g>
          {/* Contorno del edificio principal */}
          <path 
            d="M50,500 V100 H250 V500 H50 Z" 
            stroke="white" 
            strokeWidth="5" 
            fill="none"
          />
          
          {/* Ventanas del edificio (5 filas de 3 ventanas) */}
          <path 
            d="M80,130 H100 V160 H80 V130 Z
               M140,130 H160 V160 H140 V130 Z
               M200,130 H220 V160 H200 V130 Z
               
               M80,180 H100 V210 H80 V180 Z
               M140,180 H160 V210 H140 V180 Z
               M200,180 H220 V210 H200 V180 Z
               
               M80,230 H100 V260 H80 V230 Z
               M140,230 H160 V260 H140 V230 Z
               M200,230 H220 V260 H200 V230 Z
               
               M80,280 H100 V310 H80 V280 Z
               M140,280 H160 V310 H140 V280 Z
               M200,280 H220 V310 H200 V280 Z
               
               M80,330 H100 V360 H80 V330 Z
               M140,330 H160 V360 H140 V330 Z
               M200,330 H220 V360 H200 V330 Z"
            stroke="white" 
            strokeWidth="3" 
            fill="none"
          />
          
          {/* Entrada del edificio */}
          <path 
            d="M110,500 V440 H190 V500" 
            stroke="white" 
            strokeWidth="3" 
            fill="none"
          />
          
          {/* Líneas verticales en la entrada */}
          <path 
            d="M120,500 V440
               M130,500 V440
               M140,500 V440
               M150,500 V440
               M160,500 V440
               M170,500 V440
               M180,500 V440"
            stroke="white" 
            strokeWidth="2" 
            fill="none"
          />
          
          {/* Puerta pequeña */}
          <path 
            d="M240,500 V470 H270 V500" 
            stroke="white" 
            strokeWidth="3" 
            fill="none"
          />
        </g>
        
        {/* RAYO CON CONTORNO NARANJA/DORADO CON GLOW */}
        <motion.g 
          filter="url(#lightningGlow)" 
          transform="translate(500, 120)"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path 
            d="M20,0 L0,60 L30,60 L10,120 L80,50 L40,50 L60,0 Z" 
            stroke="#FFA500" 
            strokeWidth="4" 
            fill="none"
          />
        </motion.g>
        
        {/* GOTA DE AGUA CON CONTORNO AZUL CON GLOW */}
        <motion.g 
          filter="url(#waterGlow)" 
          transform="translate(500, 250)"
          animate={{ 
            scale: [1, 1.15, 1],
            y: [0, -5, 0],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path 
            d="M40,0 C20,30 0,60 0,80 C0,102 18,120 40,120 C62,120 80,102 80,80 C80,60 60,30 40,0 Z" 
            stroke="#0088ff" 
            strokeWidth="4" 
            fill="none"
          />
          <path 
            d="M56,80 C56,50 30,56 30,90" 
            stroke="#0088ff" 
            strokeWidth="3" 
            fill="none"
          />
        </motion.g>
        
        {/* TANQUE DE GAS CON CONTORNO GRIS CON GLOW */}
        <motion.g 
          filter="url(#gasGlow)" 
          transform="translate(490, 380)"
          animate={{ 
            scale: [1, 1.08, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7
          }}
        >
          <path d="M30,0 H70 V10 H80 V20 H20 V10 H30 V0 Z" stroke="#aaaaaa" strokeWidth="4" fill="none" />
          <path d="M20,20 H80 C80,20 100,40 100,60 C100,90 80,100 70,120 H30 C20,100 0,90 0,60 C0,40 20,20 20,20 Z" 
                stroke="#aaaaaa" strokeWidth="4" fill="none" />
          <path d="M20,120 H80 V130 H20 V120 Z" stroke="#aaaaaa" strokeWidth="4" fill="none" />
          <path d="M30,130 H40 V140 H30 V130 Z M60,130 H70 V140 H60 V130 Z" stroke="#aaaaaa" strokeWidth="4" fill="none" />
          
          {/* Gota dentro del tanque */}
          <path 
            d="M50,50 C45,60 40,70 40,75 C40,83 45,90 50,90 C55,90 60,83 60,75 C60,70 55,60 50,50 Z" 
            stroke="#aaaaaa" 
            strokeWidth="3" 
            fill="none"
          />
        </motion.g>
        
        {/* BILLETE CON CONTORNO VERDE CON GLOW */}
        <motion.g 
          filter="url(#moneyGlow)" 
          transform="translate(470, 520)"
          animate={{ 
            rotate: [0, 3, 0, -3, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2
          }}
        >
          <rect x="0" y="0" width="140" height="80" rx="5" stroke="#00ff44" strokeWidth="4" fill="none" />
          <rect x="10" y="10" width="120" height="60" rx="3" stroke="#00ff44" strokeWidth="2" fill="none" />
          <circle cx="70" cy="40" r="20" stroke="#00ff44" strokeWidth="3" fill="none" />
          <text x="70" y="48" textAnchor="middle" fill="#00ff44" fontWeight="bold" fontSize="24">$</text>
          <text x="20" y="28" textAnchor="start" fill="#00ff44" fontWeight="bold" fontSize="16">1</text>
          <text x="120" y="60" textAnchor="start" fill="#00ff44" fontWeight="bold" fontSize="16">1</text>
        </motion.g>
        
        {/* Definiciones de filtros de glow */}
        <defs>
          {/* Filtro de resplandor azul para agua */}
          <filter id="waterGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#0088ff" floodOpacity="0.8" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Filtro de resplandor gris para gas */}
          <filter id="gasGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#aaaaaa" floodOpacity="0.8" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Filtro de resplandor verde para dinero */}
          <filter id="moneyGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#00ff44" floodOpacity="0.8" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Filtro de resplandor naranja/dorado para rayo */}
          <filter id="lightningGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feFlood floodColor="#FFA500" floodOpacity="0.9" result="color" />
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