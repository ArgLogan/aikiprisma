
'use client';
import { useState, useEffect } from 'react';
import styles from '../../ui/ficha.module.css';
import { formatearFecha } from '../../funcs/funciones';

interface Evento {
  id: number;
  nombre: string;
  fecha: string;
  categoria: string;
}

interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  fechaInicio: string;
  graduacionActual: string;
  fechaGradActual: string;
  email: string;
  passwordHash: string;
  foto: string;
  Eventos: Evento[];
}

export default function EventosList() {
  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [selectedEventos, setSelectedEventos] = useState<number[]>([]); // Almacena los IDs de los eventos seleccionados

  // Obtener el alumno seleccionado desde sessionStorage
  useEffect(() => {
    const alumnoData = sessionStorage.getItem('alumno');
    if (alumnoData) {
      setSelectedAlumno(JSON.parse(alumnoData));
    }
  }, []);

  // Obtener la lista de eventos
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('/api/evento/get');
        const data = await response.json();
        setEventos(data);
      } catch (error) {
        alert(`Error al cargar la lista de eventos: ${error}`);
      }
    };
    fetchEventos();
  }, []);

  // Manejar el cambio en los checkboxes
  const handleCheckboxChange = (id: number) => {
    setSelectedEventos((prevSelected) => {
      if (prevSelected.includes(id)) {
        // Si ya está seleccionado, lo quitamos
        return prevSelected.filter((eventoId) => eventoId !== id);
      } else {
        // Si no está seleccionado, lo agregamos
        return [...prevSelected, id];
      }
    });
  };

  // Función para agregar eventos seleccionados al alumno
  const handleAgregarEventos = async () => {
    if (!selectedAlumno) {
      alert('No hay un alumno seleccionado.');
      return;
    }

    if (selectedEventos.length === 0) {
      alert('No hay eventos seleccionados.');
      return;
    }

    // Filtrar los eventos seleccionados
    const eventosSeleccionados = eventos.filter((evento) =>
      selectedEventos.includes(evento.id)
    );

    // Crear una copia del alumno con los nuevos eventos agregados
    const alumnoActualizado = {
      ...selectedAlumno,
      Eventos: [...selectedAlumno.Eventos, ...eventosSeleccionados],
    };

    try {
      // Actualizar el alumno en la API
      const response = await fetch(`/api/alumno/update/${selectedAlumno.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alumnoActualizado),
      });

      if (response.ok) {
        alert('Eventos agregados al alumno correctamente.');
        // Actualizar el alumno en el estado y sessionStorage
        setSelectedAlumno(alumnoActualizado);
        sessionStorage.setItem('alumno', JSON.stringify(alumnoActualizado));
        // Limpiar los eventos seleccionados
        setSelectedEventos([]);
      } else {
        alert('Error al actualizar el alumno.');
      }
    } catch (error) {
      alert(`Hubo un problema con la solicitud: ${error}`);
    }
  };

  return (
    <div className="bg-gray-200 w-full h-fit">
      <h2 className="text-2xl-black font-bold mb-4 w-3/4 text-center">Lista de Eventos</h2>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-4 h-full'>
        <div className=" mx-1 px-1 max-h-80 overflow-y-auto space-y-2 text-black">
          {eventos.map((evento) => (
            <label key={evento.id} className="flex items-center space-x-2 text-black">
              <input
                type="checkbox"
                checked={selectedEventos.includes(evento.id)}
                onChange={() => handleCheckboxChange(evento.id)}
                className=" mx-4 w-4 h-4"
                />
              <span>
                ({evento.categoria}) - {formatearFecha(evento.fecha)} - {evento.nombre}
              </span>
            </label>
          ))}
        </div>

{/* Mostrar los eventos seleccionados (opcional) */}

        <div className="mt-4 text-black">
          <h3 className="text-lg-black font-semibold mb-2">Eventos Seleccionados</h3>
          <ul>
            {selectedEventos.map((id) => {
              const evento = eventos.find((e) => e.id === id);
              return (
                <li key={id} className="mb-2 text-black">
                  {evento?.nombre} - {formatearFecha(evento?.fecha)}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
  {/* Botón para agregar eventos al alumno */}
      <button
        onClick={handleAgregarEventos}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Agregar Eventos
      </button>
    </div>
  );
}