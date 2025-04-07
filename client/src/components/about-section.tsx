import { memo } from "react";
import AnimatedWordCycle from "@/components/ui/animated-text-cycle";

export const AboutSection = memo(function AboutSection() {
  return (
    <section className="w-full bg-[#0A0A0A] py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 milovat-text gold-gradient-text">
            Milovat
          </h2>
          <p className="text-white text-lg leading-relaxed mb-8">
            Plataforma centralizada y segura diseñada específicamente para la administración de edificios residenciales. 
            Con un enfoque en seguridad de datos y experiencia de usuario, unifica todas las operaciones administrativas, 
            sistemas de acceso y monitoreo energético en una sola interfaz.
          </p>
          
          <div className="text-center text-xl md:text-2xl text-white mb-8">
            Tu <AnimatedWordCycle 
                words={[
                    "hogar",
                    "edificio",
                    "propiedad",
                    "espacio",
                    "información",
                    "comodidad"
                ]}
                interval={2500}
                className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 font-bold" 
            /> en una sola app
          </div>
        </div>
      </div>
    </section>
  );
});