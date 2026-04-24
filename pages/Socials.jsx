import React from 'react';
import { Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import { SOCIAL_LINKS, CONTACT_INFO } from '../constants';

const getIcon = (id) => {
  switch (id) {
    case 'instagram': return <Instagram size={20} />;
    case 'linkedin': return <Linkedin size={20} />;
    case 'youtube': return <Youtube size={20} />;
    default: return <Instagram size={20} />;
  }
};

const Socials = () => {
  return (
    <div className="px-6 py-20 max-w-2xl mx-auto">
      <header className="mb-20 text-center">
        <h1 className="motion-reveal text-4xl font-serif mb-4 italic text-gray-900">Conectemos</h1>
        <p className="motion-reveal motion-delay-1 text-gray-400 tracking-[0.3em] text-[10px] uppercase">Mantente al tanto de mis últimos procesos y noticias</p>
      </header>

      <div className="space-y-4">
        {SOCIAL_LINKS.map((link, index) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="motion-reveal hover-card group flex items-center justify-between p-8 bg-gray-50 hover:bg-white border border-gray-100 hover:border-blue-500/30 transition-all duration-500 rounded-[24px]"
            style={{ animationDelay: `${120 + index * 90}ms` }}
          >
            <div className="flex items-center space-x-6 text-gray-400 group-hover:text-gray-900 transition-colors">
              <span className="opacity-50 group-hover:text-blue-600 group-hover:opacity-100">{getIcon(link.id)}</span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{link.name}</span>
            </div>
            <span className="text-[10px] text-gray-400 group-hover:text-blue-500 transition-colors italic tracking-widest">{link.handle}</span>
          </a>
        ))}
      </div>

      <div className="motion-reveal motion-delay-4 mt-20 pt-20 border-t border-gray-100 text-center">
        <div className="inline-flex items-center space-x-3 text-gray-400 mb-4 uppercase tracking-[0.4em] text-[9px]">
          <Mail size={12} className="text-blue-500/50" />
          <span>Business Inquiries</span>
        </div>
        <a href={`mailto:${CONTACT_INFO.email}`} className="text-xl font-light text-gray-600 hover:text-black transition-colors tracking-tight inline-block hover-lift">
          {CONTACT_INFO.email}
        </a>
      </div>
    </div>
  );
};

export default Socials;
