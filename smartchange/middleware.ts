import {NextRequest, NextResponse} from 'next/server'
import {verifyAuth} from './lib/auth'

export async function middleware(req:NextRequest){

    const token = req.cookies.get('myJWT')?.value

    const verifiedToken = 
    token && 
    (await verifyAuth(token).catch(err => console.log(err)))

    console.log('Token:', token)
    console.log('Verified Token:', verifiedToken)

    // if(req.nextUrl.pathname.startsWith('/authentication/login/') && !verifiedToken){
    //     return
    // }

    const url = req.url

    if(url.includes('/') && !verifiedToken){
        return NextResponse.redirect(new URL('/authentication/login', url))
    }

    // if(req.nextUrl.pathname=='/' && !verifiedToken){
    //     return NextResponse.redirect(new URL('/authentication/login/', url))
    // }

    // if(req.nextUrl.pathname=='/utilities/swap' && !verifiedToken){
    //     return NextResponse.redirect(new URL('/authentication/login/', url))
    // }

    // if(req.nextUrl.pathname=='/utilities/chats' && !verifiedToken){
    //     return NextResponse.redirect(new URL('/authentication/login/', url))
    // }
}

export const config={
    matcher:['/','/authentication/login', '/utilities/swap/', '/utilities/chats/']
}