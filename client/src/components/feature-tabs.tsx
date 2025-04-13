import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function FeatureTabs() {
  const tabs = [
    {
      title: "Dashboard",
      value: "dashboard",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-1 flex items-center justify-center">
          <img 
            src="/assets/dashboard.png" 
            alt="Vista del Dashboard" 
            className="object-cover w-full rounded-xl shadow-lg" 
          />
        </div>
      ),
    },
    {
      title: "Pagos",
      value: "pagos",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-1 flex items-center justify-center">
          <img 
            src="/assets/pagos.png" 
            alt="Gestión de Pagos" 
            className="object-cover w-full rounded-xl shadow-lg"  
          />
        </div>
      ),
    },
    {
      title: "Incidencias",
      value: "incidencias",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-1 flex items-center justify-center">
          <img 
            src="/assets/incidencias.png" 
            alt="Gestión de Incidencias" 
            className="object-cover w-full rounded-xl shadow-lg"  
          />
        </div>
      ),
    },
    {
      title: "Reservas",
      value: "reservas",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-1 flex items-center justify-center">
          <img 
            src="/assets/reservas.png" 
            alt="Gestión de Reservas" 
            className="object-cover w-full rounded-xl shadow-lg"  
          />
        </div>
      ),
    },
    {
      title: "Documentos",
      value: "documentos",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-1 flex items-center justify-center">
          <img 
            src="/assets/documentos.png" 
            alt="Gestión de Documentos" 
            className="object-cover w-full rounded-xl shadow-lg"  
          />
        </div>
      ),
    },
    {
      title: "Configuración",
      value: "configuracion",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-1 flex items-center justify-center">
          <img 
            src="/assets/configuracion.png" 
            alt="Configuración de Usuario" 
            className="object-cover w-full rounded-xl shadow-lg"  
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
    <section className="w-full bg-black py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
          Todo lo que necesitas en un solo lugar
        </h2>
        <div className="h-[30rem] md:h-[35rem] relative flex flex-col max-w-4xl mx-auto w-full items-center justify-start">
          {/* Tab Controls */}
          <div className="flex flex-row items-center justify-center p-2 overflow-x-auto mx-auto mb-6 bg-zinc-800 rounded-full border border-amber-500/30">
            {tabs.map((tab, index) => (
              <button
                key={tab.value}
                onClick={() => handleTabChange(tab.value, index)}
                className={`relative px-5 py-2 mx-1 rounded-full transition-all duration-300 ease-out focus:outline-none text-white font-medium whitespace-nowrap
                  ${activeTab === tab.value ? "bg-amber-500/30 border border-amber-500/50" : ""}`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="w-full h-full relative">
            {tabs.map((tab) => (
              <motion.div
                key={tab.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: activeTab === tab.value ? 1 : 0,
                  y: activeTab === tab.value ? 0 : 20,
                  zIndex: activeTab === tab.value ? 1 : 0,
                  position: activeTab === tab.value ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  pointerEvents: activeTab === tab.value ? "auto" : "none",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full"
              >
                {tab.content}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}