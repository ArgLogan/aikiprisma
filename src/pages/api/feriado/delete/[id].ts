// pages/api/feriado/delete/[id].ts
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

      const feriadoId = parseInt(id, 10);
      if (isNaN(feriadoId)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const feriado = await prisma.feriado.findUnique({
        where: { id: feriadoId },
      });
      console.log('feriado:', feriado);
      if (!feriado) {
        return res.status(404).json({ error: 'Feriado no encontrado' });
      }
      console.log('feriadoId:', feriadoId);
      await prisma.feriado.delete({
        where: { id: feriado.id },
      });

      return res.status(200).json({ message: 'Feriado eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar el feriado:', error);
      return res.status(500).json({ error: 'Error interno al eliminar el Feriado' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
}
