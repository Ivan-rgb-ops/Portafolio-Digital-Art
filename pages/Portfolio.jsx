import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES, ARTWORK } from '../constants';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { getImageUrl } from '../utils/media';

const Portfolio = () => {
  const { category } = useParams();
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

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
              cat.coverImage ||
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
              {art.imageUrl.endsWith('.mp4') ? (
                <div className="relative aspect-video w-full overflow-hidden">
                  <video
                    src={art.imageUrl}
                    className="w-full h-full object-cover opacity-100 group-hover:scale-[1.025] transition-all duration-700"
                    muted
                    playsInline
                    loop
                    preload="auto"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-900 group-hover:scale-110 transition-transform duration-300">
                      <Play size={20} fill="currentColor" className="ml-0.5" />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={getImageUrl(art.imageUrl, { width: 1200, fit: 'limit' })}
                  alt={art.title}
                  className="w-full h-auto object-cover opacity-100 group-hover:scale-[1.025] group-hover:opacity-95 transition-all duration-700"
                  loading="lazy"
                  decoding="async"
                />
              )}
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
          className="fixed inset-0 bg-[#070707] z-50 flex items-center justify-center p-4 md:p-8 motion-page cursor-zoom-out select-none"
          onClick={closeGallery}
        >
          {/* Close button at top-right of viewport */}
          <button
            onClick={closeGallery}
            className="fixed top-5 right-5 md:top-8 md:right-8 z-50 text-white/50 hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer"
            title="Cerrar"
          >
            <X size={32} strokeWidth={1.5} />
          </button>

          {/* Navigation arrows fixed to screen edges */}
          {filteredArtwork.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPreviousImage();
              }}
              disabled={isAtSequenceStart}
              className={`fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-2 transition-all duration-300 ${
                isAtSequenceStart
                  ? 'opacity-0 pointer-events-none'
                  : 'text-white/50 hover:text-white hover:scale-110 cursor-pointer'
              }`}
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>
          )}

          {filteredArtwork.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNextImage();
              }}
              disabled={isAtSequenceEnd}
              className={`fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-2 transition-all duration-300 ${
                isAtSequenceEnd
                  ? 'opacity-0 pointer-events-none'
                  : 'text-white/50 hover:text-white hover:scale-110 cursor-pointer'
              }`}
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>
          )}

          {/* Center media element */}
          <div
            className="relative w-full max-w-[min(94vw,1400px)] h-full max-h-[85vh] md:max-h-[90vh] flex flex-col items-center justify-center motion-reveal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-full max-h-full flex flex-col items-center justify-center">
              {selectedGallery.gallery[galleryIndex].imageUrl.endsWith('.mp4') ? (
                <div className="relative flex items-center justify-center w-full h-full">
                  {isVideoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                      <div className="w-10 h-10 border-[3px] border-white/20 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                  <video
                    key={`${selectedGallery.id}-${galleryIndex}`}
                    src={selectedGallery.gallery[galleryIndex].imageUrl}
                    className="gallery-main-image pointer-events-auto block w-auto max-w-[85vw] md:max-w-[92vw] h-auto max-h-[75vh] md:max-h-[84vh] object-contain rounded-none shadow-2xl"
                    controls
                    autoPlay
                    playsInline
                    onLoadStart={() => setIsVideoLoading(true)}
                    onCanPlay={() => setIsVideoLoading(false)}
                    onPlaying={() => setIsVideoLoading(false)}
                    onWaiting={() => setIsVideoLoading(true)}
                  />
                </div>
              ) : (
                <img
                  key={`${selectedGallery.id}-${galleryIndex}`}
                  src={getImageUrl(selectedGallery.gallery[galleryIndex].imageUrl, { width: 2200, fit: 'limit' })}
                  alt={`${selectedGallery.title} ${galleryIndex + 1}`}
                  className="gallery-main-image pointer-events-auto block w-auto max-w-[85vw] md:max-w-[92vw] h-auto max-h-[75vh] md:max-h-[84vh] object-contain rounded-none shadow-2xl select-none"
                />
              )}

              {/* Title & Multi-image dots below the image/video */}
              <div className="mt-6 text-center select-none">
                <p className="text-white/85 text-[11px] md:text-[12px] uppercase tracking-[0.35em] font-light">
                  {selectedGallery.title}
                </p>
                {selectedGallery.gallery.length > 1 && (
                  <div className="mt-4 flex items-center justify-center gap-2.5">
                    {selectedGallery.gallery.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setGalleryIndex(idx);
                        }}
                        className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === galleryIndex ? 'bg-white w-6' : 'bg-white/30 w-1.5 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
