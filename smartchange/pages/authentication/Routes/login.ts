import User from '../Model/userModel';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import connectDB from "../db/connection"
import type { NextApiRequest, NextApiResponse } from 'next';

connectDB()

export default async function login(req: NextApiRequest,
    res: NextApiResponse){
    try{
       const user = await User.findOne({email: req.body.email})
       if(!user)return res.status(404).json('User not found')

       const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password,)
       if(!isPasswordCorrect)return res.status(401).json('Invalid Password')

       const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_PASS!,{expiresIn:"3d"} )
       const {password, isAdmin, isMerchant, ...others} = user._doc
       

       res.status(200).json({...others, token})
   }catch(err){
    console.error(err.stack);
    return res.status(500).json({ error: 'Internal server error' })
   }
}
