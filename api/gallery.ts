
import { neon } from 'https://esm.sh/@neondatabase/serverless@0.10.4';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('Configuración faltante: DATABASE_URL');
    return new Response(
      JSON.stringify({ error: 'La variable DATABASE_URL no está configurada en Vercel.' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }

  try {
    const sql = neon(databaseUrl);
    
    // Consulta simple a la tabla 'galeria'
    const data = await sql`SELECT id, carpeta, url FROM galeria ORDER BY id ASC`;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store, max-age=0', // Evitar cache para pruebas
      },
    });
  } catch (error: any) {
    console.error('Error crítico en la función de API:', error.message);
    return new Response(
      JSON.stringify({ 
        error: 'Error al conectar con Neon', 
        message: error.message 
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
