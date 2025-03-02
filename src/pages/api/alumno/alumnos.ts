import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const alumnos = await prisma.alumno.findMany({
        include: {
          asistencia: true,
          Eventos: true,
          graduaciones: {
            orderBy:{fecha: 'desc'},
          },
        },
        orderBy: {
          nombre: 'asc', // Ordenar por el campo 'nombre' de manera ascendente
        },
      });

      res.status(200).json(alumnos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching alumnos' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}