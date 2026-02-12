
import { neon } from 'https://esm.sh/@neondatabase/serverless@0.10.4?bundle';

/**
 * Configuración para forzar el Edge Runtime en Vercel.
 * Esto es CRÍTICO para permitir importaciones desde https://esm.sh
 */
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // Intentamos obtener la URL de ambas fuentes posibles
  // DATABASE_URL es el estándar, VITE_DATABASE_URL es el que configuraste manualmente
  let databaseUrl = process.env.DATABASE_URL || process.env.VITE_DATABASE_URL;

  if (!databaseUrl) {
    console.error("[API CONFIG ERROR]: No se encontró DATABASE_URL ni VITE_DATABASE_URL");
    return new Response(
      JSON.stringify({ 
        error: 'Configuración incompleta', 
        message: 'No se detectó la variable de entorno de la base de datos en Vercel. Asegúrate de tener DATABASE_URL configurada.' 
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }

  // LIMPIEZA DE CADENA: Eliminar comillas simples o dobles que puedan venir de la UI de Vercel
  databaseUrl = databaseUrl.replace(/^['"]|['"]$/g, '').trim();

  try {
    // Inicializamos el cliente Neon
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
    console.error("[API DATABASE ERROR]:", error.message);
    
    return new Response(
      JSON.stringify({ 
        error: 'Error de Conexión a Base de Datos', 
        details: error.message,
        hint: 'Verifica que la tabla "gallery" exista en tu proyecto de Neon y que el DATABASE_URL sea correcto.'
      }),
      { 
        status: 500, 
        headers: { 'content-type': 'application/json' } 
      }
    );
  }
}
