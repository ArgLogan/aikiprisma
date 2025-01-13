import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const data = req.body;
      console.log('data:', data);
      const alumno = await prisma.alumno.update({
        where: { id: Number(id) },
        data,
        include:{asistencia:true, Eventos:true , graduaciones:true},
      });
      res.status(200).json(alumno);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el alumno' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
