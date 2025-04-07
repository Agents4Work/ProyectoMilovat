import { memo } from "react";

export const AboutSection = memo(function AboutSection() {
  return (
    <section className="w-full bg-[#0A0A0A] py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 milovat-text gold-gradient-text">
            Milovat
          </h2>
          <p className="text-white text-lg leading-relaxed">
            Plataforma centralizada y segura diseñada específicamente para la administración de edificios residenciales. 
            Con un enfoque en seguridad de datos y experiencia de usuario, unifica todas las operaciones administrativas, 
            sistemas de acceso y monitoreo energético en una sola interfaz.
          </p>
        </div>
      </div>
    </section>
  );
});