'use client'
import styles from '../ui/ficha.module.css'
import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { formatearFecha } from '../funcs/funciones'; 


interface Asistencia {
  id: number
  fecha: string
  instructor: string
  tipo: string
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
  passwordHash: string
  foto: string
  asistencia: Asistencia[]
}

export default function AlumnoList() {
  const router = useRouter()
  const [alumnos, setAlumnos] = useState<Alumno[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch('/api/alumno/alumnos')
        const data = await response.json()
        setAlumnos(data)
      } catch (error) {
        console.error('Error fetching alumnos:', error)
      }
    }
    fetchAlumnos()
  }, [])

  const handleSwipe = (direction: string) => {
    if (direction === 'left' && currentIndex < alumnos.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNavigation = (route: string) => {
    router.push(route)
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    trackMouse: true,
  })

  if (alumnos.length === 0) {
    return <p className="text-center mt-10">Cargando alumnos...</p>
  }

  const selectedAlumno = alumnos[currentIndex]

  return (
    <div {...swipeHandlers} className="h-screen flex flex-col items-center justify-center">
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
        <p className={styles.titulo}>
          <span >Email:</span> {selectedAlumno.email}
        </p>
        <p>
        <span className={styles.resaltado}>Fecha de Nacimiento:</span> {formatearFecha(selectedAlumno.fechaNacimiento)}
        </p>
        <p>
        <span className={styles.resaltado}>Fecha de Inicio:</span> {formatearFecha(selectedAlumno.fechaInicio)}
        </p>
        <p>
        <span className={styles.resaltado}>Graduación Actual:</span> {selectedAlumno.graduacionActual} 
        </p>
        <p> 
        <span className={styles.resaltado}> Fecha:</span> {formatearFecha(selectedAlumno.fechaGradActual)}
        </p>
      </div>
      <div className="mt-4 flex justify-between w-full max-w-sm">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => handleSwipe('right')}
          disabled={currentIndex === 0}
        >
          Anterior
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => handleSwipe('left')}
          disabled={currentIndex === alumnos.length - 1}
        >
          Siguiente
        </button>
      </div>
      <div className="mt-6 flex space-x-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => handleNavigation('/ficha/update')}
        >
          Modificar
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => handleNavigation('/ficha/borrar')}
        >
          Borrar
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => handleNavigation('/ficha/crear')}
        >
          Crear
        </button>
      </div>
    </div>
  )
}
