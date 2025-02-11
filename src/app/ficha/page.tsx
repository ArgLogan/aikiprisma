// 'use client'
// import { useEffect, useState } from 'react'
// import { useSwipeable } from 'react-swipeable'
// import { useRouter } from 'next/navigation'
// import Image from 'next/image'

// interface Asistencia {
//   id: number
//   fecha: string
//   instructor: string
// }

// interface Alumno {
//   id: number
//   nombre: string
//   apellido: string
//   fechaNacimiento: string
//   fechaInicio: string
//   graduacionActual: string
//   fechaGradActual: string
//   email: string
//   telefono: string
//   direccion: string
//   dni: string
//   passwordHash: string
//   foto: string
//   asistencia: Asistencia[]
// }

// export default function AlumnoList() {
//   const router = useRouter()
//   const [alumnos, setAlumnos] = useState<Alumno[]>([])
//   const [currentIndex, setCurrentIndex] = useState(0)

//   useEffect(() => {
//     const fetchAlumnos = async () => {
//       try {
//         const response = await fetch('/api/alumno/alumnos')
//         const data = await response.json()
//         setAlumnos(data)
//       } catch (error) {
//         console.error('Error fetching alumnos:', error)
//       }
//     }
//     fetchAlumnos()
//   }, [])

//   const handleSwipe = (direction: string) => {
//     if (direction === 'left' && currentIndex < alumnos.length - 1) {
//       setCurrentIndex(currentIndex + 1)
//     } else if (direction === 'right' && currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1)
//     }
//   }

//   const handleNavigation = (route: string) => {
//     router.push(route)
//   }

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => handleSwipe('left'),
//     onSwipedRight: () => handleSwipe('right'),
//     trackMouse: true,
//   })

//   if (alumnos.length === 0) {
//     return <p className="text-center mt-10">Cargando alumnos...</p>
//   }

//   const selectedAlumno = alumnos[currentIndex]

//   return (
//     <div {...swipeHandlers} className="h-screen flex flex-col items-center justify-center">
//       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
//         <Image
//           className="mb-4 w-32 h-32 rounded-full mx-auto"
//           src={selectedAlumno.foto}
//           alt="Foto del alumno"
//           width={128}
//           height={128}
//         />
//         <h2 className="text-2xl font-bold mb-2">
//           {selectedAlumno.nombre} {selectedAlumno.apellido}
//         </h2>
//         <p>
//           <strong>DNI:</strong> {selectedAlumno.dni}
//         </p>
//         <p>
//           <strong>Email:</strong> {selectedAlumno.email}
//         </p>
//         <p>
//           <strong>Teléfono:</strong> {selectedAlumno.telefono}
//         </p>
//         <p>
//           <strong>Dirección:</strong> {selectedAlumno.direccion}
//         </p>
//         <p>
//           <strong>Fecha de Nacimiento:</strong> {selectedAlumno.fechaNacimiento}
//         </p>
//         <p>
//           <strong>Fecha de Inicio:</strong> {selectedAlumno.fechaInicio}
//         </p>
//         <p>
//           <strong>Graduación Actual:</strong> {selectedAlumno.graduacionActual}
//         </p>
//       </div>
//       <div className="mt-4 flex justify-between w-full max-w-sm">
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
//           onClick={() => handleSwipe('right')}
//           disabled={currentIndex === 0}
//         >
//           Anterior
//         </button>
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
//           onClick={() => handleSwipe('left')}
//           disabled={currentIndex === alumnos.length - 1}
//         >
//           Siguiente
//         </button>
//       </div>
//       <div className="mt-6 flex space-x-4">
//         <button
//           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//           onClick={() => handleNavigation('/ficha/update')}
//         >
//           Modificar
//         </button>
//         <button
//           className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           onClick={() => handleNavigation('/ficha/borrar')}
//         >
//           Borrar
//         </button>
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           onClick={() => handleNavigation('/ficha/crear')}
//         >
//           Crear
//         </button>
//       </div>
//     </div>
//   )
// }
import Image from 'next/image'
import Link from 'next/link'

interface Asistencia {
  id: number
  fecha: string
  instructor: string
}

interface Alumno {
  id: number
  nombre: string
  apellido: string
  fechaNacimiento: string
  fechaInicio: string
  graduacionActual: string
  fechaGradActual: string
  email: string
  telefono: string
  direccion: string
  dni: string
  passwordHash: string
  foto: string
  asistencia: Asistencia[]
}

async function getAlumnos(): Promise<Alumno[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/alumno/alumnos`, {
    cache: 'no-store'
  })
  if (!response.ok) {
    throw new Error('Error fetching alumnos')
  }
  return response.json()
}

export default async function AlumnoList({ searchParams }: { searchParams?: { index?: string } }) {
  const alumnos = await getAlumnos()
  const currentIndex = searchParams?.index ? parseInt(searchParams.index) : 0

  if (alumnos.length === 0) {
    return <p className="text-center mt-10">No hay alumnos registrados.</p>
  }

  const selectedAlumno = alumnos[currentIndex]

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <Image
          className="mb-4 w-32 h-32 rounded-full mx-auto"
          src={selectedAlumno.foto}
          alt="Foto del alumno"
          width={128}
          height={128}
        />
        <h2 className="text-2xl font-bold mb-2">
          {selectedAlumno.nombre} {selectedAlumno.apellido}
        </h2>
        <p><strong>DNI:</strong> {selectedAlumno.dni}</p>
        <p><strong>Email:</strong> {selectedAlumno.email}</p>
        <p><strong>Teléfono:</strong> {selectedAlumno.telefono}</p>
        <p><strong>Dirección:</strong> {selectedAlumno.direccion}</p>
        <p><strong>Fecha de Nacimiento:</strong> {selectedAlumno.fechaNacimiento}</p>
        <p><strong>Fecha de Inicio:</strong> {selectedAlumno.fechaInicio}</p>
        <p><strong>Graduación Actual:</strong> {selectedAlumno.graduacionActual}</p>
      </div>
      <div className="mt-4 flex justify-between w-full max-w-sm">
        <Link href={`?index=${currentIndex - 1}`} className={`px-4 py-2 bg-blue-500 text-white rounded ${currentIndex === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
          Anterior
        </Link>
        <Link href={`?index=${currentIndex + 1}`} className={`px-4 py-2 bg-blue-500 text-white rounded ${currentIndex === alumnos.length - 1 ? 'opacity-50 pointer-events-none' : ''}`}>
          Siguiente
        </Link>
      </div>
      <div className="mt-6 flex space-x-4">
        <Link href="/ficha/update" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Modificar
        </Link>
        <Link href="/ficha/borrar" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Borrar
        </Link>
        <Link href="/ficha/crear" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Crear
        </Link>
      </div>
    </div>
  )
}