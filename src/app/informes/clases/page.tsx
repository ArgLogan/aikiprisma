'use client';

import { useState, useEffect } from "react";
import AlumnoCard from '../../components/alumno';
import type { Asistencia } from "@/app/funcs/models";
import DatePicker from 'react-datepicker'; // Importa el date picker
import 'react-datepicker/dist/react-datepicker.css'; // Estilos del date picker

export default function Clases() {
  const [clases, setClases] = useState<Asistencia[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Estado para la fecha seleccionada
  const [filteredClases, setFilteredClases] = useState<Asistencia[]>([]); // Estado para las clases filtradas por fecha

  // Obtener las clases al cargar el componente
  useEffect(() => {
    const fetchAsistencia = async () => {
      try {
        const response = await fetch('/api/fechas/clases');
        const data = await response.json();
        setClases(data);
      } catch (error) {
        console.error('Error fetching asistencia:', error);
        alert(`Error fetching asistencia, ${error}`);
      }
    };
    fetchAsistencia();
  }, []);

  // Filtrar las clases por fecha seleccionada
  useEffect(() => {
    if (selectedDate) {
      const filtered = clases.filter((clase) => {
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
  }, [selectedDate, clases]);

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
        <div>
          <h2 className="text-lg font-semibold mb-2">Selecciona una fecha</h2>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy" // Formato de la fecha
            className="p-2 border rounded"
            placeholderText="Selecciona una fecha"
          />
        </div>
        {/* Leyenda con la fecha formateada */}
        {selectedDate && (
          <div className="mt-6">
            <span className="text-lg font-semibold">
              {formatSelectedDate(selectedDate)}
            </span>
          </div>
        )}
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


// 'use client';

// import { useState, useEffect } from "react";
// import AlumnoCard from '../../components/alumno';
// import type { Asistencia } from "@/app/funcs/models";
// import DatePicker from 'react-datepicker'; // Importa el date picker
// import 'react-datepicker/dist/react-datepicker.css'; // Estilos del date picker

// export default function Clases() {
//   const [clases, setClases] = useState<Asistencia[]>([]);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Estado para la fecha seleccionada
//   const [filteredClases, setFilteredClases] = useState<Asistencia[]>([]); // Estado para las clases filtradas por fecha

//   // Obtener las clases al cargar el componente
//   useEffect(() => {
//     const fetchAsistencia = async () => {
//       try {
//         const response = await fetch('/api/fechas/clases');
//         const data = await response.json();
//         setClases(data);
//       } catch (error) {
//         console.error('Error fetching asistencia:', error);
//         alert(`Error fetching asistencia, ${error}`);
//       }
//     };
//     fetchAsistencia();
//   }, []);

//   // Filtrar las clases por fecha seleccionada
//   useEffect(() => {
//     console.log(selectedDate)
//     if (selectedDate) {
//       const filtered = clases.filter((clase) => {
//         const claseDate = new Date(clase.fecha +"T00:00:00"); // Suponiendo que `clase.fecha` es una cadena de fecha
//         console.log(claseDate)
//         return (
//           claseDate.getFullYear() === selectedDate.getFullYear() &&
//           claseDate.getMonth() === selectedDate.getMonth() &&
//           claseDate.getDate() === selectedDate.getDate()
//         );
//       });
//       setFilteredClases(filtered);
//     } else {
//       setFilteredClases([]); // Si no hay fecha seleccionada, no mostrar nada
//     }
//   }, [selectedDate, clases]);

//   return (
//     <main className="bg-slate-100 w-full h-full overflow-auto p-4">
//       {/* Sección 1: Date Picker */}
//       <section className="mb-4">
//         <h2 className="text-lg font-semibold mb-2">Selecciona una fecha</h2>
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date: Date | null) => setSelectedDate(date)}
//           dateFormat="dd/MM/yyyy" // Formato de la fecha
//           className="p-2 border rounded"
//           placeholderText="Selecciona una fecha"
//         />
//       </section>

//       {/* Sección 2: Lista de presentes */}
//       <section className="bg-gray-400 rounded p-2">
//         <h2 className="text-lg font-semibold mb-2">Lista de presentes</h2>
//         {filteredClases.length > 0 ? (
//           filteredClases.map((clase, index) => (
//             <div key={index}>
//               {clase.presentes.map((alumno, idx) => (
//                 <AlumnoCard
//                   key={idx}
//                   alumno={alumno}
//                 />
//               ))}
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600">
//             {selectedDate ? "No hay asistencias para esta fecha." : "Selecciona una fecha para ver las asistencias."}
//           </p>
//         )}
//       </section>
//     </main>
//   );
// }

