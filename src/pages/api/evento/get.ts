import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const eventos = await prisma.evento.findMany({
        include:{
          presentes: {
            select: {
              nombre: true,
              apellido: true,
              foto: true,
            },
            orderBy: {
              nombre: 'asc', // Ordenar los presentes por nombre en orden ascendente
            },
          },
        },
        orderBy: {
          fecha: 'desc', // Ordenar por el campo 'nombre' de manera ascendente
        },
      });

      res.status(200).json(eventos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching eventos' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}