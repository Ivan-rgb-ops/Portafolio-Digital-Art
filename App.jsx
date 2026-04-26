import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Linkedin, Youtube } from 'lucide-react';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Socials from './pages/Socials';
import { SOCIAL_LINKS } from './constants';

const getIcon = (id) => {
  switch (id) {
    case 'instagram': return <Instagram size={20} />;
    case 'linkedin': return <Linkedin size={20} />;
    case 'youtube': return <Youtube size={20} />;
    default: return null;
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Portafolio', path: '/portfolio' },
    { name: 'Sobre mí', path: '/about' },
    { name: 'Redes sociales', path: '/socials' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/65 backdrop-blur-xl border-b border-gray-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] sm:h-20 flex items-center justify-between gap-4">
        <Link to="/" className="max-w-[220px] sm:max-w-none text-lg sm:text-2xl leading-none font-serif font-semibold tracking-tight text-gray-900 hover:opacity-70 transition-all duration-300 hover:tracking-[0.02em]">
          ABRIL CUENCA ART
        </Link>

        <div className="hidden md:flex space-x-12 text-[10px] font-medium uppercase tracking-[0.25em] text-gray-500">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative pb-2 hover:text-black transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:origin-center after:bg-gray-900 after:transition-transform after:duration-300 ${location.pathname.startsWith(link.path) ? 'text-black font-bold after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsOpen((open) => !open)}
          className="md:hidden shrink-0 p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-105"
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`fixed inset-x-0 bottom-0 top-[72px] sm:top-20 bg-white z-40 transition-transform duration-500 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex h-full flex-col justify-between px-6 pt-12 pb-10">
          <div className="flex flex-col items-center gap-8 text-xl sm:text-2xl font-light uppercase tracking-[0.2em] text-gray-900 text-center">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="transition-all duration-300 hover:text-blue-500 hover:-translate-y-1">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-gray-400">
            {SOCIAL_LINKS.map((social) => (
              <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="hover-icon hover:text-blue-600">
                {getIcon(social.id)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="motion-page">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:category" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/socials" element={<Socials />} />
      </Routes>
    </div>
  );
};

const Footer = () => {
  const location = useLocation();
  if (location.pathname === '/') return null;

  return (
    <footer id="portfolio-footer" className="py-16 px-6 border-t border-gray-100 bg-white/30 backdrop-blur-sm text-center relative z-10 transition-opacity duration-100">
      <div className="max-w-7xl mx-auto">
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} Abril Cuenca Art. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const AppShell = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={`min-h-screen flex flex-col overflow-x-hidden relative text-gray-900 bg-white ${isHome ? '' : 'pt-20'}`}>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] rounded-full opacity-40 blur-[120px] animated-orb"
          style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(255, 255, 255, 0) 70%)' }}
        ></div>
        <div
          className="absolute bottom-[8%] left-[-8%] w-[420px] h-[420px] rounded-full opacity-35 blur-[120px] animated-orb"
          style={{ background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, rgba(255, 255, 255, 0) 72%)', animationDuration: '19s' }}
        ></div>
      </div>

      {!isHome && <Navbar />}
      <main className="flex-grow relative z-10 flex flex-col">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <Router>
    <AppShell />
  </Router>
);

export default App;
