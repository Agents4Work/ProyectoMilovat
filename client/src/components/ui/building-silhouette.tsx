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
      viewBox="0 0 1200 250"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-auto", className)}
      preserveAspectRatio="xMidYMax meet"
      {...props}
    >
      {/* Silueta de ciudad más orgánica y natural */}
      <path
        d="M0,175 
        L45,175 
        L45,155 
        L60,155 
        L60,140 
        L85,140 
        L85,155 
        L105,155 
        L105,130 
        L125,130 
        L125,170 
        L140,170 
        L140,140 
        L145,140 
        L145,110 
        L165,110 
        L165,170 
        L195,170 
        L195,135 
        L215,135 
        L215,115 
        L230,115 
        L230,95 
        L240,95 
        L240,55 
        L250,55 
        L250,90 
        L265,90 
        L265,145 
        L280,145 
        L280,165 
        L300,165 
        L300,140 
        L310,140 
        L310,120 
        L325,120 
        L325,135 
        L340,135 
        L340,170 
        L355,170 
        L355,150 
        L370,150 
        L370,110 
        L385,110 
        L385,90 
        L400,90 
        L400,70 
        L410,70 
        L410,40 
        L420,40 
        L420,65 
        L430,65 
        L430,100 
        L445,100 
        L445,120 
        L460,120 
        L460,145 
        L475,145 
        L475,160 
        L490,160 
        L490,180 
        L510,180 
        L510,155 
        L525,155 
        L525,135 
        L535,135 
        L535,110 
        L550,110 
        L550,85 
        L570,85 
        L570,105 
        L585,105 
        L585,125 
        L600,125 
        L600,145 
        L615,145 
        L615,160 
        L630,160 
        L630,130 
        L645,130 
        L645,105 
        L660,105 
        L660,85 
        L675,85 
        L675,35 
        L690,35 
        L690,60 
        L700,60 
        L700,75 
        L715,75 
        L715,105 
        L730,105 
        L730,125 
        L745,125 
        L745,140 
        L760,140 
        L760,165 
        L775,165 
        L775,135 
        L790,135 
        L790,115 
        L805,115 
        L805,90 
        L820,90 
        L820,75 
        L835,75 
        L835,60 
        L850,60 
        L850,30 
        L865,30 
        L865,55 
        L880,55 
        L880,70 
        L895,70 
        L895,95 
        L910,95 
        L910,130 
        L925,130 
        L925,155 
        L940,155 
        L940,175 
        L965,175 
        L965,160 
        L980,160 
        L980,135 
        L995,135 
        L995,115 
        L1010,115 
        L1010,90 
        L1025,90 
        L1025,50 
        L1040,50 
        L1040,80 
        L1055,80 
        L1055,100 
        L1070,100 
        L1070,140 
        L1085,140 
        L1085,165 
        L1105,165 
        L1105,140 
        L1120,140 
        L1120,120 
        L1135,120 
        L1135,95 
        L1150,95 
        L1150,80 
        L1165,80 
        L1165,55 
        L1180,55 
        L1180,70 
        L1200,70 
        L1200,250 L0,250 Z"
        fill="currentColor"
        opacity="0.6"
      />
      
      {/* Ventanas en algunos edificios para dar realismo */}
      <g opacity="0.4">
        {/* Ventanas dispersas en distintos edificios */}
        <rect x="240" y="65" width="3" height="3" fill="currentColor" />
        <rect x="240" y="75" width="3" height="3" fill="currentColor" />
        <rect x="245" y="65" width="3" height="3" fill="currentColor" />
        <rect x="245" y="75" width="3" height="3" fill="currentColor" />
        
        <rect x="412" y="45" width="3" height="3" fill="currentColor" />
        <rect x="412" y="55" width="3" height="3" fill="currentColor" />
        <rect x="417" y="45" width="3" height="3" fill="currentColor" />
        <rect x="417" y="55" width="3" height="3" fill="currentColor" />
        
        <rect x="680" y="45" width="2" height="2" fill="currentColor" />
        <rect x="680" y="53" width="2" height="2" fill="currentColor" />
        <rect x="680" y="61" width="2" height="2" fill="currentColor" />
        <rect x="685" y="45" width="2" height="2" fill="currentColor" />
        <rect x="685" y="53" width="2" height="2" fill="currentColor" />
        <rect x="685" y="61" width="2" height="2" fill="currentColor" />
        
        <rect x="855" y="35" width="2" height="2" fill="currentColor" />
        <rect x="855" y="42" width="2" height="2" fill="currentColor" />
        <rect x="855" y="49" width="2" height="2" fill="currentColor" />
        <rect x="860" y="35" width="2" height="2" fill="currentColor" />
        <rect x="860" y="42" width="2" height="2" fill="currentColor" />
        <rect x="860" y="49" width="2" height="2" fill="currentColor" />
        
        <rect x="1030" y="60" width="3" height="3" fill="currentColor" />
        <rect x="1030" y="70" width="3" height="3" fill="currentColor" />
        <rect x="1035" y="60" width="3" height="3" fill="currentColor" />
        <rect x="1035" y="70" width="3" height="3" fill="currentColor" />
        
        <rect x="1165" y="60" width="2" height="2" fill="currentColor" />
        <rect x="1165" y="67" width="2" height="2" fill="currentColor" />
        <rect x="1170" y="60" width="2" height="2" fill="currentColor" />
        <rect x="1170" y="67" width="2" height="2" fill="currentColor" />
      </g>
      
      {/* Detalles adicionales como antenas o elementos arquitectónicos */}
      <g opacity="0.7">
        <line x1="850" y1="30" x2="850" y2="20" stroke="currentColor" strokeWidth="1" />
        <line x1="675" y1="35" x2="675" y2="25" stroke="currentColor" strokeWidth="1" />
        <line x1="1025" y1="50" x2="1025" y2="40" stroke="currentColor" strokeWidth="1" />
        <line x1="410" y1="40" x2="410" y2="30" stroke="currentColor" strokeWidth="1" />
      </g>
    </svg>
  );
};