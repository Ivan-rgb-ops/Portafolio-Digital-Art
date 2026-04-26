import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES, ARTWORK } from '../constants';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from '../utils/media';

const Portfolio = () => {
  const { category } = useParams();
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const filteredArtwork = useMemo(() => {
    if (!category) return [];
    return ARTWORK.filter((art) => art.category === category);
  }, [category]);

  const currentCategoryLabel = useMemo(
    () => CATEGORIES.find((c) => c.id === category)?.label,
    [category]
  );

  const openGallery = (art, artIndex) => {
    const galleryItems = art.gallery?.length
      ? art.gallery
      : [{ id: `${art.id}-single`, imageUrl: art.imageUrl }];

    setSelectedGallery({ ...art, gallery: galleryItems });
    setSelectedArtworkIndex(artIndex);
    setGalleryIndex(0);
    document.body.style.overflow = 'hidden';

    const footer = document.getElementById('portfolio-footer');
    if (footer) {
      footer.style.transition = 'none';
      footer.style.opacity = '0';
      footer.style.pointerEvents = 'none';
    }
  };

  const closeGallery = () => {
    setSelectedGallery(null);
    setSelectedArtworkIndex(0);
    setGalleryIndex(0);
    document.body.style.overflow = 'unset';

    const footer = document.getElementById('portfolio-footer');
    if (footer) {
      footer.style.transition = 'opacity 100ms ease-out';
      footer.style.opacity = '1';
      footer.style.pointerEvents = 'auto';
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
      const footer = document.getElementById('portfolio-footer');
      if (footer) {
        footer.style.opacity = '1';
        footer.style.pointerEvents = 'auto';
      }
    };
  }, []);

  const goToNextImage = () => {
    if (!selectedGallery) return;

    if (galleryIndex < selectedGallery.gallery.length - 1) {
      setGalleryIndex((prev) => prev + 1);
      return;
    }

    if (selectedArtworkIndex >= filteredArtwork.length - 1) {
      return;
    }

    const nextArtworkIndex = selectedArtworkIndex + 1;
    const nextArtwork = filteredArtwork[nextArtworkIndex];
    const nextGalleryItems = nextArtwork.gallery?.length
      ? nextArtwork.gallery
      : [{ id: `${nextArtwork.id}-single`, imageUrl: nextArtwork.imageUrl }];

    setSelectedArtworkIndex(nextArtworkIndex);
    setSelectedGallery({ ...nextArtwork, gallery: nextGalleryItems });
    setGalleryIndex(0);
  };

  const goToPreviousImage = () => {
    if (!selectedGallery) return;

    if (galleryIndex > 0) {
      setGalleryIndex((prev) => prev - 1);
      return;
    }

    if (selectedArtworkIndex <= 0) {
      return;
    }

    const previousArtworkIndex = selectedArtworkIndex - 1;
    const previousArtwork = filteredArtwork[previousArtworkIndex];
    const previousGalleryItems = previousArtwork.gallery?.length
      ? previousArtwork.gallery
      : [{ id: `${previousArtwork.id}-single`, imageUrl: previousArtwork.imageUrl }];

    setSelectedArtworkIndex(previousArtworkIndex);
    setSelectedGallery({ ...previousArtwork, gallery: previousGalleryItems });
    setGalleryIndex(previousGalleryItems.length - 1);
  };

  useEffect(() => {
    if (!selectedGallery) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeGallery();
      }

      if (event.key === 'ArrowRight') {
        goToNextImage();
      }

      if (event.key === 'ArrowLeft') {
        goToPreviousImage();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedGallery, galleryIndex, selectedArtworkIndex, filteredArtwork.length]);

  const isAtSequenceStart = selectedGallery
    ? selectedArtworkIndex === 0 && galleryIndex === 0
    : false;

  const isAtSequenceEnd = selectedGallery
    ? selectedArtworkIndex === filteredArtwork.length - 1 &&
      galleryIndex === selectedGallery.gallery.length - 1
    : false;

  if (!category) {
    return (
      <div className="px-4 sm:px-6 py-10 sm:py-12 max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="motion-reveal text-4xl sm:text-5xl md:text-6xl font-editorial mb-4 text-gray-900 leading-none">
            Portafolio
          </h1>
          <p className="motion-reveal motion-delay-1 text-gray-400 uppercase tracking-[0.2em] text-[10px]">
            Galería de proyectos
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat, index) => {
            const coverImage =
              ARTWORK.find((a) => a.category === cat.id)?.imageUrl ||
              'https://picsum.photos/seed/placeholder/800/1000';

            return (
              <Link
                key={cat.id}
                to={`/portfolio/${cat.id}`}
                className="hover-card motion-reveal group relative block aspect-[4/5] overflow-hidden rounded-[24px] bg-gray-100 shadow-sm"
                style={{ animationDelay: `${120 + index * 90}ms` }}
              >
                <img
                  src={getImageUrl(coverImage, { width: 1200, fit: 'limit' })}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.08]"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.10),rgba(15,23,42,0.34))] group-hover:bg-[linear-gradient(180deg,rgba(15,23,42,0.16),rgba(15,23,42,0.5))] transition-colors duration-500 flex flex-col items-center justify-center p-6 text-center">
                  <h2 className="text-white text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-bold drop-shadow-md transition-transform duration-500 group-hover:-translate-y-1">
                    {cat.label}
                  </h2>
                  <div className="mt-4 h-px w-10 bg-white/60 transition-all duration-500 group-hover:w-16 group-hover:bg-white"></div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 py-10 sm:py-12 max-w-7xl mx-auto">
      <div className="mb-10 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 border-b border-gray-100 pb-6 sm:pb-8">
        <div>
          <Link
            to="/portfolio"
            className="motion-reveal inline-flex items-center text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-blue-600 transition-colors mb-4 group"
          >
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver al portafolio
          </Link>
          <h1 className="motion-reveal motion-delay-1 text-4xl sm:text-5xl md:text-6xl font-editorial text-gray-900 leading-none">
            {currentCategoryLabel}
          </h1>
        </div>

        <p className="motion-reveal motion-delay-2 text-[10px] text-gray-400 uppercase tracking-[0.3em] italic">
          {filteredArtwork.length} {filteredArtwork.length === 1 ? 'Pieza' : 'Piezas'}
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
        {filteredArtwork.map((art, index) => (
          <div
            key={art.id}
            className="motion-reveal break-inside-avoid group cursor-pointer"
            style={{ animationDelay: `${120 + index * 80}ms` }}
            onClick={() => openGallery(art, index)}
          >
            <div className="hover-card overflow-hidden bg-gray-50 rounded-[24px] transition-all duration-500 relative">
              <img
                src={getImageUrl(art.imageUrl, { width: 1200, fit: 'limit' })}
                alt={art.title}
                className="w-full h-auto object-cover opacity-100 group-hover:scale-[1.025] group-hover:opacity-95 transition-all duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.05))] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              {art.gallery && art.gallery.length > 1 && (
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-bold text-gray-900 shadow-sm">
                  1/{art.gallery.length}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedGallery && selectedGallery.gallery && (
        <div
          className="fixed inset-0 bg-black/92 backdrop-blur-xl z-50 flex items-center justify-center p-3 sm:p-4 motion-page"
          onClick={closeGallery}
        >
          <div className="relative w-full max-w-[min(96vw,1100px)] flex flex-col items-center motion-reveal">
            <div
              className="gallery-frame relative w-auto max-w-full rounded-[22px] sm:rounded-[28px] overflow-hidden mb-3 sm:mb-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                key={`backdrop-${selectedGallery.id}-${galleryIndex}`}
                src={getImageUrl(selectedGallery.gallery[galleryIndex].imageUrl, { width: 1800, fit: 'limit' })}
                alt=""
                aria-hidden="true"
                className="gallery-backdrop w-full h-full object-cover rounded-[22px] sm:rounded-[28px]"
              />
              <img
                key={`${selectedGallery.id}-${galleryIndex}`}
                src={getImageUrl(selectedGallery.gallery[galleryIndex].imageUrl, { width: 1800, fit: 'limit' })}
                alt={`${selectedGallery.title} ${galleryIndex + 1}`}
                className="gallery-main-image block w-auto max-w-full h-auto max-h-[62vh] sm:max-h-[70vh] rounded-[22px] sm:rounded-[28px]"
              />

              {filteredArtwork.length > 1 && (
                <button
                  onClick={goToPreviousImage}
                  disabled={isAtSequenceStart}
                  className={`absolute z-20 left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${
                    isAtSequenceStart
                      ? 'bg-white/10 text-white/35 cursor-not-allowed'
                      : 'bg-white/20 hover:bg-white/40 text-white hover:scale-110'
                  }`}
                >
                  <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                </button>
              )}

              {filteredArtwork.length > 1 && (
                <button
                  onClick={goToNextImage}
                  disabled={isAtSequenceEnd}
                  className={`absolute z-20 right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${
                    isAtSequenceEnd
                      ? 'bg-white/10 text-white/35 cursor-not-allowed'
                      : 'bg-white/20 hover:bg-white/40 text-white hover:scale-110'
                  }`}
                >
                  <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                </button>
              )}

              <button
                onClick={closeGallery}
                className="absolute z-20 top-2 sm:top-4 right-2 sm:right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300 hover:rotate-90"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>

              <div className="absolute z-20 bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {selectedGallery.gallery.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === galleryIndex ? 'bg-white w-6' : 'bg-white/50 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="text-center" onClick={(e) => e.stopPropagation()}>
              <p className="text-white text-xs sm:text-sm font-light uppercase tracking-[0.3em] sm:tracking-widest">
                {selectedGallery.title}
              </p>
              <p className="text-white/60 text-xs mt-2">
                {galleryIndex + 1} de {selectedGallery.gallery.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
