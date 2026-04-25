import React from 'react';

const About = () => {
  return (
    <div className="px-6 py-20 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row-reverse gap-16 items-start">
        <div className="w-full md:w-[44%] motion-reveal">
          <div className="relative group floating-accent">
            <div className="absolute -inset-4 bg-blue-500/5 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src="https://picsum.photos/seed/artist/800/1200"
              alt="Abril Cuenca Art Profile"
              className="w-full h-auto grayscale opacity-90 hover:opacity-100 hover:grayscale-0 transition-all duration-1000 relative z-10 rounded-[28px] shadow-xl border border-gray-100"
            />
          </div>
        </div>

        <div className="w-full md:w-[56%]">
          <h1 className="motion-reveal motion-delay-1 text-5xl md:text-6xl font-editorial mb-10 text-gray-900 leading-none text-left">Sobre Mí</h1>
          <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
            <p className="motion-reveal motion-delay-2">
              Soy Abril Cuenca, diseñadora y animadora digital, con experiencia en ilustración y desarrollo visual.
            </p>
            <p className="motion-reveal motion-delay-3">
              Enfocada en crear universos visuales con identidad propia y coherencia narrativa. Me interesa especialmente el proceso creativo detrás de cada pieza: desde la construcción del concepto hasta su materialización final. A través de la animación y la ilustración, busco dar vida a ideas que se sientan orgánicas, expresivas y memorables, manteniendo siempre un alto estándar técnico y estético.
            </p>
            <p className="motion-reveal motion-delay-4">
              A lo largo de mi desarrollo profesional, he construido una voz visual versátil y consciente, capaz de adaptarse a distintos proyectos sin perder carácter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
