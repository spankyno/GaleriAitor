
import { GaleriaItem } from '../types';

/**
 * Servicio para obtener los datos de la galería desde el API de Vercel.
 */
export async function fetchGalleryData(): Promise<GaleriaItem[]> {
  try {
    // Usamos una ruta absoluta relativa para asegurar que Vercel la resuelva
    const response = await fetch('/api/gallery', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (response.status === 404) {
      throw new Error("Ruta del API no encontrada (404). Verifica que 'api/gallery.ts' esté en la raíz del proyecto.");
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Error ${response.status}: ${errorData.message || 'Error desconocido en el servidor'}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error: any) {
    console.error("Error al cargar la galería desde Neon:", error.message);
    // Devolvemos [] para evitar mostrar datos rotos si el API falla
    return [];
  }
}
