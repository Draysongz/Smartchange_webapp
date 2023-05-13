import { NextApiRequest, NextApiResponse } from 'next';
import { addMessage, getMessages } from './Routes/messageRoute';
import connectDB from './db/connection';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Call the addMessage function
    await addMessage(req, res);
  } else if (req.method === 'GET') {
    if (req.query.action === 'getMessages') {
    // Call the getMessages function
    await getMessages(req, res);
    }
  } else {
    res.status(405).send('Method not allowed');
  }
}
