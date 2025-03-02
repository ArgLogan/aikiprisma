//import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
//const prisma = new PrismaClient();
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
        nombre,
        fecha,
        categoria,
    } = req.body;
    
    try {
      const nuevoAlumno = await prisma.evento.create({
        data: {
            nombre,
            fecha,
            categoria,
        },
      });
      res.status(201).json(nuevoAlumno);
    } catch (error) {
      console.error('Error al crear el evento:', error);
      res.status(500).json({ error: 'Error al crear el evento' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}