/**
 * Componente ScrollImagesSection
 * 
 * Esta sección implementa una presentación dinámica de imágenes que se desplazan
 * horizontalmente utilizando el componente ScrollVelocity. Consta de:
 * 
 * - Título y subtítulo que presentan la propuesta de valor de Milovat
 * - Dos filas de imágenes que se desplazan en direcciones opuestas
 * - Una barra de texto que se desplaza horizontalmente con palabras clave
 * 
 * El efecto visual crea un entorno dinámico para mostrar imágenes de edificios,
 * familias y espacios, representando la esencia de comunidad y administración de edificios.
 * Las velocidades están ajustadas para ofrecer un movimiento suave pero constante,
 * mejorando la experiencia del usuario sin distraer del contenido principal.
 */

import React from 'react';
import { ScrollVelocity } from "./ui/scroll-velocity";

// Importar las imágenes de los activos
import logoImg from "../assets/attachment-gallery/Logo-Milotav-Positivo1-2022.png";
import building1Img from "../assets/attachment-gallery/Vita del valle 1.jpg";
import buildingsImg from "../assets/attachment-gallery/sean-pollock-PhYq704ffdA-unsplash.jpg";
import familyImg1 from "../assets/attachment-gallery/nathan-dumlao-4_mJ1TbMK8A-unsplash.jpg";
import familyImg2 from "../assets/attachment-gallery/ioann-mark-kuznietsov-9QTQFihyles-unsplash.jpg";
import familyImg3 from "../assets/attachment-gallery/hana-el-zohiry-HV2My97JHA0-unsplash.jpg";
import happyImg from "../assets/attachment-gallery/lesly-juarez-1AhGNGKuhR0-unsplash.jpg";
import balloonsImg from "../assets/attachment-gallery/catalin-pop-noydSJIWMSg-unsplash.jpg";
import sunsetImg from "../assets/attachment-gallery/austin-schmid-hRdVSYpffas-unsplash.jpg";

// Definir las imágenes para el componente de desplazamiento
const imagesRow1 = [
  {
    src: logoImg,
    alt: "Logo Milovat",
  },
  {
    src: building1Img,
    alt: "Edificio Milovat",
  },
  {
    src: buildingsImg,
    alt: "Edificios modernos",
  },
  {
    src: familyImg1,
    alt: "Familia feliz",
  },
  {
    src: happyImg,
    alt: "Residente sonriendo",
  },
];

const imagesRow2 = [
  {
    src: familyImg2,
    alt: "Familia en el bosque",
  },
  {
    src: sunsetImg,
    alt: "Atardecer",
  },
  {
    src: familyImg3,
    alt: "Familia feliz",
  },
  {
    src: balloonsImg,
    alt: "Persona con globos",
  },
  {
    src: logoImg,
    alt: "Logo Milovat",
  },
];

export function ScrollImagesSection() {
  return (
    <section className="w-full bg-zinc-900 py-20">
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Milovat, Administración de Edificios
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Soluciones integrales para la gestión de tu comunidad
        </p>
      </div>

      <div className="w-full overflow-hidden">
        <div className="flex flex-col space-y-10 py-10">
          {/* Primera fila con velocidad positiva */}
          <ScrollVelocity velocity={2.5}>
            {imagesRow1.map(({ src, alt }, index) => (
              <div
                key={`row1-${index}`}
                className="relative h-[6rem] w-[9rem] md:h-[8rem] md:w-[12rem] xl:h-[12rem] xl:w-[18rem] rounded-lg overflow-hidden mx-2"
              >
                <img
                  src={src}
                  alt={alt}
                  className="h-full w-full object-cover object-center rounded-lg transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </ScrollVelocity>

          {/* Segunda fila con velocidad negativa */}
          <ScrollVelocity velocity={-2.5}>
            {imagesRow2.map(({ src, alt }, index) => (
              <div
                key={`row2-${index}`}
                className="relative h-[6rem] w-[9rem] md:h-[8rem] md:w-[12rem] xl:h-[12rem] xl:w-[18rem] rounded-lg overflow-hidden mx-2"
              >
                <img
                  src={src}
                  alt={alt}
                  className="h-full w-full object-cover object-center rounded-lg transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </ScrollVelocity>

          {/* Texto con desplazamiento mucho más lento */}
          <ScrollVelocity velocity={0.875} className="py-6 bg-amber-500/20 rounded-full text-white">
            Milovat • Administración de Edificios • Comunidad • Confort • Seguridad • Tranquilidad
          </ScrollVelocity>
        </div>
      </div>
    </section>
  );
}