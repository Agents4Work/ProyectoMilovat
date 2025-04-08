import React from 'react';
import { cn } from "@/lib/utils";

interface BuildingSilhouetteProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Componente BuildingSilhouette
 * 
 * Este componente muestra una silueta de ciudad para usar como decoración.
 * 
 * @param className - Clases CSS adicionales
 * @param props - Propiedades adicionales de SVG
 */
export const BuildingSilhouette = ({ className, ...props }: BuildingSilhouetteProps) => {
  return (
    <svg
      viewBox="0 0 1200 400"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-auto", className)}
      preserveAspectRatio="xMidYMax meet"
      {...props}
    >
      {/* Edificios y rascacielos de diferentes formas y tamaños */}
      <g transform="translate(0, 120)">
        {/* Edificio con techo puntiagudo */}
        <path d="M50,180 L50,110 L70,90 L90,110 L90,180 Z" fill="currentColor" opacity="0.8" />
        
        {/* Edificio rectangular con ventanas */}
        <path d="M110,180 L110,100 L150,100 L150,180 Z" fill="currentColor" opacity="0.75" />
        <rect x="120" y="110" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="120" y="125" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="120" y="140" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="135" y="110" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="135" y="125" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="135" y="140" width="5" height="5" fill="currentColor" opacity="0.4" />
        
        {/* Rascacielos con antena */}
        <path d="M180,180 L180,50 L220,50 L220,180 Z" fill="currentColor" opacity="0.85" />
        <rect x="190" y="60" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="190" y="70" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="190" y="80" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="190" y="90" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="190" y="100" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="206" y="60" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="206" y="70" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="206" y="80" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="206" y="90" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="206" y="100" width="4" height="4" fill="currentColor" opacity="0.4" />
        <line x1="200" y1="50" x2="200" y2="30" stroke="currentColor" strokeWidth="2" opacity="0.7" />
        
        {/* Edificio con forma escalonada */}
        <path d="M240,180 L240,150 L260,150 L260,120 L280,120 L280,90 L300,90 L300,120 L320,120 L320,150 L340,150 L340,180 Z" fill="currentColor" opacity="0.7" />
        
        {/* Torre delgada con coronamiento */}
        <path d="M370,180 L370,70 L380,70 L380,40 L400,40 L400,70 L410,70 L410,180 Z" fill="currentColor" opacity="0.75" />
        <rect x="380" y="50" width="20" height="5" fill="currentColor" opacity="0.4" />
        <rect x="380" y="60" width="20" height="5" fill="currentColor" opacity="0.4" />
        
        {/* Edificio con techo redondeado */}
        <path d="M440,180 L440,100 A20,20 0 0,1 460,80 A20,20 0 0,1 480,100 L480,180 Z" fill="currentColor" opacity="0.8" />
        
        {/* Edificio con múltiples torres */}
        <path d="M510,180 L510,120 L530,120 L530,80 L550,80 L550,60 L570,60 L570,80 L590,80 L590,120 L610,120 L610,180 Z" fill="currentColor" opacity="0.75" />
        <line x1="550" y1="60" x2="550" y2="45" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <line x1="570" y1="60" x2="570" y2="45" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        
        {/* Edificio moderno de forma irregular */}
        <path d="M640,180 L640,120 L660,120 L660,70 L685,60 L710,70 L710,120 L730,120 L730,180 Z" fill="currentColor" opacity="0.85" />
        <rect x="655" y="90" width="15" height="3" fill="currentColor" opacity="0.4" />
        <rect x="655" y="100" width="15" height="3" fill="currentColor" opacity="0.4" />
        <rect x="655" y="110" width="15" height="3" fill="currentColor" opacity="0.4" />
        <rect x="700" y="90" width="15" height="3" fill="currentColor" opacity="0.4" />
        <rect x="700" y="100" width="15" height="3" fill="currentColor" opacity="0.4" />
        <rect x="700" y="110" width="15" height="3" fill="currentColor" opacity="0.4" />
        
        {/* Rascacielos imponente */}
        <path d="M760,180 L760,30 L810,30 L810,180 Z" fill="currentColor" opacity="0.9" />
        <rect x="770" y="40" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="770" y="55" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="770" y="70" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="770" y="85" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="770" y="100" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="770" y="115" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="770" y="130" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="770" y="145" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="795" y="40" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="795" y="55" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="795" y="70" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="795" y="85" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="795" y="100" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="795" y="115" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="795" y="130" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="795" y="145" width="5" height="5" fill="currentColor" opacity="0.4" />
        
        {/* Edificio con forma de L */}
        <path d="M840,180 L840,100 L870,100 L870,130 L900,130 L900,180 Z" fill="currentColor" opacity="0.75" />
        <rect x="850" y="110" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="850" y="125" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="850" y="140" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="850" y="155" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="880" y="140" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="880" y="155" width="4" height="4" fill="currentColor" opacity="0.4" />
        
        {/* Rascacielos delgado con antena */}
        <path d="M930,180 L930,40 L950,40 L950,180 Z" fill="currentColor" opacity="0.8" />
        <line x1="940" y1="40" x2="940" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
        
        {/* Edificio con forma de T */}
        <path d="M980,180 L980,100 L1020,100 L1020,60 L1060,60 L1060,100 L1100,100 L1100,180 Z" fill="currentColor" opacity="0.85" />
        <rect x="990" y="110" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="990" y="125" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="990" y="140" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="1030" y="70" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="1030" y="85" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="1030" y="110" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="1030" y="125" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="1030" y="140" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="1050" y="70" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="1050" y="85" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="1085" y="110" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="1085" y="125" width="5" height="5" fill="currentColor" opacity="0.4" />
        <rect x="1085" y="140" width="5" height="5" fill="currentColor" opacity="0.4" />
        
        {/* Edificio con techo inclinado */}
        <path d="M1130,180 L1130,90 L1150,70 L1170,90 L1170,180 Z" fill="currentColor" opacity="0.8" />
        
        {/* Base para unir todos los edificios - Bajada */}
        <path d="M0,300 L1200,300 L1200,370 L0,370 Z" fill="currentColor" opacity="0.9" />
      </g>
    </svg>
  );
};