'use client';

import { useState, useEffect } from "react";
import AlumnoCard from '../../components/alumno';
import type { Evento } from "@/app/funcs/models";

export default function Eventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Estado para la fecha seleccionada
  const [filteredClases, setFilteredClases] = useState<Evento[]>([]); // Estado para las clases filtradas por fecha
  
  // Obtener las clases al cargar el componente
  useEffect(() => {
    const fetchAsistencia = async () => {
      try {
        const response = await fetch('/api/evento/get');
        const data = await response.json();
        setEventos(data);
        setSelectedDate(null)
      } catch (error) {
        console.error('Error fetching eventos:', error);
        alert(`Error fetching eventos, ${error}`);
      }
    };
    fetchAsistencia();
  }, []);

  // Filtrar las clases por fecha seleccionada
  useEffect(() => {
    if (selectedDate) {
      const filtered = eventos.filter((clase) => {
        const claseDate = new Date(clase.fecha + "T00:00:00" ); // Suponiendo que `clase.fecha` es una cadena de fecha
        return (
          claseDate.getFullYear() === selectedDate.getFullYear() &&
          claseDate.getMonth() === selectedDate.getMonth() &&
          claseDate.getDate() === selectedDate.getDate()
        );
      });
      setFilteredClases(filtered);
    } else {
      setFilteredClases([]); // Si no hay fecha seleccionada, no mostrar nada
    }
  }, [selectedDate, eventos]);
  
  formatSelectedDate(null)
  // Función para formatear la fecha seleccionada
  const formatSelectedDate = (date: Date | null): string => {
    if (!date) return ""; // Si no hay fecha seleccionada, devuelve una cadena vacía

    // Opciones para formatear la fecha
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', // Día de la semana (ej: "sábado")
      day: 'numeric',  // Día del mes (ej: "4")
      month: 'long',   // Mes (ej: "febrero")
    };

    // Formatear la fecha
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  };

  return (
    <main className="bg-slate-100 w-full h-full overflow-auto p-4">
      {/* Sección 1: Date Picker y leyenda */}
      <section className="mb-4 flex items-center gap-4">
        <ul>
          {}
        </ul>
        
      </section>

      {/* Sección 2: Lista de presentes */}
      <section className="bg-gray-400 rounded p-2">
        <h2 className="text-lg font-semibold mb-2">Lista de presentes</h2>
        {filteredClases.length > 0 ? (
          filteredClases.map((clase, index) => (
            <div key={index} className="space-y-2">
              {clase.presentes.map((alumno, idx) => (
                <AlumnoCard
                  key={idx}
                  alumno={alumno}
                />
              ))}
            </div>
          ))
        ) : (
          <p className="text-gray-600">
            {selectedDate ? "No hay asistencias para esta fecha." : "Selecciona una fecha para ver las asistencias."}
          </p>
        )}
      </section>
    </main>
  );
}
