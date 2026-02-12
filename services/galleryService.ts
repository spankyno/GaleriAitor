
import { GaleriaItem } from '../types';

/**
 * Servicio centralizado para la recuperación de activos desde el API.
 */
export async function fetchGalleryData(): Promise<GaleriaItem[]> {
  const API_ENDPOINT = '/api/gallery';
  
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      let errorMessage = `Error del servidor (${response.status})`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.details || errorData.message || errorMessage;
      } catch (e) {
        // Si no es JSON, usamos el statusText
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.warn("La respuesta del API no es un array:", data);
      return [];
    }

    return data;
  } catch (error: any) {
    console.error(`[GalleryService] Error en ${API_ENDPOINT}:`, error.message);
    // Retornamos un array vacío para que la UI maneje el estado "Sin imágenes" con elegancia
    return [];
  }
}
