
import { GaleriaItem } from '../types';

/**
 * Servicio para recuperar los datos de la galería desde el API endpoint de Vercel.
 */
export async function fetchGalleryData(): Promise<GaleriaItem[]> {
  const API_ENDPOINT = '/api/gallery';
  
  try {
    console.log(`[GalleryService]: Llamando a ${API_ENDPOINT}...`);
    const response = await fetch(API_ENDPOINT);
    
    console.log("[GalleryService]: Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[GalleryService]: Error en la API:", errorData);
      throw new Error(errorData.message || `Error del servidor: ${response.status}`);
    }

    const data = await response.json();
    console.log("[GalleryService]: Datos recibidos con éxito:", Array.isArray(data) ? `${data.length} items` : 'No es un array');
    
    return Array.isArray(data) ? data : [];
  } catch (error: any) {
    console.error("[GalleryService]: Fallo crítico al obtener datos:", error.message);
    // Devolvemos un array vacío para que la interfaz no se rompa, 
    // pero el log nos permitirá saber qué falló.
    return [];
  }
}
