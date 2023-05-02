import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

 

type Props = {
    params: {
        id: string
    }
}
 
const conn = postgres({
    ssl: require,
});



export async function GET(request: NextRequest ,{params:{id}}:Props) {
    try{
    const result = await conn.unsafe(`SELECT * FROM bookorder where id = $1`, [id]);
    if (result.length === 0) {
        return  NextResponse.json({ message: "Order not found" });
      } else {
        const book = result[0];
        return NextResponse.json(book);
      }
    }
    catch(error){
        console.error(error);
        NextResponse.json({ message: "Error getting orderapi" });
  }
}








export async function PATCH(request: NextRequest ,{params:{id}}:Props) {

  const {  customerName }: Partial<Order> = await request.json()

  if (!customerName) return NextResponse.json({ message: "Missing required data" })
  try{
  const result = await conn.unsafe('UPDATE bookorder SET customername = $1 WHERE id = $2 RETURNING id , bookid , customerName ,   quantity , available',
  [customerName, id],);
  if (result.length === 0) {
      return  NextResponse.json({ message: "Order not found" });
    } else {
      const book = result[0];
      return NextResponse.json(book);
    }
  }
  catch(error){
      console.error(error);
      NextResponse.json({ message: "Error getting orderapi" });
} }












export async function DELETE(request: NextRequest ,{params:{id}}:Props) {
  try{
  const result = await conn.unsafe( 'DELETE FROM bookorder WHERE id = $1 RETURNING id',
  [id],);
  console.log(result)
  if (result.length > 0) {
   return NextResponse.json({ message: `Order ID ${result[0].id} has been deleted` });
  } else {
    return NextResponse.json({ message: `Book ID ${id} not found`});
  }
  }
  catch(error){
      console.error(error);
      NextResponse.json({ message: "Error getting orderapi" });
}
}
