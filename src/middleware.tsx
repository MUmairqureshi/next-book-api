
// import { NextRequest, NextResponse } from "next/server"
// import jwt from 'jsonwebtoken';
// import { jwtVerify } from 'jose';

// export async function verify(token: string, secret: string): Promise<any> {

//     const {payload} = await jwtVerify(token, new TextEncoder().encode(secret));

//     console.log('in verify: ', JSON.stringify(payload));

//     return payload;
// }

// export async const middleware  (request: NextRequest){
// //   const authHeader = req.headers.authorization;
// //   const token = authHeader && authHeader.split(' ')[1];

// const Authorization = request.headers.get('Authorization')
// if(!Authorization){
//     return new NextResponse(JSON.stringify({
//         "Error":"Unauthorized Access!"
//     }), 
//     {
//         status:401,
//         statusText:"Unauthorized Access"
//     })
// }

// //   await  verify(Authorization, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
// //     if (err) {
// //       NextResponse.json({  "Error":"Unauthorized Access!"});
// //       return;
// //     }

// //     // Attach the decoded user object to the request object for further use
// //     req.user = decoded;

// //     // Call the route handler with the modified request object
// //     return handler(request, NextResponse);
// //   });
// // };
// try {
//   await verify(Authorization, process.env.JWT_SECRET!);
//   return NextResponse.next();
// } catch (error) {
//   return new NextResponse(JSON.stringify({
//       "Error":"Unauthorized Access!"
//   }), 
//   {
//       status:401,
//       statusText:"Unauthorized Access"
//   })
// }
// // const { payload } = await jwtVerify(Authorization, new TextEncoder().encode(process.env.SECRETKEY!));
// // console.log(payload);
// return NextResponse.next();
// }
// export const config = {
//     matcher:'/api/orders/:path*'
// }














// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// import { jwtVerify } from 'jose';

// const allowedAccessTypes:string[] = ['/orders'];

// async function verify(token: string, secret: string): Promise<any> {
//     //{ apiClientId: string, clientName: string, clientEmail: string, accessPermissions: string }
//     const {payload} = await jwtVerify(token, new TextEncoder().encode(secret));
//     // run some checks on the returned payload, perhaps you expect some specific values
//     console.log('in verify: ', JSON.stringify(payload));
//     // if its all good, return it, or perhaps just return a boolean
//     return payload;
// }

// This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest, ) {
//     let jwtAuthToken = request.headers.get('Authorization');
//     console.log(jwtAuthToken);
//     let response: NextResponse;
//     if (!jwtAuthToken) {
//         // Respond with JSON indicating an error message
//         return new NextResponse(
//                 JSON.stringify({ success: false, message: 'authentication failed - no Bearer token provided' }),
//                 { status: 401, headers: { 'content-type': 'application/json' } }
//         );
//     } else { 

//         let decodedToken: any;
//         if (jwtAuthToken.toLowerCase().startsWith('bearer')) {
//             jwtAuthToken = jwtAuthToken.slice('bearer'.length).trim();
//             console.log('jwtAuthToken:', jwtAuthToken);
//             try {
//                 decodedToken = await verify(jwtAuthToken, process.env.JWT_SECRET as string);
//                 console.log('decoded:',decodedToken);
//             } catch (e:any) {
//                 console.log(e.message);
//                 return new NextResponse(
//                     JSON.stringify({ success: false, message: 'invalid token provided' }),
//                     { status: 401, headers: { 'content-type': 'application/json' } }
//                 );
//             }

//             // const hasAccessToEndpoint = config.matcher.some(
//             //     (at: string) => decodedToken.accessTypes.some((uat:string) => uat === at)
//             // );
            
//             // if (!hasAccessToEndpoint) {
//             //     return new NextResponse(
//             //         JSON.stringify({ success: false, message: 'not enough privileges to access endpoint' }),
//             //         { status: 401, headers: { 'content-type': 'application/json' } }
//             //     );
//             // }
//             // Clone the request headers and set a new header `x-hello-from-middleware1`

//             const requestHeaders = new Headers(request.headers)
//             requestHeaders.set('x-api-client-id-from-middleware', decodedToken.apiClientId);

//             // You can also set request headers in NextResponse.rewrite
//             response = NextResponse.next({
//                 request: {
//                     // New request headers
//                     headers: requestHeaders,
//                 },
//             });
//         } else {
//             return new NextResponse(
//                 JSON.stringify({ success: false, message: 'authentication failed - malformed Bearer token provided' }),
//                 { status: 401, headers: { 'content-type': 'application/json' } }
//             );
//         }
//     }

//     return response;
// }

// // See "Matching Paths" below to learn more
// export const config = {
//     matcher: ['/orders', '/orders/:id*']
// }

 







// const JWT_SECRET = process.env.JWT_SECRET;

// export default function authMiddleware(handler: (request: NextRequest, response: NextResponse) => void) {
//     return async (request: NextRequest, res: NextResponse) => {
//       const token = req.headers.authorization?.replace('Bearer ', '');
  
 
//     const token = request.headers.authorization?.replace('Bearer ', '');

//     if (!token) {
//       return NextResponse.json({ message: 'Authentication token not found' });
//     }

//     try {
//       const decodedToken = jwt.verify(token, JWT_SECRET);
//       request.clientEmail = decodedToken.client_email;
//       return handler(request, response);
//     } catch (error) {
//       return NextResponse.json({ message: 'Invalid authentication token' });
//     }
//   };

// }
//   export const config = {
//     matcher: ['/orders', '/orders/:id*']
// }







import { NextRequest, NextResponse } from "next/server"
import {verify} from './app/api/tokenVerification'

export async function middleware(request:NextRequest){
    
   
    const Authorization = request.headers.get('Authorization')
    console.log(Authorization)
    if(!Authorization){
        return   NextResponse.json({  "Error":"Unauthorized Access!" },
        {
            status:401,
            statusText:"Unauthorized Access"
        })
    }
    try {
        await verify(Authorization, process.env.JWT_SECRET!);
        return NextResponse.next();
      } catch (error) {
         return   NextResponse.json({  "Error":"Unauthorized Access!" },
         
        {
            status:401,
            statusText:"Unauthorized Access"
        })
      }
     
    return NextResponse.next();
}

export const config = {
    matcher:'/api/orders/:path*'
}

