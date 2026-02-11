
import React from 'react';
import { ViewMode, GaleriaItem } from '../types';

interface GalleryProps {
  images: GaleriaItem[];
  loading: boolean;
  viewMode: ViewMode;
  onSetViewMode: (mode: ViewMode) => void;
  onOpenLightbox: (index: number) => void;
  currentFolder: string | null;
}

const Gallery: React.FC<GalleryProps> = ({ 
  images, 
  loading, 
  viewMode, 
  onSetViewMode, 
  onOpenLightbox,
  currentFolder
}) => {
  const copyToClipboard = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    alert('URL copiada al portapapeles');
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
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-light text-gray-800 dark:text-gray-100">{currentFolder || 'Todas las imágenes'}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{images.length} elementos encontrados</p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto pr-12 lg:pr-0">
          <div className="flex items-center gap-1 bg-white dark:bg-gray-900 p-1 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <button 
              onClick={() => onSetViewMode(ViewMode.NORMAL)}
              className={`p-2 rounded-lg transition-soft ${viewMode === ViewMode.NORMAL ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
              title="Vista Normal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
            <button 
              onClick={() => onSetViewMode(ViewMode.MINIATURE)}
              className={`p-2 rounded-lg transition-soft ${viewMode === ViewMode.MINIATURE ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
              title="Miniaturas con detalles"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
            </button>
            <button 
              onClick={() => onSetViewMode(ViewMode.LIST)}
              className={`p-2 rounded-lg transition-soft ${viewMode === ViewMode.LIST ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
              title="Lista con detalles"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
          <p className="text-gray-400 dark:text-gray-600">No hay imágenes en esta sección.</p>
        </div>
      ) : (
        <div className={`
          grid gap-6
          ${viewMode === ViewMode.NORMAL ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : ''}
          ${viewMode === ViewMode.MINIATURE ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' : ''}
          ${viewMode === ViewMode.LIST ? 'grid-cols-1' : ''}
        `}>
          {images.map((img, idx) => (
            <div 
              key={img.id}
              onClick={() => onOpenLightbox(idx)}
              className={`
                group relative bg-white dark:bg-gray-900 overflow-hidden cursor-pointer transition-soft
                ${viewMode === ViewMode.NORMAL ? 'rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-gray-800' : ''}
                ${viewMode === ViewMode.MINIATURE ? 'rounded-xl shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-800 p-2' : ''}
                ${viewMode === ViewMode.LIST ? 'flex items-center gap-6 p-4 rounded-xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-md border border-transparent hover:border-gray-100 dark:hover:border-gray-700' : ''}
              `}
            >
              {/* Image Thumbnail */}
              <div className={`
                overflow-hidden bg-gray-100 dark:bg-gray-800 relative
                ${viewMode === ViewMode.NORMAL ? 'aspect-[4/3]' : ''}
                ${viewMode === ViewMode.MINIATURE ? 'aspect-square rounded-lg' : ''}
                ${viewMode === ViewMode.LIST ? 'w-24 h-24 rounded-lg flex-shrink-0' : ''}
              `}>
                <img 
                  src={img.url} 
                  alt={`Imagen en ${img.carpeta}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-soft"></div>
              </div>

              {/* Info Overlay / Side Content */}
              <div className={`
                ${viewMode === ViewMode.NORMAL ? 'p-4' : ''}
                ${viewMode === ViewMode.MINIATURE ? 'mt-2 px-1' : ''}
                ${viewMode === ViewMode.LIST ? 'flex-1 flex justify-between items-center' : ''}
              `}>
                <div className={viewMode === ViewMode.LIST ? 'flex flex-col' : ''}>
                  <p className={`font-semibold text-gray-800 dark:text-gray-200 ${viewMode === ViewMode.MINIATURE ? 'text-[10px] truncate' : 'text-sm'}`}>
                    ID: {img.id}
                  </p>
                  <p className={`text-gray-500 dark:text-gray-500 uppercase tracking-wider font-medium ${viewMode === ViewMode.MINIATURE ? 'text-[8px]' : 'text-[10px]'}`}>
                    {img.carpeta}
                  </p>
                </div>

                {/* Actions */}
                <div className={`
                  flex items-center gap-2 mt-3
                  ${viewMode === ViewMode.MINIATURE ? 'mt-1 gap-1' : ''}
                  ${viewMode === ViewMode.LIST ? 'mt-0' : ''}
                `}>
                  <button 
                    onClick={(e) => copyToClipboard(e, img.url)}
                    className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900 transition-soft"
                    title="Copiar URL"
                  >
                    <svg className={`${viewMode === ViewMode.MINIATURE ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                  </button>
                  <button 
                    onClick={(e) => downloadImage(e, img.url, `imagen_${img.id}.jpg`)}
                    className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900 transition-soft"
                    title="Descargar"
                  >
                    <svg className={`${viewMode === ViewMode.MINIATURE ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
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
