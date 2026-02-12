
import { neon } from 'https://esm.sh/@neondatabase/serverless@0.10.4?no-check';

/**
 * Configuración para Vercel Edge Runtime.
 * El uso de ?no-check en esm.sh evita la introspección de tipos que a veces
 * causa problemas en el bundling de Edge Functions.
 */
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // Las variables de entorno en Vercel se inyectan en process.env
  const databaseUrl = process.env.VITE_DATABASE_URL;

  if (!databaseUrl) {
    console.error("[API ERROR] VITE_DATABASE_URL no definida en el entorno.");
    return new Response(
      JSON.stringify({ 
        error: 'Configuración incompleta', 
        message: 'La variable de entorno VITE_DATABASE_URL no existe.' 
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }

  try {
    // Inicializamos la conexión HTTP de Neon
    const sql = neon(databaseUrl);
    
    /**
     * Realizamos la consulta. 
     * Se asume la existencia de la tabla 'gallery' con columnas 'id', 'carpeta', 'url'.
     */
    const rows = await sql`
      SELECT id, carpeta, url 
      FROM gallery 
      ORDER BY id ASC
    `;

    // Verificamos si la respuesta es válida
    if (!rows) {
      throw new Error("La consulta no devolvió resultados.");
    }

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=60, stale-while-revalidate=30',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: any) {
    console.error("[API ERROR] Error de base de datos:", error.message);
    
    // Devolvemos el error detallado para ayudar en el diagnóstico durante el despliegue
    return new Response(
      JSON.stringify({ 
        error: 'Error de conexión a base de datos', 
        details: error.message,
        hint: 'Verifica que la tabla "gallery" exista y los permisos sean correctos.'
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
