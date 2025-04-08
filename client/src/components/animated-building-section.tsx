import React from "react";
import { BuildingAnimation } from "./ui/building-animation";
import { cn } from "@/lib/utils";

export function AnimatedBuildingSection() {
  return (
    <section className="w-full bg-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-0 md:gap-0">
          <div className="w-full md:w-2/3 flex justify-start">
            <div className="w-full">
              <BuildingAnimation />
            </div>
          </div>
          
          <div className="w-full md:w-1/3 text-white text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600">
              Tecnología Avanzada
            </h2>
            <p className="text-lg mb-3">
              Nuestra plataforma utiliza tecnología de vanguardia para monitorear y optimizar todos los sistemas de tu edificio en tiempo real.
            </p>
            <p className="text-lg mb-3">
              Sensores inteligentes conectados a nuestra red central permiten una gestión eficiente de recursos energéticos, seguridad y mantenimiento preventivo.
            </p>
            <p className="text-lg mb-3">
              El sistema aprende de los patrones de uso y adapta automáticamente los parámetros para maximizar el confort y minimizar costos.
            </p>
            <p className="text-lg mb-3">
              La interfaz intuitiva te permite visualizar datos complejos de forma sencilla, facilitando la toma de decisiones informadas.
            </p>
            <p className="text-lg">
              Actualizaciones constantes y soporte técnico garantizan que tu edificio opere con las últimas innovaciones disponibles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}