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
      viewBox="0 0 1000 300"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-auto", className)}
      preserveAspectRatio="xMidYMax meet"
      {...props}
    >
      {/* Primera capa de edificios (más adelante) */}
      <path
        d="M0,250 L50,250 L50,170 L70,170 L70,250 L100,250 L100,150 L120,150 L120,250 
           L160,250 L160,200 L175,200 L175,170 L190,170 L190,200 L210,200 L210,250
           L250,250 L250,180 L270,180 L270,250 L300,250 L300,190 L320,190 L320,220 L340,220 L340,250
           L380,250 L380,150 L400,150 L400,250 L430,250 L430,200 L450,200 L450,250
           L490,250 L490,170 L510,170 L510,250 L550,250 L550,150 L570,150 L570,180 L590,180 L590,150 L610,150 L610,250
           L650,250 L650,200 L675,200 L675,250 L710,250 L710,180 L730,180 L730,250
           L760,250 L760,210 L780,210 L780,250 L830,250 L830,170 L850,170 L850,210 L870,210 L870,250
           L900,250 L900,190 L920,190 L920,250 L950,250 L950,170 L970,170 L970,250 L1000,250 L1000,300 L0,300 Z"
        fill="currentColor"
        opacity="0.5"
      />
      
      {/* Segunda capa de edificios (plano medio) */}
      <path
        d="M0,280 L30,280 L30,240 L50,240 L50,280 L80,280 L80,250 L110,250 L110,280
           L160,280 L160,240 L180,240 L180,260 L200,260 L200,280 L240,280 L240,230 L260,230 L260,280
           L290,280 L290,250 L320,250 L320,280 L370,280 L370,230 L390,230 L390,280
           L440,280 L440,250 L460,250 L460,280 L500,280 L500,240 L525,240 L525,280
           L580,280 L580,230 L600,230 L600,260 L620,260 L620,230 L640,230 L640,280
           L670,280 L670,250 L690,250 L690,280 L740,280 L740,260 L760,260 L760,280
           L800,280 L800,240 L820,240 L820,280 L850,280 L850,230 L870,230 L870,250 L890,250 L890,280
           L940,280 L940,250 L960,250 L960,280 L1000,280 L1000,300 L0,300 Z"
        fill="currentColor"
        opacity="0.7"
      />
      
      {/* Tercera capa de edificios (primer plano) */}
      <path
        d="M0,295 L40,295 L40,270 L60,270 L60,295 L100,295 L100,260 L120,260 L120,280 L140,280 L140,295
           L190,295 L190,270 L210,270 L210,295 L260,295 L260,280 L280,280 L280,295
           L330,295 L330,260 L350,260 L350,295 L400,295 L400,270 L420,270 L420,295
           L470,295 L470,280 L490,280 L490,295 L530,295 L530,270 L550,270 L550,295
           L600,295 L600,260 L620,260 L620,280 L640,280 L640,260 L660,260 L660,295
           L720,295 L720,270 L740,270 L740,295 L790,295 L790,280 L810,280 L810,295
           L860,295 L860,270 L880,270 L880,295 L940,295 L940,280 L960,280 L960,295 L1000,295 L1000,300 L0,300 Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
};