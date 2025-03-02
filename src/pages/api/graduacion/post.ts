import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      nivel,
      tipo,
      fecha,
      dojo,
      alumno,
    } = req.body;
    
    try {
      const nuevaGraduacion = await prisma.graduacion.create({
        data: {
            nivel,
            tipo,
            fecha,
            dojo,
            alumno,
        },
      });
      res.status(201).json(nuevaGraduacion);
    } catch (error) {
      console.error('Error al crear la graduación:', error);
      res.status(500).json({ error: 'Error al crear la graduación' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}