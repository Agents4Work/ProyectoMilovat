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
    <section className="w-full bg-gradient-to-b from-black to-zinc-900 py-20">
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Milovat, Administración de Edificios
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Soluciones integrales para la gestión de tu comunidad
        </p>
      </div>

      <div className="w-full overflow-hidden">
        <div className="flex flex-col space-y-12">
          <ScrollVelocity velocity={3}>
            {imagesRow1.map(({ src, alt }, index) => (
              <div
                key={`row1-${index}`}
                className="relative h-[10rem] w-[15rem] md:h-[12rem] md:w-[18rem] xl:h-[16rem] xl:w-[24rem] rounded-lg overflow-hidden"
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </ScrollVelocity>

          <ScrollVelocity velocity={-3}>
            {imagesRow2.map(({ src, alt }, index) => (
              <div
                key={`row2-${index}`}
                className="relative h-[10rem] w-[15rem] md:h-[12rem] md:w-[18rem] xl:h-[16rem] xl:w-[24rem] rounded-lg overflow-hidden"
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </ScrollVelocity>

          <ScrollVelocity velocity={5} className="py-6 bg-amber-500/20 rounded-full">
            Milovat • Administración de Edificios • Comunidad • Confort • Seguridad • Tranquilidad
          </ScrollVelocity>
        </div>
      </div>
    </section>
  );
}