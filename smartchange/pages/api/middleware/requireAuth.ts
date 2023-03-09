import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export const requireAuth = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_PASS!);
    req.user = decodedToken;
    return await handler(req, res);
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
