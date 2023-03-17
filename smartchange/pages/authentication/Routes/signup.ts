import User from '../Model/userModel';
import bcrypt from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next';



export default async function signup(req: NextApiRequest,
  res: NextApiResponse){

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt)

    const usernameExists = await User.findOne({ username: req.body.username });
    const emailExists = await User.findOne({ email: req.body.email });

    if (usernameExists) {
      return res.status(503).json( 'Username exists' )
    } else if (emailExists) {
      return res.status(503).json('Email exists' )
    } 
      const newUser = new User({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        phone: req.body.number
      })
      
      const savedUser = await newUser.save()
      return res.status(200).json(savedUser)
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
