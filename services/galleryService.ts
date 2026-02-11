
import { GaleriaItem } from '../types';

/**
 * Nota para el despliegue en Vercel:
 * Para conectar con Neon DB, se recomienda crear una API Route en el mismo repositorio
 * (por ejemplo usando Next.js o un backend simple en Vercel Functions) que utilice
 * la variable de entorno DATABASE_URL.
 * 
 * Este servicio simula la llamada a esa API.
 */

export async function fetchGalleryData(): Promise<GaleriaItem[]> {
  try {
    // En una implementación real con Vercel Functions:
    // const response = await fetch('/api/gallery');
    // return await response.json();

    // Simulación de datos que vendrían de la tabla 'galeria' (id, carpeta, url)
    // Para propósitos de demostración, devolvemos un set de datos variado.
    return [
      { id: 1, carpeta: 'Naturaleza', url: 'https://picsum.photos/id/10/1200/800' },
      { id: 2, carpeta: 'Ciudad', url: 'https://picsum.photos/id/103/1200/800' },
      { id: 3, carpeta: 'Naturaleza', url: 'https://picsum.photos/id/11/1200/800' },
      { id: 4, carpeta: 'Tecnología', url: 'https://picsum.photos/id/119/1200/800' },
      { id: 5, carpeta: 'Arquitectura', url: 'https://picsum.photos/id/122/1200/800' },
      { id: 6, carpeta: 'Ciudad', url: 'https://picsum.photos/id/133/1200/800' },
      { id: 7, carpeta: 'Naturaleza', url: 'https://picsum.photos/id/13/1200/800' },
      { id: 8, carpeta: 'Tecnología', url: 'https://picsum.photos/id/160/1200/800' },
      { id: 9, carpeta: 'Arquitectura', url: 'https://picsum.photos/id/164/1200/800' },
      { id: 10, carpeta: 'Abstracto', url: 'https://picsum.photos/id/174/1200/800' },
      { id: 11, carpeta: 'Naturaleza', url: 'https://picsum.photos/id/175/1200/800' },
      { id: 12, carpeta: 'Ciudad', url: 'https://picsum.photos/id/180/1200/800' },
    ];
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    return [];
  }
}
