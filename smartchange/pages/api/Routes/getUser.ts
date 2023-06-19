import User from '../Model/userModel';
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../db/connection';
import cors from 'cors';


 connectDB()
const corsHandler = cors();

export default async function getUserById(req: NextApiRequest, res: NextApiResponse) {
 
  await new Promise<void>((resolve, reject) => {
    corsHandler(req, res, (error: any) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
  const {userId }= req.query;

  try {
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
}
