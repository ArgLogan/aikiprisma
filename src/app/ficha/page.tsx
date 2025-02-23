'use client'
import styles from '../ui/ficha.module.css'
import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { formatearFecha, calculaCantDias } from '../funcs/funciones'; 
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'; 
import { GrUserAdd } from "react-icons/gr";
 
type EventoTipo = "CS" | "CD" | "SN" | "SI";

interface Asistencia {
  id: number
  fecha: string
  instructor: string
  tipo: string
}
interface Evento {
  id: number
  nombre: string
  categoria: EventoTipo
  fecha: string
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
  Eventos: Evento[]

}

export default function AlumnoList() {
  const router = useRouter()
  const [alumnos, setAlumnos] = useState<Alumno[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filtro, setFiltro] = useState("");
  const [mostrarTodos, setMostrarTodos] = useState(false);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch('/api/alumno/alumnos')
        const data = await response.json()
        setAlumnos(data)
      } catch (error) {
        console.error('Error fetching alumnos:', error)
        setAlumnos([{ id: 0, nombre: 'Error', apellido: 'Error', fechaNacimiento: 'Error', fechaInicio: 'Error', graduacionActual: 'Error', fechaGradActual: 'Error', email: 'Error', passwordHash: 'Error', foto: '/uploads/GenericoM.png', asistencia: [], Eventos: [] }])
      }
    }
    fetchAlumnos()
  }, [])

  const iconos = {
    CS: "🔵", // Clase especial
    CD: "🟣", // Clase de Danes
    SN: "🟢", // Seminario Nacional
    SI: "🔴", // Seminario Internacional
  };

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
  const eventosFiltrados = selectedAlumno.Eventos
    .filter(e => (filtro ? e.categoria === filtro : true))
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  const eventosMostrados = mostrarTodos ? eventosFiltrados : eventosFiltrados.slice(0, 10);

  const asistencia = selectedAlumno.asistencia.filter(clase => {
    const fechaClase = new Date(clase.fecha); 
    const fechaUltGrad = new Date(selectedAlumno.fechaGradActual); 

    return fechaClase.getTime() > fechaUltGrad.getTime(); 
  }).length;

  const asitenciaDetalle = calculaCantDias(['Martes','Jueves','Sabado'],selectedAlumno.fechaGradActual,new Date());

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
        <h2 className={styles.nombre}>
          {selectedAlumno.nombre} {selectedAlumno.apellido} 
        </h2>
        <p className={styles.titulo}>
        <span>Fecha de Inicio:</span> {formatearFecha(selectedAlumno.fechaInicio)}
        </p>
        <p className={styles.titulo}>
        <span>Graduación Actual:</span> {selectedAlumno.graduacionActual} 
        </p>
        <p className={styles.titulo}>
        <span> Fecha:</span> {formatearFecha(selectedAlumno.fechaGradActual)}
        </p>
        <h2 className={styles.nombre}>Asistencia</h2>
        <p className={styles.titulo}>
          <span >Presente:</span> {asistencia} <span>Ausente:</span> {asitenciaDetalle.cantidad-asistencia}  Meses: {asitenciaDetalle.meses}
        </p>
        <p className={styles.titulo}>
          <span >Email:</span> {selectedAlumno.email}
        </p>
        <p className={styles.titulo}>
        <span>Fecha de Nacimiento:</span> {formatearFecha(selectedAlumno.fechaNacimiento)}
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
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center"
          onClick={() => {
            sessionStorage.setItem('alumno', JSON.stringify(selectedAlumno));
            handleNavigation('/ficha/update');
          }}
        >
          <FaPencilAlt className="m-2" /> {/* Ícono de lápiz */}
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => handleNavigation('/ficha/crear')}
        >
          <GrUserAdd className='m-2'/>
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => handleNavigation('/ficha/borrar')}
        >
          <FaTrashAlt className="m-2"/>
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => handleSwipe('left')}
          disabled={currentIndex === alumnos.length - 1}
        >
          Siguiente
        </button>
      </div>
      <div>
        <h2 className="w-full text-lg font-semibold mb-2 mt-2 font-black">Eventos <span

          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => handleNavigation('/ficha/addferiado')}
        >
          <GrUserAdd className='m-2'/>

        </span></h2>
        <ul className="space-y-2">
          {eventosMostrados.map(evento => (
            <li key={evento.id} className="p-3 bg-white shadow rounded flex items-center">
              <span className="text-2xl mr-3">{iconos[evento.categoria]}</span>
              <div>
                <p className="font-semibold">{evento.nombre}</p>
                <p className="text-gray-500 text-sm">{evento.fecha}</p>
              </div>
            </li>
          ))}
        </ul>
        {eventosFiltrados.length > 10 && (
          <button
          onClick={() => setMostrarTodos(!mostrarTodos)}
          className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
          >
            {mostrarTodos ? "Mostrar menos" : "Mostrar más"}
          </button>
        )}
      </div>

    </div>
  )
}
