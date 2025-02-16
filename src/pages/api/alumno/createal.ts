import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
        nombre,
        apellido,
        fechaNacimiento,
        fechaInicio,
        graduacionActual,
        fechaGradActual,
        email,
        passwordHash,
        foto,
       
    } = req.body;
    
    try {
      const nuevoAlumno = await prisma.alumno.create({
        data: {
            nombre,
            apellido,
            fechaNacimiento,
            fechaInicio,
            graduacionActual,
            fechaGradActual,
            email,
            passwordHash,
            foto,
        },
      });
      res.status(201).json(nuevoAlumno);
    } catch (error) {
      console.error('Error al crear el alumno:', error);
      res.status(500).json({ error: 'Error al crear el alumno' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}