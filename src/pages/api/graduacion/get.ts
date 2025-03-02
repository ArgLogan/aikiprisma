import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const eventos = await prisma.graduacion.findMany({

        orderBy: {
          fecha: 'desc', // Ordenar por el campo 'fecha' de manera descendente
        },
      });

      res.status(200).json(eventos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching graduación' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}