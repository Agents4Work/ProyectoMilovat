import React from "react";
import { LayoutGrid } from "@/components/ui/grid-layout-complete";

// Definimos las rutas de las imágenes directamente
const edificioInteligentePath = "https://i.ibb.co/B3R9Ps2/inteligente.jpg";
const departamentosPath = "https://i.ibb.co/FVbzbK1/vita-del-valle.jpg";
const centralizacionPath = "https://i.ibb.co/MDFvyvt/Chat-GPT-Image-Apr-8-2025-03-45-56-PM.png";
const milovatPath = "https://i.ibb.co/SVsC6V7/Screenshot-2025-04-08-at-3-48-11-p-m.png";

// Componente para Edificio Inteligente
const EdificioInteligente = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Edificio inteligente
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Es una estructura equipada con tecnología que permite automatizar y controlar remotamente diversos sistemas como seguridad, iluminación, climatización y accesos. Estos sistemas se conectan entre sí, comparten información y pueden ser manejados desde dispositivos móviles, optimizando recursos y mejorando la comodidad de sus ocupantes.
      </p>
    </div>
  );
};

// Componente para Departamentos
const Departamentos = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Departamentos
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Nos especializamos en edificios modernos donde la tecnología optimiza cada experiencia. Conectamos espacios, personas y servicios mediante soluciones digitales que transforman simples estructuras en entornos inteligentes.
      </p>
    </div>
  );
};

// Componente para Centralización
const Centralizacion = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Centralización
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        La centralización en un edificio unifica todos los sistemas y servicios en una sola plataforma digital, permitiendo que residentes y administradores accedan, controlen y gestionen desde un único punto.
      </p>
    </div>
  );
};

// Componente para Milovat Consulting
const MilovatConsulting = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Milovat Consulting
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Milovat Consulting impulsa la transformación digital de empresas a comunidades residenciales. Trasladamos nuestra experiencia en integración tecnológica empresarial al sector inmobiliario, rediseñando la administración de edificios mediante soluciones digitales centralizadas que mejoran la experiencia de residentes.
      </p>
    </div>
  );
};

// Definición de las tarjetas
const cards = [
  {
    id: 1,
    content: <EdificioInteligente />,
    className: "md:col-span-2",
    thumbnail: edificioInteligentePath,
  },
  {
    id: 2,
    content: <Departamentos />,
    className: "col-span-1",
    thumbnail: departamentosPath,
  },
  {
    id: 3,
    content: <Centralizacion />,
    className: "col-span-1",
    thumbnail: centralizacionPath,
  },
  {
    id: 4,
    content: <MilovatConsulting />,
    className: "md:col-span-2",
    thumbnail: milovatPath,
  }
];

export function FeatureCards() {
  return (
    <section className="bg-[#1e1e1e] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
          Descubre nuestras soluciones
        </h2>
        <div className="h-screen md:h-[calc(100vh-150px)]">
          <LayoutGrid cards={cards} />
        </div>
      </div>
    </section>
  );
}