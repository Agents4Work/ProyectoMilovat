import React from "react";
import { BuildingAnimation } from "./ui/building-animation";
import { cn } from "@/lib/utils";

export function AnimatedBuildingSection() {
  return (
    <section className="w-full bg-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-0 md:gap-0">
          <div className="w-full md:w-5/12 flex justify-end">
            <div className="w-full h-[700px]">
              <BuildingAnimation />
            </div>
          </div>
          
          <div className="w-full md:w-7/12 text-white text-center md:text-left px-0 md:pl-2 md:pr-8 mt-[-120px]">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600">
              Conéctate al futuro residencial
            </h2>
            <p className="text-lg mb-3">
              En nuestra aplicación, transformamos la gestión de edificios mediante la centralización inteligente de datos. Cada residente accede a información transparente sobre su comunidad, desde consumos energéticos hasta resolución de incidencias, todo en tiempo real.
            </p>
            <p className="text-lg mb-3">
              Nuestra tecnología no solo conecta personas, sino que prepara tu edificio para un futuro donde la eficiencia y la sostenibilidad son prioridad. Con interfaces intuitivas y análisis predictivo, convertimos datos en decisiones que mejoran la calidad de vida comunitaria.
            </p>
            <p className="text-lg mb-3">
              Diseñada específicamente para edificios inteligentes, esta plataforma integra sistemas domóticos, seguridad y comunicaciones en una experiencia unificada. Porque creemos que la transparencia y la tecnología son los pilares de las comunidades residenciales del mañana.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}