
import { GaleriaItem } from '../types';

/**
 * Servicio para obtener los datos de la galería.
 * Llama a la API Route de Vercel para interactuar con Neon de forma segura.
 */
export async function fetchGalleryData(): Promise<GaleriaItem[]> {
  try {
    const response = await fetch('/api/gallery');
    
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Validamos que la respuesta sea un array antes de devolverla
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error al cargar la galería desde Neon:", error);
    // Devolvemos un array vacío para no mostrar imágenes falsas/rotas
    return [];
  }
}
