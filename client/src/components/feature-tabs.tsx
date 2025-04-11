import React from 'react';
// Utilizamos nuestro componente personalizado AnimatedTabs
import { AnimatedTabs } from '@/components/ui/animated-tabs';

export function FeatureTabs() {
  const tabs = [
    {
      title: "Dashboard",
      value: "dashboard",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 text-xl md:text-4xl font-bold text-white">
          <img 
            src="/images/tabs/Dashboard.png" 
            alt="Vista del Dashboard" 
            className="object-contain w-full h-full rounded-xl" 
          />
        </div>
      ),
    },
    {
      title: "Anuncios",
      value: "anuncios",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 text-xl md:text-4xl font-bold text-white">
          <img 
            src="/images/tabs/Anuncios.png" 
            alt="Gestión de Anuncios" 
            className="object-contain w-full h-full rounded-xl"  
          />
        </div>
      ),
    },
    {
      title: "Visitas",
      value: "visitas",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 text-xl md:text-4xl font-bold text-white">
          <img 
            src="/images/tabs/Visitas.png" 
            alt="Gestión de Visitas" 
            className="object-contain w-full h-full rounded-xl"  
          />
        </div>
      ),
    },
    {
      title: "Incidencias",
      value: "incidencias",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 text-xl md:text-4xl font-bold text-white">
          <img 
            src="/images/tabs/Incidencias.png" 
            alt="Gestión de Incidencias" 
            className="object-contain w-full h-full rounded-xl"  
          />
        </div>
      ),
    },
    {
      title: "Configuración",
      value: "configuracion",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 text-xl md:text-4xl font-bold text-white">
          <img 
            src="/images/tabs/Configuracion.png" 
            alt="Configuración de Usuario" 
            className="object-contain w-full h-full rounded-xl"  
          />
        </div>
      ),
    },
  ];

  return (
    <section className="w-full bg-black py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          Todo lo que necesitas en un solo lugar
        </h2>
        <div className="h-[35rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start">
          <AnimatedTabs 
            tabs={tabs} 
            containerClassName="p-2 bg-zinc-800 rounded-full border border-amber-500/30"
            activeTabClassName="bg-amber-500/30 border border-amber-500/50"
            tabClassName="text-white font-medium"
          />
        </div>
      </div>
    </section>
  );
}