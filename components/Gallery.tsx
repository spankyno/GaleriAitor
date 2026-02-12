
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
          <div className="absolute inset-0 w-24 h-24 border-[3px] border-blue-600 rounded-full border-t-transparent animate-spin shadow-[0_0_20px_rgba(37,99,235,0.2)]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-slate-950 dark:text-white font-black text-2xl tracking-tight">Sincronizando Archivo</p>
          <p className="text-slate-400 dark:text-slate-500 text-sm font-bold uppercase tracking-widest">Protocolo Neon-Edge Activo</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto animate-fade-in pb-24">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-blue-600 rounded-full shadow-lg shadow-blue-500/20"></div>
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Repositorio en Línea</span>
          </div>
          <h2 className="text-6xl font-black text-slate-950 dark:text-white tracking-tighter">
            {currentFolder || 'Archivo Maestro'}
          </h2>
          <div className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-2xl bg-slate-100 dark:bg-slate-900 border-2 border-white dark:border-slate-950 shadow-sm overflow-hidden flex items-center justify-center text-[10px] font-bold text-slate-400">
                  {i}
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              <span className="text-blue-600 dark:text-blue-500 font-black">{images.length}</span> activos digitales detectados
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button 
            onClick={onToggleTheme}
            className="group p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-blue-600 hover:shadow-lg dark:hover:shadow-blue-900/10 rounded-[1.5rem] transition-all active:scale-90"
            title="Cambiar Tema"
          >
            {isDarkMode ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-[1.75rem] shadow-sm border border-slate-200 dark:border-slate-800">
            {[
              { mode: ViewMode.NORMAL, icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', label: 'Grid' },
              { mode: ViewMode.MINIATURE, icon: 'M4 6h16M4 10h16M4 14h16M4 18h16', label: 'Mini' },
              { mode: ViewMode.LIST, icon: 'M4 6h16M4 12h16M4 18h16', label: 'List' }
            ].map((btn) => (
              <button 
                key={btn.mode}
                onClick={() => onSetViewMode(btn.mode)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-black transition-all ${
                  viewMode === btn.mode 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' 
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-950 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={btn.icon} /></svg>
                {viewMode === btn.mode && <span className="hidden sm:inline">{btn.label}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-44 bg-white/40 dark:bg-slate-900/20 rounded-[4rem] border-2 border-dashed border-slate-200 dark:border-slate-800 transition-colors">
          <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800/50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner group overflow-hidden">
            <svg className="w-14 h-14 text-slate-300 dark:text-slate-700 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <h3 className="text-3xl font-black text-slate-950 dark:text-white mb-3 tracking-tighter">Archivo Desierto</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto text-sm font-bold leading-relaxed px-6">
            No se han detectado registros en la tabla <code className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-blue-600 font-mono">gallery</code>. 
            Verifica tu conexión en Neon Dashboard.
          </p>
        </div>
      ) : (
        <div className={`
          grid gap-12
          ${viewMode === ViewMode.NORMAL ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : ''}
          ${viewMode === ViewMode.MINIATURE ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8' : ''}
          ${viewMode === ViewMode.LIST ? 'grid-cols-1' : ''}
        `}>
          {images.map((img, idx) => (
            <div 
              key={img.id}
              onClick={() => onOpenLightbox(idx)}
              className={`
                group relative bg-white dark:bg-slate-900/50 overflow-hidden cursor-pointer transition-all duration-700 animate-slide-up
                ${viewMode === ViewMode.NORMAL ? 'rounded-[3rem] border border-slate-100 dark:border-slate-800/80 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] hover:-translate-y-4' : ''}
                ${viewMode === ViewMode.MINIATURE ? 'rounded-3xl border border-slate-100 dark:border-slate-800/80 p-2.5 hover:shadow-2xl dark:hover:shadow-black hover:scale-105' : ''}
                ${viewMode === ViewMode.LIST ? 'flex items-center gap-10 p-10 rounded-[3.5rem] hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 shadow-sm' : ''}
              `}
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              {/* Image Container */}
              <div className={`
                overflow-hidden relative bg-slate-100 dark:bg-slate-800
                ${viewMode === ViewMode.NORMAL ? 'aspect-[4/3] rounded-[2.5rem] m-2.5' : ''}
                ${viewMode === ViewMode.MINIATURE ? 'aspect-square rounded-2xl' : ''}
                ${viewMode === ViewMode.LIST ? 'w-40 h-40 rounded-[2.5rem] flex-shrink-0' : ''}
              `}>
                <img 
                  src={img.url} 
                  alt={img.carpeta} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {viewMode === ViewMode.NORMAL && (
                  <div className="absolute bottom-6 left-6 right-6 flex justify-center items-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="px-5 py-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl text-[10px] font-black text-slate-950 dark:text-white uppercase tracking-[0.2em] border border-white/20 shadow-xl">
                      Ver Recurso
                    </span>
                  </div>
                )}
              </div>

              {/* Data Content */}
              <div className={`
                ${viewMode === ViewMode.NORMAL ? 'px-8 pb-10 pt-4' : ''}
                ${viewMode === ViewMode.MINIATURE ? 'mt-4 px-2 pb-2 text-center' : ''}
                ${viewMode === ViewMode.LIST ? 'flex-1 flex justify-between items-center' : ''}
              `}>
                <div className={viewMode === ViewMode.LIST ? 'flex flex-col gap-3' : ''}>
                  <div className={`flex items-center gap-3 mb-2 ${viewMode === ViewMode.MINIATURE ? 'justify-center' : ''}`}>
                    <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
                    <p className={`font-black text-slate-950 dark:text-white leading-none ${viewMode === ViewMode.MINIATURE ? 'text-[13px]' : 'text-2xl'}`}>
                      #{img.id}
                    </p>
                  </div>
                  <p className={`text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-tight flex items-center gap-2 ${viewMode === ViewMode.MINIATURE ? 'text-[9px] justify-center' : 'text-[13px]'}`}>
                    <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                    <span className="text-slate-800 dark:text-slate-200 truncate">{img.carpeta}</span>
                  </p>
                </div>

                {/* Interaction Controls */}
                <div className={`
                  flex items-center gap-3
                  ${viewMode === ViewMode.MINIATURE ? 'mt-4 justify-center' : ''}
                  ${viewMode === ViewMode.NORMAL ? 'mt-8' : ''}
                `}>
                  <button 
                    onClick={(e) => copyToClipboard(e, img.url)}
                    className="p-4 rounded-[1.25rem] bg-slate-100/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all shadow-sm active:scale-90"
                    title="Copiar URL de Imagen"
                  >
                    <svg className={`${viewMode === ViewMode.MINIATURE ? 'w-4 h-4' : 'w-5.5 h-5.5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                  </button>
                  <button 
                    onClick={(e) => downloadImage(e, img.url, `galeriaitor_${img.id}.jpg`)}
                    className="p-4 rounded-[1.25rem] bg-slate-100/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all shadow-sm active:scale-90"
                    title="Descargar Activo"
                  >
                    <svg className={`${viewMode === ViewMode.MINIATURE ? 'w-4 h-4' : 'w-5.5 h-5.5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
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
