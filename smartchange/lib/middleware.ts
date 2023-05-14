import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { jwtVerify } from 'jose';


export const getJwtSecretKey = () => {
  const secret = process.env.JWT_PASS;

  if (!secret || secret.length === 0) {
    throw new Error('JWT_SECRET_KEY is not set');
  }
  return secret;
};
