
import { neon } from 'https://esm.sh/@neondatabase/serverless@0.10.4?bundle';

/**
 * Configuración para Vercel Edge Runtime.
 * El uso de ?bundle en la importación de esm.sh evita que se generen sentencias 'require'
 * que rompen el entorno de ejecución de Vercel Edge.
 */
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // En Vercel Edge, las variables de entorno se acceden vía process.env
  // El usuario indica que la variable es VITE_DATABASE_URL
  const databaseUrl = process.env.VITE_DATABASE_URL;

  if (!databaseUrl) {
    console.error("Falta VITE_DATABASE_URL");
    return new Response(
      JSON.stringify({ 
        error: 'Error de Configuración', 
        message: 'La variable VITE_DATABASE_URL no está configurada en Vercel.' 
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }

  try {
    const sql = neon(databaseUrl);
    
    // Ejecutamos la consulta a la tabla 'gallery'
    const data = await sql`SELECT id, carpeta, url FROM gallery ORDER BY id ASC`;

    // Si data no es un array, devolvemos un error controlado
    if (!Array.isArray(data)) {
        throw new Error("La base de datos no devolvió un formato válido.");
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=3600, stale-while-revalidate=600',
      },
    });
  } catch (error: any) {
    console.error("Error en el handler de la galería:", error.message);
    return new Response(
      JSON.stringify({ 
        error: 'Database Connection Error', 
        details: error.message 
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
