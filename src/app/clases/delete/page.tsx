'use client';

import { useEffect, useState } from 'react';

interface Clase {
  id: number;
  fecha: string;
  instructor: string;
}

export default function BorrarClaseForm() {
  const [clases, setClases] = useState<Clase[]>([]);
  const [selectedClaseId, setSelectedClaseId] = useState<number | null>(null);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await fetch('/api/fechas/clases');
        const data = await response.json();
        setClases(data);
      } catch (error) {
        alert('Error al cargar las clases');
      }
    };
    fetchClases();
  }, []);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedClaseId === null) {
      alert('Seleccione una clase para borrar');
      return;
    }

    try {
      const response = await fetch(`/api/fechas/delete/${selectedClaseId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Clase eliminada con éxito');
        setClases(clases.filter((clase) => clase.id !== selectedClaseId));
        setSelectedClaseId(null);
      } else {
        alert('Error al borrar la clase');
      }
    } catch (error) {
      alert('Hubo un problema con la solicitud');
    }
  };

  return (
    <form onSubmit={handleDelete} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-2xl font-bold mb-4">Borrar Clase</h2>
      <select
        value={selectedClaseId ?? ''}
        onChange={(e) => setSelectedClaseId(Number(e.target.value))}
        required
        className="w-full p-2 border rounded"
      >
        <option value="" disabled>
          Seleccionar una clase
        </option>
        {clases.map((clase) => (
          <option key={clase.id} value={clase.id}>
            {`${clase.fecha} - ${clase.instructor}`}
          </option>
        ))}
      </select>
      <button type="submit" className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600">
        Borrar Clase
      </button>
    </form>
  );
}
