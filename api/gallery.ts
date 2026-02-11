
import { neon } from 'https://esm.sh/@neondatabase/serverless@0.9.4?bundle';

/**
 * Configuración para Vercel Edge Runtime.
 */
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // Obtenemos la URL de la base de datos de las variables de entorno de Vercel
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('[API] Error: DATABASE_URL no configurada.');
    return new Response(
      JSON.stringify({ 
        error: 'Configuración incompleta', 
        message: 'La variable DATABASE_URL no está definida en el panel de Vercel.' 
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }

  try {
    // Inicializamos la conexión con Neon
    const sql = neon(databaseUrl);
    
    // Ejecutamos la consulta a la tabla 'gallery'
    const data = await sql`SELECT id, carpeta, url FROM gallery ORDER BY id ASC`;

    // Si la consulta tiene éxito, devolvemos los datos
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    // Log detallado en la consola de Vercel para depuración
    console.error('[API] Error de Neon:', error.message);
    
    return new Response(
      JSON.stringify({ 
        error: 'Error de conexión a la base de datos', 
        details: error.message,
        hint: 'Verifica que la tabla "gallery" existe y que la URL tiene el formato correcto.'
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
