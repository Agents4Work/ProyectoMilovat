import React from "react";
import { BuildingAnimation } from "./ui/building-animation";
import { cn } from "@/lib/utils";

export function AnimatedBuildingSection() {
  return (
    <section className="w-full bg-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-md">
              <BuildingAnimation />
            </div>
          </div>
          
          <div className="w-full md:w-1/2 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600">
              Tecnología Avanzada
            </h2>
            <p className="text-lg mb-4">
              Nuestra plataforma utiliza tecnología de vanguardia para monitorear y optimizar todos los sistemas de tu edificio en tiempo real.
            </p>
            <p className="text-lg mb-4">
              Sensores inteligentes conectados a nuestra red central permiten una gestión eficiente de recursos energéticos, seguridad y mantenimiento preventivo.
            </p>
            <p className="text-lg mb-4">
              El sistema aprende de los patrones de uso y adapta automáticamente los parámetros para maximizar el confort y minimizar costos operativos.
            </p>
            <p className="text-lg mb-4">
              La interfaz intuitiva te permite visualizar datos complejos de forma sencilla, facilitando la toma de decisiones informadas sobre la gestión de tu propiedad.
            </p>
            <p className="text-lg">
              Actualizaciones constantes y soporte técnico especializado garantizan que tu edificio siempre opere con las últimas innovaciones tecnológicas disponibles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}