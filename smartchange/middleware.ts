import {  NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';


export const getJwtSecretKey = () => {
  const secret = process.env.JWT_PASS;

  if (!secret || secret.length === 0) {
    throw new Error('JWT_SECRET_KEY is not set');
  }
  return secret;
};

export default async function withAuth(req: NextRequest, res: NextResponse){
    const jwtCookie = req.cookies.get('myJWT')?.value
    let isAuthenticated = false;
    const url = req.url

    console.log(jwtCookie)
    console.log(url)

    if (jwtCookie) {
      try {
        const decoded = await jwtVerify(jwtCookie, new TextEncoder().encode(getJwtSecretKey()))
        isAuthenticated = true;
      } catch (err) {
        console.log('JWT verification failed', err);
        isAuthenticated = false;
      }
    }

    if (!isAuthenticated && url === 'http://localhost:3000/') {
        return NextResponse.redirect(new URL('/authentication/login/', url))  
    }

    if(!isAuthenticated && url === 'http://localhost:3000/utilities/swap/'){
        return NextResponse.redirect(new URL('/authentication/login/', url))    
    }

    if(!isAuthenticated && url === 'http://localhost:3000/utilities/chats/'){
        return NextResponse.redirect(new URL('/authentication/login/', url))    
    }

    if(isAuthenticated && url === '/authentication/login/'){
        return NextResponse.redirect(new URL('/', url))  
    }
  };

  export const config={
    matcher:['/','/authentication/login', '/utilities/swap/', '/utilities/chats/']
}


