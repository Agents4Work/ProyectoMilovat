import React from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";

// Importar las imágenes desde Vite
import edificioInteligentePath from "@assets/inteligente.jpg";
import departamentosPath from "@assets/vita del valle.jpg";

// Primer componente con el texto de "Edificio inteligente"
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

// Segundo componente con el texto de "Departamentos"
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

// Definición de las tarjetas para el grid
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
  }
];

export function FeatureGrid() {
  return (
    <section className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
          Descubre nuestras soluciones
        </h2>
        <div className="w-full">
          <LayoutGrid cards={cards} />
        </div>
      </div>
    </section>
  );
}