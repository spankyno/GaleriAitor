
import { GaleriaItem } from '../types';

/**
 * Servicio para obtener los datos de la galería.
 * Si hay un error o no hay conexión, devuelve un array vacío para no mostrar datos de muestra.
 */
export async function fetchGalleryData(): Promise<GaleriaItem[]> {
  try {
    const response = await fetch('/api/gallery');
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Status ${response.status}: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error al cargar la galería desde Neon:", error);
    // IMPORTANTE: Al devolver [] aseguramos que NO se muestren imágenes de muestra.
    return [];
  }
}
