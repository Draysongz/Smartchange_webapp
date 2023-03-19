import { NextApiRequest, NextApiResponse } from 'next';
import login from './Routes/login'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      login(req, res);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }