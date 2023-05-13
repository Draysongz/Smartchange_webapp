import { NextApiRequest, NextApiResponse } from 'next';
import {createChat, userChats, findChat} from './Routes/chatRoute'
import connectDB from './db/connection';

connectDB()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      // Call the createChat function
      await createChat(req, res);
    } else if (req.method === 'GET') {
      if (req.query.action === 'userChats') {
        // Call the userChats function
        await userChats(req, res);
      } else if (req.query.action === 'findChat') {
        // Call the findChat function
        await findChat(req, res);
      } else {
        res.status(404).send('Not found');
      }
    } else {
      res.status(405).send('Method not allowed');
    }
  }