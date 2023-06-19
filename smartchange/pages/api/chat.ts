import { NextApiRequest, NextApiResponse } from 'next';
import { createChat, userChats, findChat } from './Routes/chatRoute';
import connectDB from './db/connection';
import cors from 'cors';

connectDB();

const corsHandler = cors();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await new Promise<void>((resolve, reject) => {
    corsHandler(req, res, (error: any) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });

  if (req.method === 'POST') {
    await createChat(req, res);
  } else if (req.method === 'GET') {
    if (req.query.action === 'userChats') {
      await userChats(req, res);
    } else if (req.query.action === 'findChat') {
      await findChat(req, res);
    } else {
      res.status(404).send('Not found');
    }
  } else {
    res.status(405).send('Method not allowed');
  }
}
