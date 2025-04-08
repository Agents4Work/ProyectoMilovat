"use client"

import React from "react"
import { motion } from "framer-motion"

export const BuildingAnimation: React.FC = () => {

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <svg width="850" height="600" viewBox="0 0 850 600" fill="none">
        {/* División del espacio: izquierda edificio, derecha iconos de servicio */}
        
        {/* EDIFICIO BLANCO EN LADO IZQUIERDO (AGRANDADO) */}
        <motion.g 
          filter="url(#buildingGlow)"
          transform="translate(0, -40) scale(1.3)"
          animate={{ 
            y: [0, -3, 0],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
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
               M200,330 H220 V360 H200 V330 Z
               
               M80,380 H100 V410 H80 V380 Z
               M140,380 H160 V410 H140 V380 Z
               M200,380 H220 V410 H200 V380 Z"
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
        </motion.g>
        
        {/* RAYO CON CONTORNO GLOW AMARILLO (LADO DERECHO-ARRIBA) */}
        <motion.g 
          filter="url(#lightningGlow)" 
          transform="translate(450, 100)"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
            rotate: [0, 2, 0, -2, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path 
            d="M20,0 L0,60 L30,60 L10,120 L80,50 L40,50 L60,0 Z" 
            stroke="white" 
            strokeWidth="4" 
            fill="none"
          />
        </motion.g>
        
        {/* GOTA DE AGUA CON CONTORNO GLOW AZUL (ABAJO DEL RAYO) */}
        <motion.g 
          filter="url(#waterGlow)" 
          transform="translate(450, 230)"
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
            stroke="white" 
            strokeWidth="4" 
            fill="none"
          />
          <motion.path 
            d="M56,80 C56,50 30,56 30,90" 
            stroke="white" 
            strokeWidth="3" 
            fill="none"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.g>
        
        {/* TANQUE DE GAS CON CONTORNO GLOW GRIS (ABAJO DEL AGUA) */}
        <motion.g 
          filter="url(#gasGlow)" 
          transform="translate(445, 370)"
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
          <path d="M30,0 H70 V10 H80 V20 H20 V10 H30 V0 Z" stroke="white" strokeWidth="4" fill="none" />
          <path d="M20,20 H80 C80,20 100,40 100,60 C100,90 80,100 70,120 H30 C20,100 0,90 0,60 C0,40 20,20 20,20 Z" 
                stroke="white" strokeWidth="4" fill="none" />
          <path d="M20,120 H80 V130 H20 V120 Z" stroke="white" strokeWidth="4" fill="none" />
          <path d="M30,130 H40 V140 H30 V130 Z M60,130 H70 V140 H60 V130 Z" stroke="white" strokeWidth="4" fill="none" />
          
          {/* Gota dentro del tanque */}
          <path 
            d="M50,50 C45,60 40,70 40,75 C40,83 45,90 50,90 C55,90 60,83 60,75 C60,70 55,60 50,50 Z" 
            stroke="white" 
            strokeWidth="3" 
            fill="none"
          />
        </motion.g>
        
        {/* BILLETE CON CONTORNO GLOW VERDE (ABAJO DEL GAS) */}
        <motion.g 
          filter="url(#moneyGlow)" 
          transform="translate(425, 520)"
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
          <rect x="0" y="0" width="140" height="90" rx="10" stroke="white" strokeWidth="4" fill="none" />
          <rect x="10" y="10" width="120" height="70" rx="5" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="70" cy="45" r="25" stroke="white" strokeWidth="3" fill="none" />
          <text x="70" y="55" textAnchor="middle" fill="white" fontWeight="bold" fontSize="30">$</text>
          <text x="20" y="30" textAnchor="start" fill="white" fontWeight="bold" fontSize="20">1</text>
          <text x="120" y="70" textAnchor="start" fill="white" fontWeight="bold" fontSize="20">1</text>
        </motion.g>
        
        {/* Definiciones de gradientes */}
        <defs>
          {/* Gradiente dorado para línea izquierda */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F1C40F" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#F39C12" />
            <stop offset="100%" stopColor="#F1C40F" stopOpacity="0.2" />
          </linearGradient>
          
          {/* Gradiente dorado invertido para línea derecha */}
          <linearGradient id="rightGoldGradient" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F1C40F" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#F39C12" />
            <stop offset="100%" stopColor="#F1C40F" stopOpacity="0.2" />
          </linearGradient>
          
          {/* Gradiente para el fondo del edificio */}
          <linearGradient id="buildingBgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="50%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          
          {/* Gradiente para el contorno del edificio */}
          <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F1C40F" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#F39C12" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E67E22" stopOpacity="0.7" />
          </linearGradient>
          
          {/* Filtro de resplandor para el edificio */}
          <filter id="buildingGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feFlood floodColor="#F1C40F" floodOpacity="0.2" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
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
          
          {/* Filtro de resplandor amarillo para rayo */}
          <filter id="lightningGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feFlood floodColor="#ffcc00" floodOpacity="0.9" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Gradiente para el rayo */}
          <linearGradient id="boltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F1C40F" />
            <stop offset="50%" stopColor="#F39C12" />
            <stop offset="100%" stopColor="#E67E22" />
          </linearGradient>
          
          {/* Gradiente animado */}
          <motion.linearGradient
            animate={{
              x1: [0, 400],
              x2: [0, 200],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "linear",
            }}
            id="rayoGradient"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F1C40F" stopOpacity="0" />
            <stop stopColor="#F1C40F" />
            <stop offset="1" stopColor="#E67E22" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  );
};