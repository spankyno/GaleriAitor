
import { neon } from '@neondatabase/serverless';

/**
 * Handler de la API para Vercel.
 * Se ejecuta en el runtime de Node.js por defecto para evitar problemas con esquemas URL externos.
 */
export default async function handler(req: Request) {
  // En Vercel, DATABASE_URL es la variable estándar para Neon
  // Usamos VITE_DATABASE_URL como fallback si el usuario la configuró así manualmente
  let databaseUrl = process.env.DATABASE_URL || process.env.VITE_DATABASE_URL;

  console.log("DATABASE_URL detectada:", !!databaseUrl);

  if (!databaseUrl) {
    return new Response(
      JSON.stringify({ 
        error: 'Configuración incompleta', 
        message: 'La variable DATABASE_URL no está definida en el entorno de Vercel.' 
      }),
      { 
        status: 500, 
        headers: { 'content-type': 'application/json' } 
      }
    );
  }

  // LIMPIEZA DE CADENA: Eliminar posibles comillas accidentales
  databaseUrl = databaseUrl.replace(/^['"]|['"]$/g, '').trim();

  try {
    const sql = neon(databaseUrl);
    
    // Consulta optimizada
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
        hint: 'Revisa si la tabla "gallery" existe en Neon y si la URL de conexión en DATABASE_URL es correcta.'
      }),
      { 
        status: 500, 
        headers: { 'content-type': 'application/json' } 
      }
    );
  }
}
