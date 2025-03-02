// pages/api/feriado/delete/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
//import { PrismaClient } from '@prisma/client';
//const prisma = new PrismaClient();
import { prisma } from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  console.log('id:', id);

  if (req.method === 'DELETE') {
    try {
      if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: 'ID inválido o no proporcionado' });
      }

      const claseId = parseInt(id, 10);
      if (isNaN(claseId)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const clase = await prisma.clase.findUnique({
        where: { id: claseId },
      });
      console.log('clase:', clase);
      if (!clase) {
        return res.status(404).json({ error: 'clase no encontrado' });
      }
      console.log('fclaseId:', claseId);
      await prisma.clase.delete({
        where: { id: clase.id },
      });

      return res.status(200).json({ message: 'clase eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar el clase:', error);
      return res.status(500).json({ error: 'Error interno al eliminar el Feriado' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
}
