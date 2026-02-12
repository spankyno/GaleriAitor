
import React from 'react';
import { ViewMode, ImageFitMode, GaleriaItem } from '../types';

interface GalleryProps {
  images: GaleriaItem[];
  loading: boolean;
  viewMode: ViewMode;
  imageFit: ImageFitMode;
  onSetViewMode: (mode: ViewMode) => void;
  onSetImageFit: (fit: ImageFitMode) => void;
  onOpenLightbox: (index: number) => void;
  currentFolder: string | null;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ 
  images, 
  loading, 
  viewMode, 
  imageFit,
  onSetViewMode, 
  onSetImageFit,
  onOpenLightbox,
  currentFolder,
  isDarkMode,
  onToggleTheme
}) => {
  const copyToClipboard = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    const btn = e.currentTarget as HTMLElement;
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>';
    btn.classList.add('bg-green-600', 'text-white', 'scale-110');
    setTimeout(() => {
      btn.innerHTML = originalContent;
      btn.classList.remove('bg-green-600', 'text-white', 'scale-110');
    }, 2000);
  };

  const downloadImage = (e: React.MouseEvent, url: string, filename: string) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="h-full min-h-[70vh] flex flex-col items-center justify-center gap-10 animate-fade-in">
        <div className="relative">
          <div className="w-24 h-24 border-[3px] border-blue-600/10 dark:border-blue-500/5 rounded-full"></div>
          <div className="absolute inset-0 w-24 h-24 border-[3px] border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-slate-950 dark:text-white font-black text-2xl tracking-tight">Sincronizando Archivo</p>
          <p className="text-slate-500 dark:text-slate-300 text-sm font-bold uppercase tracking-widest">Conexión Neon-Edge Master</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto animate-fade-in pb-20">
      {/* Dynamic Sticky Header */}
      <div className="sticky top-0 z-20 -mx-4 lg:-mx-12 px-4 lg:px-12 py-8 mb-8 bg-slate-50/80 dark:bg-slate-950/90 backdrop-blur-xl transition-all border-b border-slate-100 dark:border-slate-900/50">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full shadow-lg shadow-blue-500/20"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 dark:text-slate-300">Repositorio de Activos</span>
            </div>
            <h2 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter">
              {currentFolder || 'Archivo Maestro'}
            </h2>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-widest">
              Mostrando <span className="text-blue-600 font-black">{images.length} registros</span> detectados en el sistema
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={onToggleTheme}
              className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl hover:border-blue-600 transition-all shadow-sm active:scale-95"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>

            {/* Image Fit Selector */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <button 
                onClick={() => onSetImageFit(ImageFitMode.COVER)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${imageFit === ImageFitMode.COVER ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 shadow-inner' : 'text-slate-400'}`}
              >
                Enfoque
              </button>
              <button 
                onClick={() => onSetImageFit(ImageFitMode.CONTAIN)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${imageFit === ImageFitMode.CONTAIN ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 shadow-inner' : 'text-slate-400'}`}
              >
                Completo
              </button>
            </div>

            {/* Individual View Mode Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onSetViewMode(ViewMode.NORMAL)}
                className={`p-3.5 rounded-2xl border transition-all ${viewMode === ViewMode.NORMAL ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                title="Vista Normal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </button>
              <button 
                onClick={() => onSetViewMode(ViewMode.MINIATURE)}
                className={`p-3.5 rounded-2xl border transition-all ${viewMode === ViewMode.MINIATURE ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                title="Vista Miniatura"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
              </button>
              <button 
                onClick={() => onSetViewMode(ViewMode.LIST)}
                className={`p-3.5 rounded-2xl border transition-all ${viewMode === ViewMode.LIST ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                title="Vista Detallada"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-40 bg-white/40 dark:bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 animate-fade-in">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg className="w-10 h-10 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Sin registros en este sector del archivo</p>
        </div>
      ) : (
        <div className={`
          grid gap-3
          ${viewMode === ViewMode.NORMAL ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4' : ''}
          ${viewMode === ViewMode.MINIATURE ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10' : ''}
          ${viewMode === ViewMode.LIST ? 'grid-cols-1' : ''}
        `}>
          {images.map((img, idx) => (
            <div 
              key={img.id}
              onClick={() => onOpenLightbox(idx)}
              className={`
                group relative bg-white dark:bg-slate-900 overflow-hidden cursor-pointer transition-all duration-500 animate-slide-up
                ${viewMode === ViewMode.NORMAL ? 'rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-blue-500/10' : ''}
                ${viewMode === ViewMode.MINIATURE ? 'rounded-2xl border border-slate-100 dark:border-slate-800 p-1' : ''}
                ${viewMode === ViewMode.LIST ? 'flex items-center gap-6 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800' : ''}
              `}
              style={{ animationDelay: `${idx * 15}ms` }}
            >
              {/* Image Layer */}
              <div className={`
                overflow-hidden relative bg-slate-100 dark:bg-slate-800
                ${viewMode === ViewMode.NORMAL ? 'aspect-[4/3]' : ''}
                ${viewMode === ViewMode.MINIATURE ? 'aspect-square rounded-xl' : ''}
                ${viewMode === ViewMode.LIST ? 'w-24 h-24 rounded-2xl flex-shrink-0 shadow-inner' : ''}
              `}>
                <img 
                  src={img.url} 
                  alt={img.carpeta} 
                  className={`w-full h-full transition-all duration-1000 group-hover:scale-110 ${imageFit === ImageFitMode.COVER ? 'object-cover' : 'object-contain p-4'}`}
                  loading="lazy"
                />
                
                {/* Integrated Actions Overlay (High Visibility Hover) */}
                <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]">
                  <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-4 group-hover:translate-x-0 transition-transform duration-300">
                    <button 
                      onClick={(e) => copyToClipboard(e, img.url)}
                      className="p-3.5 bg-white text-slate-950 rounded-2xl shadow-2xl hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110 active:scale-90 flex items-center justify-center"
                      title="Copiar Enlace"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    </button>
                    <button 
                      onClick={(e) => downloadImage(e, img.url, `galeriaitor_${img.id}.jpg`)}
                      className="p-3.5 bg-white text-slate-950 rounded-2xl shadow-2xl hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110 active:scale-90 flex items-center justify-center"
                      title="Descargar Activo"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>
                  </div>
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-2xl border border-blue-400/30">
                      Visualizar
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Layer */}
              <div className={`
                ${viewMode === ViewMode.NORMAL ? 'p-6' : ''}
                ${viewMode === ViewMode.MINIATURE ? 'hidden' : ''}
                ${viewMode === ViewMode.LIST ? 'flex-1 flex justify-between items-center' : ''}
              `}>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-black text-blue-600 dark:text-blue-500 tracking-tighter uppercase">ID-00{img.id}</span>
                    <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{img.carpeta}</span>
                  </div>
                  <p className="text-sm font-black text-slate-900 dark:text-slate-100 truncate max-w-[280px]">
                    {img.url.split('/').pop()?.replace(/%20/g, ' ') || 'Sin nombre'}
                  </p>
                </div>
                {viewMode === ViewMode.LIST && (
                  <div className="flex items-center gap-6">
                     <div className="hidden md:flex flex-col items-end">
                        <span className="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">Estado</span>
                        <span className="text-[10px] font-bold text-green-600 uppercase">Disponible</span>
                     </div>
                     <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 dark:border-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                     </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
