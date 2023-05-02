import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const conn = postgres({
    ssl: require,
});

type Props = {
  exists:boolean,
}
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request:NextRequest){
  
 
  try {
      const { clientName, clientEmail } : Partial<client> = await request.json()
  if (!clientName || !clientEmail) return NextResponse.json({ message: "  Data is missing "})  

    const client = await  conn.unsafe('SELECT * FROM clients WHERE client_email = $1', [clientEmail]);
    if (client.length > 0) {
      return NextResponse.json({ message: 'Client already registered' });
    }


    const newClient = await conn.unsafe('INSERT INTO clients (client_name, client_email) VALUES ($1, $2) RETURNING *', [clientName, clientEmail]);
 
    const token  = jwt.sign({ clientId: newClient[0].id }, process.env.JWT_SECRET! );
console.log(token)


 return   NextResponse.json({ "Auth-Token": token });
  } catch (err) {
    console.error(err);
    NextResponse.json({ message: 'Server error' });
  }
}
















// import postgres from 'postgres';




// import { NextRequest, NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import { NextApiResponse } from 'next';
// // import { pool } from '../../lib/postgres';
// const conn = postgres({
//       ssl: require,
//   });

// type Data = {
//   message: string;
//   token?: string;
// };

// export async function POST(
//   req: NextRequest,
//   res: NextApiResponse <Data>
// ) {

//           const { clientName, clientEmail } : Partial<client> = await req.json()
//     // const { name, email } = req.body;
//     if (!clientName || !clientEmail) return NextResponse.json({ message: "  Data is missing "}) 
//     // Check if client already exists
//     const client = await  conn.unsafe('SELECT * FROM clients WHERE client_email = $1', [clientEmail]);

//     if (client.length > 0) {
//       return res.status(400).json({ message: 'Client already exists' });
//     }

//     // Generate a JWT token for the client
//     const token = jwt.sign({ clientEmail }, process.env.JWT_SECRET!, {
//       expiresIn:'7d'
//     });

//     // Save client data to the database
//     const newClient = await conn.unsafe('INSERT INTO clients (client_name, client_email) VALUES ($1, $2) RETURNING *', [clientName, clientEmail]);
//     const clientId = newClient[0].id;

//     return res.status(201).json({ message: 'Client registered', token });
//   }
