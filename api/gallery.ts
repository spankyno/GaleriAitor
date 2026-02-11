
import { neon } from 'https://esm.sh/@neondatabase/serverless@0.10.4?bundle';

/**
 * Configuración para Vercel Edge Runtime.
 * Esto asegura que la función sea rápida y global.
 */
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // La variable configurada por el usuario es VITE_DATABASE_URL
  const databaseUrl = process.env.VITE_DATABASE_URL;

  if (!databaseUrl) {
    console.error('[API] Error: VITE_DATABASE_URL no encontrada en el entorno.');
    return new Response(
      JSON.stringify({ 
        error: 'Error de configuración', 
        message: 'La variable VITE_DATABASE_URL no está definida en Vercel.' 
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }

  try {
    const sql = neon(databaseUrl);
    
    // Consulta a la tabla 'gallery' según lo corregido por el usuario
    const data = await sql`SELECT id, carpeta, url FROM gallery ORDER BY id ASC`;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=3600, stale-while-revalidate=600',
      },
    });
  } catch (error: any) {
    console.error('[API] Error de base de datos:', error.message);
    return new Response(
      JSON.stringify({ 
        error: 'Database Error', 
        details: error.message 
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
