import User from '../Model/userModel';

import type { NextApiRequest, NextApiResponse } from 'next';


export default async function login(req: NextApiRequest,
    res: NextApiResponse){
    try{
       const users = User.find()
   }catch(err){
    console.error(err.stack);
    return res.status(500).json({ error: 'Internal server error' })
   }
}
