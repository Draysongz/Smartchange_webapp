import User from '../Model/userModel';

import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../db/connection'



export default async function getMerchants(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()
    try {
      const merchantUsers = await User.find({ isMerchant: true });
      
      const sanitizedMerchantUsers = merchantUsers.map(({ _doc }) => {
        const { password, ...rest } = _doc;
        if (password === undefined) {
          return rest;
        } else {
          return { password: '<redacted>', ...rest };
        }
      });

      res.status(200).json({ success: true, data: sanitizedMerchantUsers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  }
