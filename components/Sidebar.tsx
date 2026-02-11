
import React from 'react';

interface SidebarProps {
  folders: string[];
  currentFolder: string | null;
  onSelectFolder: (folder: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ folders, currentFolder, onSelectFolder }) => {
  return (
    <div className="p-8 h-full flex flex-col bg-white dark:bg-[#0a0a0a]">
      <div className="mb-12 hidden lg:block">
        <h1 className="text-2xl font-light tracking-[0.2em] text-gray-800 dark:text-gray-100">GALERI<span className="font-bold">AITOR</span></h1>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-1 font-medium">Digital Art Gallery</p>
      </div>

      <nav className="flex-1">
        <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-6">Explorar</h2>
        <ul className="space-y-2">
          <li>
            <button 
              onClick={() => onSelectFolder(null)}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition-soft text-sm flex items-center gap-3 ${
                currentFolder === null 
                ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-lg shadow-gray-200 dark:shadow-none' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              Todas las imágenes
            </button>
          </li>
        </ul>

        <div className="mt-10">
          <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-6">Carpetas</h2>
          <ul className="space-y-2">
            {folders.map(folder => (
              <li key={folder}>
                <button 
                  onClick={() => onSelectFolder(folder)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-soft text-sm flex items-center gap-3 ${
                    currentFolder === folder 
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-lg shadow-gray-200 dark:shadow-none' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                  {folder}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
