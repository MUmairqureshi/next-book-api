import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

const conn = postgres({
    ssl: require,
});

type Props = {
    params: {
      id: string
    }
}

export async function GET(request: NextRequest ,{params:{id}}:Props) {
    try{
    const result = await conn.unsafe(`SELECT * FROM bookdata where id as  id  = $1`, [id]);
    if (result.length === 0) {
        return  NextResponse.json({ message: "Book not found" });
      } else {
        const book = result[0];
        return NextResponse.json(book);
      }
    }
    catch(error){
        console.error(error);
        NextResponse.json({ message: "Error getting bookapi" });
  }
}