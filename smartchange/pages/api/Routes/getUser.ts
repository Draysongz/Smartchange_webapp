import User from '../Model/userModel';
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../db/connection';

connectDB();

export default async function getUserById(req: NextApiRequest, res: NextApiResponse) {
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
