
import React, { useEffect, useCallback } from 'react';
import { GaleriaItem } from '../types';

interface LightboxProps {
  images: GaleriaItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  const currentImage = images[currentIndex];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentImage.url);
    alert('URL copiada al portapapeles');
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = currentImage.url;
    link.download = `imagen_${currentImage.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95 animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 sm:p-6 text-white z-10">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.3em] font-medium opacity-60">Visualizando</span>
          <span className="text-sm font-semibold tracking-wide">ID: {currentImage.id} | Carpeta: {currentImage.carpeta}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={copyToClipboard}
            className="p-3 rounded-full hover:bg-white/10 transition-soft"
            title="Copiar URL"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
          </button>
          <button 
            onClick={downloadImage}
            className="p-3 rounded-full hover:bg-white/10 transition-soft"
            title="Descargar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </button>
          <button 
            onClick={onClose}
            className="ml-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-soft"
            title="Cerrar (Esc)"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative flex items-center justify-center p-4 sm:p-12 overflow-hidden">
        {/* Prev Button */}
        <button 
          onClick={onPrev}
          className="absolute left-4 sm:left-10 z-10 p-4 rounded-full bg-black/20 hover:bg-white/10 text-white transition-soft border border-white/5"
          title="Anterior"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        {/* Large Image */}
        <div className="relative max-w-full max-h-full flex items-center justify-center">
            <img 
              key={currentImage.url}
              src={currentImage.url} 
              alt="Visualización" 
              className="max-w-full max-h-[80vh] object-contain shadow-2xl animate-scaleIn rounded-sm"
            />
        </div>

        {/* Next Button */}
        <button 
          onClick={onNext}
          className="absolute right-4 sm:right-10 z-10 p-4 rounded-full bg-black/20 hover:bg-white/10 text-white transition-soft border border-white/5"
          title="Siguiente"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Bottom Info / Counter */}
      <div className="p-6 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/60 text-xs font-medium tracking-[0.2em]">
          {currentIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  );
};

export default Lightbox;
