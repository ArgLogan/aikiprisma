'use client'

export default function AddFeriado() {
   return(<div></div>)
}
//import { useState, useEffect } from 'react';
//import { useRouter } from 'next/navigation';
//import { formatearFecha } from '../../funcs/funciones'; 

//interface Evento {
   // id: number;
   // fecha: string;
   // categoria: string;
//}
// useEffect(() => {
//     const fetchEventos = async () => {
//       try {
//         const response = await fetch('/api/eventos/get');
//         const data = await response.json();
//         setAlumnos(data);
//       } catch (error) {
//         alert(`Error al cargar la lista de alumnos, ${error}`);
//       }
//     };
//     fetchAlumnos();
//   }, []);

//         <div>
//           <h3 className="text-lg font-semibold mb-2 font-black">Seleccionar Evento</h3>
//           <div className="max-h-40 overflow-y-auto space-y-2">
//             {alumnos.map((alumno) => (
//               <label key={alumno.id} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.presentes.some((a) => a.id === alumno.id)}
//                   onChange={() => handleCheckboxChange(alumno.id)}
//                   className="w-4 h-4"
//                 />
//                 <span>{`${alumno.nombre} ${alumno.apellido}`}</span>
//               </label>
//             ))}
//         </div>
//         </div>
