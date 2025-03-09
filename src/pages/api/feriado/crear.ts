import { NextApiRequest, NextApiResponse } from 'next';
//import { PrismaClient } from '@prisma/client';
//const prisma = new PrismaClient();
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
        fecha,
        descripcion,
       
    } = req.body;
    
    try {
      const nuevoFeriado = await prisma.feriado.create({
        data: {
        fecha: new Date(fecha+"T00:00:00z"),
        descripcion,
        },
      });
      res.status(201).json(nuevoFeriado);
    } catch (error) {
      console.error('Error al crear el feriado:', error);
      res.status(500).json({ error: 'Error al crear el feriado' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}