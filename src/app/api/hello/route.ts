
// import { NextResponse } from 'next/server';
// const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos"
//   export async function GET() {
  
//     const res = await fetch(DATA_SOURCE_URL)
//    const todos: Todo[] = await res.json()

//     return NextResponse.json({todos})
//   }




//   import {neonConfig,  Pool } from '@neondatabase/serverless';
//   import ws from 'ws';

// export async function GET(request: Request) {
//   neonConfig.webSocketConstructor = ws;     
//     const pool = new Pool({ connectionString: process.env.NEON_DATABASE_URL });
//     const { rows } = await pool.query('SELECT * FROM bookdata');
//     // event.waitUntil(pool.end());  // doesn't hold up the response
//     return new Response(JSON.stringify(rows));
// }



import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(request: NextRequest) {
  const conn = postgres({
    ssl: require,
  });
  const result = await conn.unsafe("SELECT * FROM playing_with_neon");
  console.log("backend result", result);
  return  NextResponse.json(result);
}