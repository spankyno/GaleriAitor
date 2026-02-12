
import React from 'react';

interface SidebarProps {
  folders: string[];
  currentFolder: string | null;
  onSelectFolder: (folder: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ folders, currentFolder, onSelectFolder }) => {
  return (
    <div className="p-8 h-full flex flex-col bg-white dark:bg-slate-950 transition-colors border-r border-slate-100 dark:border-slate-900">
      <div className="mb-14 hidden lg:block">
        <h1 className="text-2xl font-black tracking-tighter text-slate-950 dark:text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <span className="leading-tight">GALERI<span className="text-blue-600">AITOR</span></span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-slate-300 mt-3 font-extrabold">Gestor de Portafolio</p>
      </div>

      <nav className="flex-1 space-y-12">
        <section>
          <h2 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5 px-2">Navegación</h2>
          <button 
            onClick={() => onSelectFolder(null)}
            className={`w-full group text-left px-5 py-4 rounded-[1.25rem] transition-all duration-300 text-sm flex items-center gap-4 font-bold ${
              currentFolder === null 
              ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/40 translate-x-1' 
              : 'text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <svg className={`w-5 h-5 ${currentFolder === null ? 'text-white' : 'text-slate-400 dark:text-slate-400 group-hover:text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            Todo el archivo
          </button>
        </section>

        <section>
          <div className="flex items-center justify-between mb-5 px-2">
            <h2 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Colecciones</h2>
            <span className="text-[10px] bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg font-black border border-slate-200 dark:border-slate-800">{folders.length}</span>
          </div>
          <div className="space-y-1.5 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
            {folders.map(folder => (
              <button 
                key={folder}
                onClick={() => onSelectFolder(folder)}
                className={`w-full group text-left px-5 py-4 rounded-[1.25rem] transition-all duration-300 text-sm flex items-center gap-4 font-bold ${
                  currentFolder === folder 
                  ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/40 translate-x-1' 
                  : 'text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <svg className={`w-5 h-5 ${currentFolder === folder ? 'text-white' : 'text-slate-400 dark:text-slate-400 group-hover:text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                <span className="truncate">{folder}</span>
              </button>
            ))}
          </div>
        </section>
      </nav>

      <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-900">
        <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-3xl flex items-center gap-4 border border-transparent dark:border-slate-800">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md">
            AS
          </div>
          <div>
            <p className="text-sm font-black text-slate-950 dark:text-white leading-tight">Aitor Sánchez</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-300 font-bold mt-0.5">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
