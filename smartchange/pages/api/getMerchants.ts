import { NextApiRequest, NextApiResponse } from 'next';
import getMerchants from './Routes/getMerchants'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      getMerchants(req, res);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }