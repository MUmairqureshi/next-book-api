import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(request: NextRequest) {
  const conn = postgres({
    ssl: require,
  });
  const result : Todo[] = await conn.unsafe("SELECT * FROM bookdata");
  console.log("backend result", result);
  return  NextResponse.json(result);
}