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
        data: {id:data.id,
          nombre: data.nombre,
          apellido: data.apellido,
          fechaNacimiento: data.fechaNacimiento,
          fechaInicio: data.fechaInicio,
          graduacionActual: data.graduacionActual,
          fechaGradActual: data.fechaGradActual,
          email: data.email,
          telefono: data.telefono,
          direccion: data.direccion,
          dni: data.dni,
          passwordHash: data.passwordHash,
          foto: data.foto,
          asistencia: {connect: data.asistencia.map((asisId: any) => ({ id: asisId.id })) }, 
          Eventos: {connect: data.Eventos.map((eventosId: any) => ({ id: eventosId.id })) },
          graduaciones: {connect: data.graduaciones.map((graduacionesId: any) => ({ id: graduacionesId.id })) }
        }

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
