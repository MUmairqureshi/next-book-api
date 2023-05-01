import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const conn = postgres({
    ssl: require,
});

 
 
export async function POST(request:NextRequest){
  
 
  try {
      const { clientName, clientEmail } : Partial<client> = await request.json()
  if (!clientName || !clientEmail) return NextResponse.json({ message: "  Data is missing "})  

    const client = await  conn.unsafe('SELECT * FROM clients WHERE client_email = $1', [clientEmail]);
    if (client.length > 0) {
      return NextResponse.json({ message: 'Client already registered' });
    }


    const newClient = await conn.unsafe('INSERT INTO clients (client_name, client_email) VALUES ($1, $2) RETURNING *', [clientName, clientEmail]);
 
    const token = jwt.sign({ clientId: newClient[0].id },  process.env.JWT_SECRET);
console.log(token)


 return   NextResponse.json({ "Auth-Token": token });
  } catch (err) {
    console.error(err);
    NextResponse.json({ message: 'Server error' });
  }
}


