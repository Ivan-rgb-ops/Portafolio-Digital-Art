import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube, Mail, ArrowRight } from 'lucide-react';
import { ARTWORK, SOCIAL_LINKS, CONTACT_INFO } from '../constants';
import { getImageUrl } from '../utils/media';

const getIcon = (id) => {
  switch (id) {
    case 'instagram': return <Instagram size={20} strokeWidth={2} />;
    case 'linkedin': return <Linkedin size={20} strokeWidth={2} />;
    case 'youtube': return <Youtube size={20} strokeWidth={2} />;
    case 'gmail': return <Mail size={20} strokeWidth={2} />;
    default: return null;
  }
};

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBackdropReady, setIsBackdropReady] = useState(false);

  const backgroundImages = ARTWORK.map((art) => art.imageUrl);
  const homeLinks = [
    ...SOCIAL_LINKS,
    {
      id: 'gmail',
      name: 'Gmail',
      url: CONTACT_INFO.gmailComposeUrl,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center bg-slate-100">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.88),rgba(241,245,249,0.94))]"></div>

      <div className={`absolute inset-0 z-0 transition-opacity duration-700 ${isBackdropReady ? 'opacity-100' : 'opacity-0'}`}>
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-70' : 'opacity-0'}`}
          >
            <img
              src={getImageUrl(img, { width: 1800, fit: 'limit' })}
              alt="Background Art"
              className="hero-image w-full h-full object-cover [filter:saturate(0.72)_brightness(1.08)_contrast(0.92)]"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              onLoad={() => {
                if (index === 0) setIsBackdropReady(true);
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.26),rgba(255,255,255,0.14),rgba(255,255,255,0.24))] backdrop-blur-0 sm:backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 text-center flex flex-col items-center px-6 pt-10 sm:pt-0">
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tighter text-gray-900 select-none drop-shadow-sm leading-[0.9]">
          <span className="hero-title-line">ABRIL</span>
          <span className="hero-title-line">CUENCA</span>
        </h1>

        <p className="motion-reveal motion-delay-1 mt-4 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] sm:tracking-[0.5em] text-gray-800 font-bold bg-white/45 px-3 sm:px-4 py-1 rounded-full glass-panel">
          Digital Artist & Animator
        </p>

        <Link to="/portfolio" className="motion-reveal motion-delay-2 hover-lift mt-10 sm:mt-12 group flex items-center space-x-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-gray-900/90 text-white text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold hover:bg-gray-900 rounded-full shadow-2xl backdrop-blur-md">
          <span>Ver portafolio</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="absolute bottom-14 sm:bottom-20 left-0 w-full z-10 flex flex-col items-center floating-accent px-6">
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-gray-900">
          {homeLinks.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target={social.id === 'gmail' ? undefined : '_blank'}
              rel={social.id === 'gmail' ? undefined : 'noopener noreferrer'}
              className="hover-icon bg-white/55 p-2 rounded-full glass-panel shadow-sm hover:text-blue-600"
              title={social.name}
            >
              {getIcon(social.id)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
