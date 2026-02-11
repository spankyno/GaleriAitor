
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 py-16 px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="max-w-sm">
          <h2 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white mb-4">
            GALERI<span className="text-blue-600">AITOR</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Plataforma de visualización de activos digitales impulsada por Neon y Vercel Edge. Diseñada para la velocidad y la elegancia.
          </p>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-6 font-bold">
            &copy; 2026 Aitor Sánchez Gutiérrez - Todos los derechos reservados
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h3 className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.3em] mb-4">Conexión</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:blog.cottage627@passinbox.com" className="group flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  Email Directo
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.3em] mb-4">Publicaciones</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://aitorblog.infinityfreeapp.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </div>
                  Blog Personal
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
