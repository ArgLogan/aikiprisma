//import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
//const prisma = new PrismaClient();
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const clases = await prisma.clase.findMany({
        include: { presentes: { select: { nombre: true , apellido: true } } },
      });
      res.status(200).json(clases);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching clases' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}