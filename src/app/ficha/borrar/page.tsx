'use client';
import { useState, useEffect } from 'react';

interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
}

export default function DeleteAlumnoForm() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [selectedAlumnoId, setSelectedAlumnoId] = useState<number | null>(null);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch('/api/alumno/alumnos');
        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        alert(`Error al cargar la lista de alumnos: ${error}`);	
      }
    };
    fetchAlumnos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlumnoId) {
      alert('Por favor, selecciona un alumno');
      return;
    }
    try {
      //const response = await fetch(`/api/alumno/delete?id=/${selectedAlumnoId}`, {
        const response = await fetch(`/api/alumno/delete/${selectedAlumnoId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Alumno eliminado con éxito');
        setAlumnos(alumnos.filter(alumno => alumno.id !== selectedAlumnoId));
        setSelectedAlumnoId(null);
      } else {
        alert('Error al eliminar el alumno');
      }
    } catch (error) {
      alert(`Hubo un problema con la solicitud: ${error}`);	
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-2xl font-bold mb-4">Eliminar Alumno</h2>
      <select
        value={selectedAlumnoId ?? ''}
        onChange={(e) => setSelectedAlumnoId(Number(e.target.value))}
        required
        className="w-full p-2 border rounded"
      >
        <option value="" disabled>Selecciona un alumno</option>
        {alumnos.map(alumno => (
          <option key={alumno.id} value={alumno.id}>
            {`${alumno.nombre} ${alumno.apellido}`}
          </option>
        ))}
      </select>
      <button type="submit" className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600">
        Eliminar Alumno
      </button>
    </form>
  );
}
