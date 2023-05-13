import { NextApiRequest, NextApiResponse } from 'next';
import getUserById from './Routes/getUser'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        if (req.query.action === 'getUser') {
            getUserById(req, res);
        }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }