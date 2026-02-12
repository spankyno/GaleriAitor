
import { GaleriaItem } from '../types';

/**
 * Servicio para recuperar los datos de la galería.
 * Implementa un timeout para evitar bloqueos infinitos en la UI.
 */
export async function fetchGalleryData(): Promise<GaleriaItem[]> {
  const API_ENDPOINT = '/api/gallery';
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos de timeout

  try {
    const response = await fetch(API_ENDPOINT, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.error("[GalleryService]: La petición ha excedido el tiempo límite de 10s");
    } else {
      console.error("[GalleryService]: Fallo al obtener datos:", error.message);
    }
    return [];
  }
}
