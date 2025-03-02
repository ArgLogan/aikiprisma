//import { PrismaClient } from '@prisma/client';
//const prisma = new PrismaClient();
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  if (req.method === 'POST') {
    const {
        fecha,
        instructor,
        presentes,
        tipo,

    } = req.body;

    try {
      const nuevaClase = await prisma.clase.create({
        data: {
          fecha,
          instructor,
          tipo,
          presentes: {
            connect: presentes.map((alumno: { id: number }) => ({
              id: alumno.id
            }))
          }
        },
        include: {
          presentes: true // Incluimos los presentes en la respuesta
        }
      });

      console.log('Clase creada:', nuevaClase);
      res.status(201).json(nuevaClase);
     
    } catch (error) {
      console.error('Error al crear el alumno:', error);
      res.status(500).json({ error: 'Error al crear la clase' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}