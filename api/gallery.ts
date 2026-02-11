
import { neon } from 'https://esm.sh/@neondatabase/serverless@0.9.4';

/**
 * Configuración para que Vercel use el Edge Runtime (más rápido y eficiente para Neon).
 */
export const config = {
  runtime: 'edge',
};

/**
 * Handler de la API que consulta la tabla 'galeria'.
 * Utiliza la variable de entorno DATABASE_URL definida en el panel de Vercel.
 */
export default async function handler(req: Request) {
  // Verificamos si la variable de entorno existe
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return new Response(
      JSON.stringify({ error: 'DATABASE_URL no está configurada en Vercel' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }

  try {
    const sql = neon(databaseUrl);
    
    // Consulta SQL para obtener todos los campos de la tabla 'galeria'
    // id, carpeta, url
    const data = await sql`SELECT id, carpeta, url FROM galeria ORDER BY id ASC`;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=10, stale-while-revalidate=59',
      },
    });
  } catch (error: any) {
    console.error('Error en la consulta a Neon:', error);
    return new Response(
      JSON.stringify({ error: 'Error al conectar con la base de datos', details: error.message }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
