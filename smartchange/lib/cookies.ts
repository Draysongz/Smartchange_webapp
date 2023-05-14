import { NextApiRequest, NextApiResponse} from 'next'
import cookies from 'cookies';
import http from 'http'

export function getCookie(req: NextApiRequest, res:NextApiResponse, name: string){

    if(!req || !req.headers){
        console.log('request object is null')
        return null
    }

    const cookiesInstance = new cookies(req, res)

    const cookie = cookiesInstance.get(name)

    if(!cookie){
        console.log('cookie not found')
        return null;
    }

    return cookie;
}