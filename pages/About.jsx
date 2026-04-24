import React from 'react';

const About = () => {
  return (
    <div className="px-6 py-20 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-16 items-start">
        <div className="w-full md:w-1/2 motion-reveal">
          <div className="relative group floating-accent">
            <div className="absolute -inset-4 bg-blue-500/5 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src="https://picsum.photos/seed/artist/800/1200"
              alt="Abril Cuenca Art Profile"
              className="w-full h-auto grayscale opacity-90 hover:opacity-100 hover:grayscale-0 transition-all duration-1000 relative z-10 rounded-[28px] shadow-xl border border-gray-100"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="motion-reveal motion-delay-1 text-5xl font-serif mb-10 italic text-gray-900">Sobre Mí</h1>
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

            <div className="motion-reveal motion-delay-4 pt-10">
              <a href="mailto:contact@abrilcuenca.com" className="hover-lift inline-block px-10 py-5 bg-gray-900 text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/20 rounded-full">
                Trabajemos juntos
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
