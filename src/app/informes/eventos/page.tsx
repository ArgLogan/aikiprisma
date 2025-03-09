'use client';

import { useState, useEffect } from "react";
//import AlumnoCard from '../../components/alumno';
import type { Evento } from "@/app/funcs/models";
import Image from 'next/image'
import {fotoEventos, formatearFecha} from '../../funcs/funciones'
import DatePicker from 'react-datepicker'; // Importa el date picker
import "react-datepicker/dist/react-datepicker.css";

export default function Eventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  // Obtener las clases al cargar el componente
  // useEffect(()=>{
  //   setSelectedYear(new Date().getFullYear())
  // },[]);

  useEffect(() => {
    const fetchAsistencia = async () => {
      try {
        const response = await fetch(`/api/evento/get?year=${selectedYear}`);
        const data = await response.json();
        setEventos(data);
      } catch (error) {
        console.error('Error fetching eventos:', error);
        alert(`Error fetching eventos, ${error}`);
      }
    };
    fetchAsistencia();
  }, [selectedYear]);

   
   const renderYearContent = (year: number) => {
    return (
      <div style={{ textAlign: "center" }}>
        {year}
      </div>
    );
  };
  const handleYearChange = (date: Date | null) => {
    setSelectedYear(date ? date.getFullYear() : selectedYear)
  };

  return (
    <main className="bg-slate-100 w-full h-full overflow-auto p-4">

      <section className="grid grid-cols-2 gap-4 mb-4 bg-gray-300">
        <h1 className="text-3xl font-bold">Seleccione el año</h1>
        <DatePicker
          selected={new Date(selectedYear,0,1)}
          onChange={handleYearChange}
          showYearPicker // Mostrar solo el selector de año
          dateFormat="yyyy" // Mostrar solo el año en el input
          yearItemNumber={6} // Número de años mostrados por página
          renderYearContent={renderYearContent} // Personalizar el contenido del año
          className="p-2 border rounded"
          placeholderText="Selecciona un año"
        />
      </section>
      <section className="mb-4 flex items-center gap-4">
        <ul>
          {eventos.map((evento,idx)=>(
            <li key={idx} className="grid grid-cols-2 gap-2">
              <Image className="rounded-xl row-span-2"
                src={fotoEventos(evento)}
                alt={evento.categoria}
                height={40}
                width={40}
              />
              <h1 className="text-lg font-semibold">{formatearFecha(evento.fecha)}</h1>
              <h1 className="text-lg font-semibold">{evento.nombre}</h1>  
            </li>
          ))}
        </ul>
      </section>

      {/* Sección 2: Lista de presentes */}
      <section className="bg-gray-400 rounded p-2">
        <h2 className="text-lg font-semibold mb-2">Lista de presentes</h2>
        {/* {filteredClases.length > 0 ? (
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
        )} */}
      </section>
    </main>
  );
}
