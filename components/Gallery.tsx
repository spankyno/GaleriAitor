
import React from 'react';
import { ViewMode, GaleriaItem } from '../types';

interface GalleryProps {
  images: GaleriaItem[];
  loading: boolean;
  viewMode: ViewMode;
  onSetViewMode: (mode: ViewMode) => void;
  onOpenLightbox: (index: number) => void;
  currentFolder: string | null;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ 
  images, 
  loading, 
  viewMode, 
  onSetViewMode, 
  onOpenLightbox,
  currentFolder,
  isDarkMode,
  onToggleTheme
}) => {
  const copyToClipboard = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    // Notificación simple
    const btn = e.currentTarget as HTMLElement;
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>';
    setTimeout(() => btn.innerHTML = originalContent, 2000);
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
      <div className="h-full min-h-[60vh] flex flex-col items-center justify-center gap-6 animate-fade-in">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-blue-500/10 dark:border-blue-500/5 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin shadow-lg"></div>
        </div>
        <div className="text-center">
          <p className="text-slate-900 dark:text-white font-bold text-lg">Cargando Galería</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 animate-pulse">Conectando con Neon Database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto animate-fade-in pb-20">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Exposición Actual</span>
          </div>
          <h2 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter">
            {currentFolder || 'Colección'}
          </h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-3 flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            {images.length} activos digitales encontrados
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleTheme}
            className="group p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-200 hover:border-blue-600 rounded-2xl transition-all shadow-sm active:scale-95"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            {[
              { mode: ViewMode.NORMAL, icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', label: 'Mosaico' },
              { mode: ViewMode.MINIATURE, icon: 'M4 6h16M4 10h16M4 14h16M4 18h16', label: 'Mini' },
              { mode: ViewMode.LIST, icon: 'M4 6h16M4 12h16M4 18h16', label: 'Lista' }
            ].map((btn) => (
              <button 
                key={btn.mode}
                onClick={() => onSetViewMode(btn.mode)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  viewMode === btn.mode 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={btn.icon} /></svg>
                {viewMode === btn.mode && <span className="hidden sm:inline">{btn.label}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-inner">
          <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <svg className="w-12 h-12 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Galería Desierta</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto text-sm font-medium">No se han sincronizado imágenes. Por favor, verifica tu base de datos en Neon.</p>
        </div>
      ) : (
        <div className={`
          grid gap-10
          ${viewMode === ViewMode.NORMAL ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : ''}
          ${viewMode === ViewMode.MINIATURE ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6' : ''}
          ${viewMode === ViewMode.LIST ? 'grid-cols-1' : ''}
        `}>
          {images.map((img, idx) => (
            <div 
              key={img.id}
              onClick={() => onOpenLightbox(idx)}
              className={`
                group relative bg-white dark:bg-slate-900 overflow-hidden cursor-pointer transition-all duration-500
                ${viewMode === ViewMode.NORMAL ? 'rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2' : ''}
                ${viewMode === ViewMode.MINIATURE ? 'rounded-2xl border border-slate-100 dark:border-slate-800 p-2 hover:shadow-xl dark:hover:shadow-black/50' : ''}
                ${viewMode === ViewMode.LIST ? 'flex items-center gap-8 p-6 rounded-[2rem] hover:bg-white dark:hover:bg-slate-800/60 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm' : ''}
              `}
            >
              {/* Image Container */}
              <div className={`
                overflow-hidden relative bg-slate-100 dark:bg-slate-800
                ${viewMode === ViewMode.NORMAL ? 'aspect-[4/3]' : ''}
                ${viewMode === ViewMode.MINIATURE ? 'aspect-square rounded-xl' : ''}
                ${viewMode === ViewMode.LIST ? 'w-28 h-28 rounded-2xl flex-shrink-0' : ''}
              `}>
                <img 
                  src={img.url} 
                  alt={img.carpeta} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {viewMode === ViewMode.NORMAL && (
                  <div className="absolute top-5 left-5">
                    <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-[9px] font-black text-white uppercase tracking-[0.2em] border border-white/10">
                      {img.carpeta}
                    </span>
                  </div>
                )}
              </div>

              {/* Data Content */}
              <div className={`
                ${viewMode === ViewMode.NORMAL ? 'p-6' : ''}
                ${viewMode === ViewMode.MINIATURE ? 'mt-4 px-2 pb-2' : ''}
                ${viewMode === ViewMode.LIST ? 'flex-1 flex justify-between items-center' : ''}
              `}>
                <div className={viewMode === ViewMode.LIST ? 'flex flex-col' : ''}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-blue-600 font-black text-xs">#</span>
                    <p className={`font-black text-slate-950 dark:text-white leading-none ${viewMode === ViewMode.MINIATURE ? 'text-[11px]' : 'text-base'}`}>
                      {img.id}
                    </p>
                  </div>
                  <p className={`text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tighter ${viewMode === ViewMode.MINIATURE ? 'text-[9px]' : 'text-[11px]'}`}>
                    Ubicación: <span className="text-slate-800 dark:text-slate-200">{img.carpeta}</span>
                  </p>
                </div>

                {/* Interaction Controls */}
                <div className={`
                  flex items-center gap-2.5
                  ${viewMode === ViewMode.MINIATURE ? 'mt-3 justify-end' : ''}
                `}>
                  <button 
                    onClick={(e) => copyToClipboard(e, img.url)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all shadow-sm active:scale-90"
                    title="Copiar URL"
                  >
                    <svg className={`${viewMode === ViewMode.MINIATURE ? 'w-3.5 h-3.5' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                  </button>
                  <button 
                    onClick={(e) => downloadImage(e, img.url, `galeriaitor_${img.id}.jpg`)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all shadow-sm active:scale-90"
                    title="Descargar"
                  >
                    <svg className={`${viewMode === ViewMode.MINIATURE ? 'w-3.5 h-3.5' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
