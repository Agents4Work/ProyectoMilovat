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
      viewBox="0 0 1200 350"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-auto", className)}
      preserveAspectRatio="xMidYMax meet"
      {...props}
    >
      {/* Fondo de ciudad con rascacielos y edificios modernos */}
      
      {/* Capa de edificios de fondo - torres y rascacielos distantes */}
      <path
        d="M0,200 
           L40,200 L40,120 L55,120 L55,90 L70,90 L70,120 L85,120 L85,200 
           L120,200 L120,80 L135,80 L135,60 L150,60 L150,80 L165,80 L165,40 L180,40 L180,80 L195,80 L195,200
           L230,200 L230,110 L250,110 L250,60 L270,60 L270,110 L290,110 L290,200
           L330,200 L330,130 L345,130 L345,50 L360,50 L360,20 L375,20 L375,50 L390,50 L390,130 L405,130 L405,200
           L440,200 L440,150 L460,150 L460,90 L480,90 L480,30 L500,30 L500,90 L520,90 L520,150 L540,150 L540,200
           L580,200 L580,100 L600,100 L600,40 L620,40 L620,10 L640,10 L640,40 L660,40 L660,100 L680,100 L680,200
           L720,200 L720,140 L740,140 L740,80 L760,80 L760,30 L780,30 L780,80 L800,80 L800,140 L820,140 L820,200
           L860,200 L860,120 L880,120 L880,70 L900,70 L900,30 L920,30 L920,70 L940,70 L940,120 L960,120 L960,200
           L1000,200 L1000,90 L1020,90 L1020,30 L1040,30 L1040,90 L1060,90 L1060,60 L1080,60 L1080,10 L1100,10 L1100,60 L1120,60 L1120,90 L1140,90 L1140,200
           L1200,200 L1200,350 L0,350 Z"
        fill="currentColor"
        opacity="0.4"
      />
      
      {/* Capa de edificios de medio plano - edificios comerciales y de oficinas */}
      <path
        d="M0,230 
           L30,230 L30,160 L45,160 L45,145 L60,145 L60,160 L75,160 L75,180 L90,180 L90,160 L105,160 L105,145 L120,145 L120,230
           L155,230 L155,175 L170,175 L170,150 L185,150 L185,175 L200,175 L200,150 L215,150 L215,100 L230,100 L230,150 L245,150 L245,175 L260,175 L260,230
           L295,230 L295,190 L310,190 L310,165 L325,165 L325,140 L340,140 L340,165 L355,165 L355,190 L370,190 L370,165 L385,165 L385,140 L400,140 L400,165 L415,165 L415,190 L430,190 L430,230
           L465,230 L465,200 L480,200 L480,170 L495,170 L495,130 L510,130 L510,170 L525,170 L525,200 L540,200 L540,230
           L575,230 L575,180 L590,180 L590,140 L605,140 L605,120 L620,120 L620,140 L635,140 L635,180 L650,180 L650,230
           L685,230 L685,160 L700,160 L700,130 L715,130 L715,160 L730,160 L730,190 L745,190 L745,160 L760,160 L760,130 L775,130 L775,160 L790,160 L790,230
           L825,230 L825,170 L840,170 L840,140 L855,140 L855,115 L870,115 L870,140 L885,140 L885,170 L900,170 L900,230
           L935,230 L935,200 L950,200 L950,180 L965,180 L965,140 L980,140 L980,180 L995,180 L995,230
           L1030,230 L1030,190 L1045,190 L1045,160 L1060,160 L1060,140 L1075,140 L1075,160 L1090,160 L1090,190 L1105,190 L1105,230
           L1140,230 L1140,180 L1155,180 L1155,155 L1170,155 L1170,130 L1185,130 L1185,155 L1200,155 L1200,350 L0,350 Z"
        fill="currentColor"
        opacity="0.6"
      />
      
      {/* Capa de edificios de primer plano - edificios residenciales y detalles principales */}
      <path
        d="M0,260 
           L25,260 L25,220 
           L35,220 L35,200 L45,200 L45,180 L55,180 L55,200 L65,200 L65,220 
           L75,220 L75,260
           L100,260 L100,230 
           L110,230 L110,210 L120,210 L120,195 L130,195 L130,210 L140,210 L140,230 
           L150,230 L150,260
           L175,260 L175,235 
           L185,235 L185,215 L195,215 L195,235 
           L205,235 L205,260
           L230,260 L230,225 L240,225 L240,205 L250,205 L250,185 L260,185 L260,205 L270,205 L270,225 L280,225 L280,205 L290,205 L290,185 L300,185 L300,205 L310,205 L310,225 L320,225 L320,260
           L345,260 L345,230 L355,230 L355,210 L365,210 L365,230 L375,230 L375,260
           L400,260 L400,220 L410,220 L410,200 L420,200 L420,220 L430,220 L430,260
           L455,260 L455,225 L465,225 L465,205 L475,205 L475,225 L485,225 L485,260
           L510,260 L510,230 L520,230 L520,210 L530,210 L530,230 L540,230 L540,260
           L565,260 L565,220 L575,220 L575,200 L585,200 L585,220 L595,220 L595,260
           L620,260 L620,225 L630,225 L630,205 L640,205 L640,225 L650,225 L650,260
           L675,260 L675,235 L685,235 L685,215 L695,215 L695,195 L705,195 L705,215 L715,215 L715,235 L725,235 L725,260
           L750,260 L750,230 L760,230 L760,210 L770,210 L770,230 L780,230 L780,260
           L805,260 L805,225 L815,225 L815,205 L825,205 L825,225 L835,225 L835,260
           L860,260 L860,235 L870,235 L870,215 L880,215 L880,195 L890,195 L890,215 L900,215 L900,235 L910,235 L910,260
           L935,260 L935,230 L945,230 L945,210 L955,210 L955,230 L965,230 L965,260
           L990,260 L990,235 L1000,235 L1000,215 L1010,215 L1010,200 L1020,200 L1020,215 L1030,215 L1030,235 L1040,235 L1040,260
           L1065,260 L1065,225 L1075,225 L1075,205 L1085,205 L1085,225 L1095,225 L1095,260
           L1120,260 L1120,230 L1130,230 L1130,215 L1140,215 L1140,230 L1150,230 L1150,260
           L1175,260 L1175,225 L1185,225 L1185,210 L1195,210 L1195,225 L1200,225 L1200,350 L0,350 Z"
        fill="currentColor"
        opacity="0.8"
      />
      
      {/* Ventanas en algunos edificios principales para dar más realismo */}
      <g opacity="0.3">
        {/* Ventanas en el rascacielos principal */}
        <rect x="618" y="45" width="4" height="4" fill="currentColor" />
        <rect x="618" y="55" width="4" height="4" fill="currentColor" />
        <rect x="618" y="65" width="4" height="4" fill="currentColor" />
        <rect x="618" y="75" width="4" height="4" fill="currentColor" />
        <rect x="628" y="45" width="4" height="4" fill="currentColor" />
        <rect x="628" y="55" width="4" height="4" fill="currentColor" />
        <rect x="628" y="65" width="4" height="4" fill="currentColor" />
        <rect x="628" y="75" width="4" height="4" fill="currentColor" />
        
        {/* Ventanas en otro edificio */}
        <rect x="780" y="40" width="4" height="4" fill="currentColor" />
        <rect x="780" y="50" width="4" height="4" fill="currentColor" />
        <rect x="780" y="60" width="4" height="4" fill="currentColor" />
        <rect x="790" y="40" width="4" height="4" fill="currentColor" />
        <rect x="790" y="50" width="4" height="4" fill="currentColor" />
        <rect x="790" y="60" width="4" height="4" fill="currentColor" />
        
        {/* Ventanas en edificio de primer plano */}
        <rect x="250" y="190" width="3" height="3" fill="currentColor" />
        <rect x="250" y="197" width="3" height="3" fill="currentColor" />
        <rect x="257" y="190" width="3" height="3" fill="currentColor" />
        <rect x="257" y="197" width="3" height="3" fill="currentColor" />
        <rect x="264" y="190" width="3" height="3" fill="currentColor" />
        <rect x="264" y="197" width="3" height="3" fill="currentColor" />
      </g>
      
      {/* Antenas en algunos rascacielos */}
      <line x1="640" y1="10" x2="640" y2="0" stroke="currentColor" strokeWidth="1" />
      <line x1="920" y1="30" x2="920" y2="20" stroke="currentColor" strokeWidth="1" />
      <line x1="1080" y1="10" x2="1080" y2="0" stroke="currentColor" strokeWidth="1" />
      <line x1="375" y1="20" x2="375" y2="10" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
};