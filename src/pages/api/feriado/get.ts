import { NextApiRequest, NextApiResponse } from 'next';
//import { PrismaClient } from '@prisma/client';
//const prisma = new PrismaClient();
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const feriado = await prisma.feriado.findMany({
        orderBy: {
          fecha: 'desc', // Ordenar por el campo 'nombre' de manera ascendente
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
