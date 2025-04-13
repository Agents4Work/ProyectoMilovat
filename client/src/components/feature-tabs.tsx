import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
      title: "Pagos",
      value: "pagos",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 text-xl md:text-4xl font-bold text-white">
          <img 
            src="/images/tabs/Pagos.png" 
            alt="Gestión de Pagos" 
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
      title: "Reservas",
      value: "reservas",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 text-xl md:text-4xl font-bold text-white">
          <img 
            src="/images/tabs/Reservas.png" 
            alt="Gestión de Reservas" 
            className="object-contain w-full h-full rounded-xl"  
          />
        </div>
      ),
    },
    {
      title: "Documentos",
      value: "documentos",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 text-xl md:text-4xl font-bold text-white">
          <img 
            src="/images/tabs/Documentos.png" 
            alt="Gestión de Documentos" 
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

  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (value: string, index: number) => {
    setActiveTab(value);
    setActiveIndex(index);
  };

  return (
    <section className="w-full bg-black py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          Todo lo que necesitas en un solo lugar
        </h2>
        <div className="h-[35rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start">
          <div className="w-full h-full">
            {/* Tab Controls */}
            <div className="flex flex-row items-center justify-start p-2 bg-zinc-800 rounded-full border border-amber-500/30">
              {tabs.map((tab, index) => (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value, index)}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 ease-out focus:outline-none text-white font-medium
                    ${activeTab === tab.value ? "bg-amber-500/30 border border-amber-500/50" : ""}`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="mt-8">
              {tabs.map((tab, index) => (
                <motion.div
                  key={tab.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: activeTab === tab.value ? 1 : 0,
                    y: activeTab === tab.value ? 0 : 20,
                    zIndex: activeTab === tab.value ? 1 : 0,
                    position: activeTab === tab.value ? "relative" : "absolute",
                    pointerEvents: activeTab === tab.value ? "auto" : "none",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full"
                >
                  {tab.content}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}