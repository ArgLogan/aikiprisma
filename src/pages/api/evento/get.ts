import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Obtener el año desde los query parameters
      const { year } = req.query;

      // Validar que el año sea un número válido
      if (!year || isNaN(Number(year))) {
        return res.status(400).json({ error: 'Year parameter is required and must be a valid number' });
      }

      // Convertir el año a número
      const yearNumber = Number(year);

      // Crear una fecha de inicio (1 de enero del año proporcionado)
      const startDate = new Date(yearNumber -1, 11, 31);
      const endDate = new Date(yearNumber, 11, 31);

      // Consultar los eventos que son posteriores al 1 de enero del año proporcionado
      const eventos = await prisma.evento.findMany({
        where: {
          fecha: {
            gte: startDate, // gte = greater than or equal to (mayor o igual que)
            lte: endDate,
          },
        },
        include: {
          presentes: {
            select: {
              nombre: true,
              apellido: true,
              foto: true,
            },
            orderBy: {
              nombre: 'asc', // Ordenar los presentes por nombre en orden ascendente
            },
          },
        },
        orderBy: {
          fecha: 'desc', // Ordenar los eventos por fecha en orden descendente
        },
      });

      res.status(200).json(eventos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching eventos' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


// import { NextApiRequest, NextApiResponse } from 'next';
// import { prisma } from '../../../lib/prisma';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       const eventos = await prisma.evento.findMany({
//         include:{
//           presentes: {
//             select: {
//               nombre: true,
//               apellido: true,
//               foto: true,
//             },
//             orderBy: {
//               nombre: 'asc', // Ordenar los presentes por nombre en orden ascendente
//             },
//           },
//         },
//         orderBy: {
//           fecha: 'desc', // Ordenar por el campo 'nombre' de manera ascendente
//         },
//       });

//       res.status(200).json(eventos);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error fetching eventos' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }