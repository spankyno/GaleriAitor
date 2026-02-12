
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ViewMode, ImageFitMode, GaleriaItem, GalleryState } from './types';
import { fetchGalleryData } from './services/galleryService';
import Sidebar from './components/Sidebar';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [state, setState] = useState<GalleryState>({
    images: [],
    folders: [],
    currentFolder: null,
    loading: true,
    viewMode: ViewMode.NORMAL,
    imageFit: ImageFitMode.COVER,
    selectedImageIndex: null
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const initData = async () => {
      setState(prev => ({ ...prev, loading: true }));
      try {
        const data = await fetchGalleryData();
        const uniqueFolders = Array.from(new Set(data.map(item => item.carpeta))).sort();
        setState(prev => ({
          ...prev,
          images: data,
          folders: uniqueFolders,
          loading: false
        }));
      } catch (err) {
        console.error("Error cargando la galería:", err);
        setState(prev => ({ ...prev, loading: false }));
      }
    };
    initData();
  }, []);

  const filteredImages = useMemo(() => {
    if (!state.currentFolder) return state.images;
    return state.images.filter(img => img.carpeta === state.currentFolder);
  }, [state.images, state.currentFolder]);

  const handleSelectFolder = useCallback((folder: string | null) => {
    setState(prev => ({ ...prev, currentFolder: folder }));
    setIsSidebarOpen(false);
    // Scroll to top when changing folder
    const mainEl = document.getElementById('main-content');
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSetViewMode = useCallback((mode: ViewMode) => {
    setState(prev => ({ ...prev, viewMode: mode }));
  }, []);

  const handleSetImageFit = useCallback((fit: ImageFitMode) => {
    setState(prev => ({ ...prev, imageFit: fit }));
  }, []);

  const handleOpenLightbox = useCallback((index: number) => {
    setState(prev => ({ ...prev, selectedImageIndex: index }));
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setState(prev => ({ ...prev, selectedImageIndex: null }));
  }, []);

  const handlePrevImage = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedImageIndex: prev.selectedImageIndex !== null
        ? (prev.selectedImageIndex - 1 + filteredImages.length) % filteredImages.length
        : null
    }));
  }, [filteredImages.length]);

  const handleNextImage = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedImageIndex: prev.selectedImageIndex !== null
        ? (prev.selectedImageIndex + 1) % filteredImages.length
        : null
    }));
  }, [filteredImages.length]);

  const toggleTheme = useCallback(() => setIsDarkMode(prev => !prev), []);

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden transition-colors duration-500 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Mobile Sticky Header */}
      <header className="lg:hidden bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-900 p-4 sticky top-0 z-40 flex items-center justify-between">
        <h1 className="text-xl font-black tracking-tighter text-slate-950 dark:text-white">
          GALERI<span className="text-blue-600">AITOR</span>
        </h1>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-600 dark:text-slate-400 focus:outline-none"
        >
          {isSidebarOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </header>

      {/* Sidebar - Fijo a la izquierda */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-30 transform transition-transform duration-500 lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-80 bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-900 shadow-xl lg:shadow-none
      `}>
        <Sidebar 
          folders={state.folders}
          currentFolder={state.currentFolder}
          onSelectFolder={handleSelectFolder}
        />
      </aside>

      {/* Main Container - Scrollable independiente */}
      <div 
        id="main-content"
        className="flex-1 flex flex-col overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-950 relative"
      >
        <main className="flex-1 p-4 lg:p-12">
          <Gallery 
            images={filteredImages}
            loading={state.loading}
            viewMode={state.viewMode}
            imageFit={state.imageFit}
            onSetViewMode={handleSetViewMode}
            onSetImageFit={handleSetImageFit}
            onOpenLightbox={handleOpenLightbox}
            currentFolder={state.currentFolder}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />
        </main>
      </div>

      {/* Lightbox Overlay */}
      {state.selectedImageIndex !== null && (
        <Lightbox 
          images={filteredImages}
          currentIndex={state.selectedImageIndex}
          onClose={handleCloseLightbox}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
        />
      )}
    </div>
  );
};

export default App;
