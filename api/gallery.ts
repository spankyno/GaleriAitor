
import { neon } from '@neondatabase/serverless';

/**
 * Forzamos el uso del Edge Runtime de Vercel. 
 * Es extremadamente eficiente para peticiones SQL rápidas.
 */
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const databaseUrl = process.env.DATABASE_URL || process.env.VITE_DATABASE_URL;

  if (!databaseUrl) {
    return new Response(
      JSON.stringify({ 
        error: 'Configuración incompleta', 
        message: 'DATABASE_URL no encontrada en las variables de entorno.' 
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }

  // Limpiar posibles comillas del string de conexión
  const cleanUrl = databaseUrl.replace(/^['"]|['"]$/g, '').trim();

  try {
    const sql = neon(cleanUrl);
    
    // Ejecutamos la consulta con un timeout implícito del runtime
    const rows = await sql`
      SELECT id, carpeta, url 
      FROM gallery 
      ORDER BY id ASC
    `;

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, max-age=0'
      },
    });
  } catch (error: any) {
    console.error("[DATABASE ERROR]:", error.message);
    return new Response(
      JSON.stringify({ 
        error: 'Error de base de datos', 
        details: error.message 
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
