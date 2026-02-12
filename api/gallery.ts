
import { neon } from 'https://esm.sh/@neondatabase/serverless@0.10.4';

/**
 * Configuración para Vercel Edge Runtime.
 * Proporciona baja latencia global para la consulta a la base de datos.
 */
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // Obtenemos la URL de conexión desde la variable de entorno especificada
  const databaseUrl = process.env.VITE_DATABASE_URL;

  if (!databaseUrl) {
    return new Response(
      JSON.stringify({ 
        error: 'Configuración fallida', 
        message: 'La variable VITE_DATABASE_URL no está definida en el entorno.' 
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }

  try {
    const sql = neon(databaseUrl);
    
    // Consulta optimizada a la tabla 'gallery'
    const data = await sql`SELECT id, carpeta, url FROM gallery ORDER BY id ASC`;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=3600, stale-while-revalidate=600',
      },
    });
  } catch (error: any) {
    console.error('[API Error]:', error.message);
    return new Response(
      JSON.stringify({ 
        error: 'Error de base de datos', 
        details: error.message 
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
