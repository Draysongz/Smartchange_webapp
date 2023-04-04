import User from '../Model/userModel';
import bcrypt from 'bcryptjs'
import{SignJWT} from 'jose'
import {serialize} from 'cookie'
import connectDB from '../db/connection'
import {nanoid} from 'nanoid'
import {getJwtSecretKey} from '../../../lib/auth'
import type { NextApiRequest, NextApiResponse } from 'next';

connectDB()
export default async function login(req: NextApiRequest,
    res: NextApiResponse){
    try{
       const user = await User.findOne({email: req.body.email})
       if(!user)return res.status(404).json('User not found')

       const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password,)
       if(!isPasswordCorrect)return res.status(401).json('Invalid Password')

       const token = await new SignJWT({})
       .setProtectedHeader({alg: 'HS256',})
       .setJti(nanoid())
       .setIssuedAt()
       .setExpirationTime('10m')
       .sign(new TextEncoder().encode(getJwtSecretKey()))
       const {password, isAdmin, isMerchant, ...others} = user._doc
       
       const serialised = serialize("myJWT", token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        path: '/'

       })

       res.setHeader('set-cookie', serialised)
       res.status(200).json({...others, token})
   }catch(err){
    return res.status(500).json({ error: 'Internal server error' })
   }
}
