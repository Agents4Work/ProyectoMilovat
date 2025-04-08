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
              Nuestra aplicación centraliza la gestión de tu edificio inteligente en una sola plataforma intuitiva. Diseñada pensando en las necesidades reales de los residentes, facilita la comunicación y resolución de problemas comunitarios con total transparencia.
            </p>
            <p className="text-lg mb-3">
              Con acceso inmediato a reportes de incidencias, seguimiento de paquetería y control de accesos, transformamos la experiencia de vivir en comunidad. Cada notificación, cada alerta de seguridad y cada solicitud queda registrada y visible para todos los interesados.
            </p>
            <p className="text-lg mb-3">
              La transparencia es nuestro compromiso. Desde el registro de visitantes hasta la documentación de incidencias, toda la información relevante está disponible para los residentes autorizados, eliminando la incertidumbre y fortaleciendo la confianza en la administración.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}