import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  if (req.method === 'POST') {
    const {
        fecha,
        instructor,
        presentes,

    } = req.body;

    try {
      const nuevaClase = await prisma.clase.create({
        data: {
          fecha,
          instructor,
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