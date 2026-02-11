
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ViewMode, GaleriaItem, GalleryState } from './types';
import { fetchGalleryData } from './services/galleryService';
import Sidebar from './components/Sidebar';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';
import Footer from './components/Footer';

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
      const data = await fetchGalleryData();
      const uniqueFolders = Array.from(new Set(data.map(item => item.carpeta))).sort();
      setState(prev => ({
        ...prev,
        images: data,
        folders: uniqueFolders,
        loading: false
      }));
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
  }, []);

  const handleSetViewMode = useCallback((mode: ViewMode) => {
    setState(prev => ({ ...prev, viewMode: mode }));
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

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100">
      {/* Botón Global de Tema (Fijo arriba a la derecha) */}
      <div className="fixed top-4 right-4 z-[100] flex items-center gap-2">
         <button 
            onClick={toggleTheme}
            className="p-2.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full transition-soft shadow-lg"
            title="Alternar modo claro/oscuro"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
      </div>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-gray-800 p-4 sticky top-0 z-40 flex items-center justify-between">
        <h1 className="text-xl font-light tracking-widest text-gray-800 dark:text-gray-200">GALERI<span className="font-bold">AITOR</span></h1>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-600 dark:text-gray-400 focus:outline-none mr-12"
        >
          {isSidebarOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className={`
          fixed lg:relative inset-0 z-30 lg:z-0 transform transition-transform duration-300 lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-72 bg-white dark:bg-[#0a0a0a] border-r border-gray-100 dark:border-gray-800 shadow-xl lg:shadow-none overflow-y-auto
        `}>
          <Sidebar 
            folders={state.folders}
            currentFolder={state.currentFolder}
            onSelectFolder={handleSelectFolder}
          />
        </div>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 dark:bg-black/60 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50/30 dark:bg-[#0a0a0a]/50 p-4 lg:p-8">
          <Gallery 
            images={filteredImages}
            loading={state.loading}
            viewMode={state.viewMode}
            onSetViewMode={handleSetViewMode}
            onOpenLightbox={handleOpenLightbox}
            currentFolder={state.currentFolder}
          />
        </main>
      </div>

      <Footer />

      {/* Lightbox */}
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
