import { NextApiRequest, NextApiResponse } from 'next';
import signup from './Routes/signup'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      signup(req, res);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }