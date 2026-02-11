
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-gray-800 py-12 px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-light tracking-[0.2em] text-gray-800 dark:text-gray-100 mb-1">GALERI<span className="font-bold">AITOR</span></h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Aitor Sánchez Gutiérrez &copy; 2026 - Reservados todos los derechos</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div className="text-center md:text-left">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-1 font-bold">Contacto</p>
            <a href="mailto:blog.cottage627@passinbox.com" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-soft">
              blog.cottage627@passinbox.com
            </a>
          </div>

          <div className="text-center md:text-left">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-1 font-bold">Blog</p>
            <a href="https://aitorblog.infinityfreeapp.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-soft">
              aitorblog.infinityfreeapp.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
