
import React from 'react';

interface SidebarProps {
  folders: string[];
  currentFolder: string | null;
  onSelectFolder: (folder: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ folders, currentFolder, onSelectFolder }) => {
  return (
    <div className="p-7 h-full flex flex-col bg-white dark:bg-slate-950 transition-colors">
      {/* Branding Header */}
      <div className="mb-10 hidden lg:block">
        <h1 className="text-2xl font-black tracking-tighter text-slate-950 dark:text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="leading-tight">GALERI<span className="text-blue-600">AITOR</span></span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-slate-400 mt-3 font-extrabold">Galería de imágenes</p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-1">
        <section>
          <h2 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 px-2">Navegación</h2>
          <button 
            onClick={() => onSelectFolder(null)}
            className={`w-full group text-left px-5 py-3.5 rounded-2xl transition-all duration-300 text-sm flex items-center gap-4 font-bold ${
              currentFolder === null 
              ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' 
              : 'text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <svg className={`w-5 h-5 ${currentFolder === null ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            Archivo General
          </button>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Colecciones</h2>
            <span className="text-[10px] bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 px-2 rounded-lg font-black">{folders.length}</span>
          </div>
          <div className="space-y-1">
            {folders.map(folder => (
              <button 
                key={folder}
                onClick={() => onSelectFolder(folder)}
                className={`w-full group text-left px-5 py-3 rounded-xl transition-all duration-300 text-sm flex items-center gap-4 font-bold ${
                  currentFolder === folder 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' 
                  : 'text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <svg className={`w-4 h-4 ${currentFolder === folder ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                <span className="truncate">{folder}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Contact Aggregation Section */}
        <section>
          <h2 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 px-2">Contacto</h2>
          <div className="space-y-2">
            <a 
              href="mailto:blog.cottage627@passinbox.com"
              className="flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-transparent dark:border-slate-800 hover:border-blue-600 transition-all text-sm font-bold text-slate-600 dark:text-slate-300 group"
            >
              <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Email
            </a>
            <a 
              href="https://aitorblog.infinityfreeapp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-transparent dark:border-slate-800 hover:border-blue-600 transition-all text-sm font-bold text-slate-600 dark:text-slate-300 group"
            >
              <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
              Visitar Blog
            </a>
            <a 
              href="https://aitor-blog-contacto.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all text-sm font-bold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Contactar
            </a>
          </div>
        </section>
      </nav>

      {/* Sidebar Footer */}
      <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-900 space-y-4">
        <div className="px-2">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold leading-relaxed uppercase tracking-[0.1em]">
            Plataforma de visualización de activos digitales.
          </p>
          <p className="text-[9px] text-slate-300 dark:text-slate-600 font-bold mt-4">
            Aitor Sánchez Gutiérrez © 2026 - Reservados todos los derechos
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
