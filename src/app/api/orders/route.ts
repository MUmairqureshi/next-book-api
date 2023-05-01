 

import { NextRequest, NextResponse } from "next/server"
import postgres from "postgres";

export async function POST(request: NextRequest) {
    const conn = postgres({
        ssl: require,
      });
    const { bookId, customerName }: Partial<Order> = await request.json()

    if (!bookId || !customerName) return NextResponse.json({ message: "Missing required data" })
    try {
        
    const result : Partial<Order[]>  = await conn.unsafe(    'INSERT INTO bookorder ( id ,bookId, customerName,   quantity, available) VALUES (DEFAULT , $1, $2, 1, true) RETURNING id , bookid , customerName ,   quantity , available',
    [bookId, customerName],)

          return  NextResponse.json(result);
 
            } catch (error : any) {
              console.error(error)
              NextResponse.json({ success: false, error: error.message })
            }   
}






export async function GET(request: NextRequest) {
  const conn = postgres({
    ssl: require,
  });
  const result : Todo[] = await conn.unsafe("SELECT * FROM bookorders");
  console.log("backend result", result);
  return  NextResponse.json(result);
}