
import { neon } from 'https://esm.sh/@neondatabase/serverless@0.10.4?bundle';

/**
 * Usamos el runtime de Node.js por defecto para mayor compatibilidad
 * con la resolución de módulos ESM en Vercel.
 */

export default async function handler(req: Request) {
  // Las variables de entorno en Vercel se inyectan en process.env
  let databaseUrl = process.env.VITE_DATABASE_URL;

  if (!databaseUrl) {
    return new Response(
      JSON.stringify({ 
        error: 'Configuración incompleta', 
        message: 'La variable de entorno VITE_DATABASE_URL no está definida en Vercel.' 
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }

  // LIMPIEZA DE CADENA: Eliminar comillas simples o dobles accidentales al inicio/final
  databaseUrl = databaseUrl.replace(/^['"]|['"]$/g, '').trim();

  try {
    // Inicializamos la conexión
    const sql = neon(databaseUrl);
    
    // Consulta a la tabla 'gallery'
    const rows = await sql`
      SELECT id, carpeta, url 
      FROM gallery 
      ORDER BY id ASC
    `;

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=10, stale-while-revalidate=5',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: any) {
    console.error("[API ERROR]:", error.message);
    
    return new Response(
      JSON.stringify({ 
        error: 'Database Connection Error', 
        details: error.message,
        hint: 'Revisa si la tabla "gallery" existe y si la URL de conexión es correcta (sin comillas extra).'
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
