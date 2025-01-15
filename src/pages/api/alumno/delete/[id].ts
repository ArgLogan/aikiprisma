// pages/api/alumno/delete/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  console.log('id:', id);

  if (req.method === 'DELETE') {
    try {
      if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: 'ID inválido o no proporcionado' });
      }

      const alumnoId = parseInt(id, 10);
      if (isNaN(alumnoId)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const alumno = await prisma.alumno.findUnique({
        where: { id: alumnoId },
        include:{asistencia:false}
      });
      console.log('alumno:', alumno);
      if (!alumno) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
      }
      console.log('alumnoId:', alumnoId);
      await prisma.alumno.delete({
        where: { id: alumno.id },
        include:{asistencia:true, Eventos:true , graduaciones:true},
        
      });

      return res.status(200).json({ message: 'Alumno eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar el alumno:', error);
      return res.status(500).json({ error: 'Error interno al eliminar el alumno' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
}


