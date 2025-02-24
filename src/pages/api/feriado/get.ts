import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';


const prisma = new PrismaClient();


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const feriado = await prisma.feriado.findMany({
        orderBy: {
          fecha: 'asc', // Ordenar por el campo 'nombre' de manera ascendente
        },
      })// Ajusta según tu modelo
      res.status(200).json(feriado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching feriado' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
