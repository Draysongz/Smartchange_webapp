import {NextRequest, NextResponse} from 'next/server'
import {verifyAuth} from './lib/auth'



export async function middleware(req:NextRequest){

    const token = req.cookies.get('myJWT')?.value

    const verifiedToken = 
    token && 
    (await verifyAuth(token).catch(err => console.log(err)))

    // if(req.nextUrl.pathname.startsWith('/authentication/login/') && !verifiedToken){
    //     return
    // }

    const url = req.url
    console.log(req.nextUrl.pathname)
    console.log(verifiedToken)

    if(url.includes('/authentication/login/') && verifiedToken){
        return NextResponse.redirect(new URL('/', url))
    }

    if(req.nextUrl.pathname=='/' && !verifiedToken){
        return NextResponse.redirect(new URL('/authentication/login/', url))
    }

    if(req.nextUrl.pathname=='/utilities/swap' && !verifiedToken){
        return NextResponse.redirect(new URL('/authentication/login/', url))
    }

    if(req.nextUrl.pathname=='/utilities/chats' && !verifiedToken){
        return NextResponse.redirect(new URL('/authentication/login/', url))
    }




}



export const config={
    matcher:['/', '/authentication/login/', '/utilities/swap/', '/utilities/chats/']
}