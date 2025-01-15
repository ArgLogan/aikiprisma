'use client';

import { useEffect, useState } from 'react';

interface Feriado {
  id: number;
  fecha: string;
  descripcion: string;
}

export default function BorrarFeriadoForm() {
  const [feriados, setFeriados] = useState<Feriado[]>([]);
  const [selectedFeriadoId, setSelectedFeriadoId] = useState<number | null>(null);

  useEffect(() => {
    const fetchFeriados = async () => {
      try {
        const response = await fetch('/api/feriado/get');
        const data = await response.json();
        setFeriados(data);
      } catch (error) {
        alert(`Error al cargar los feriados: ${error}`);	
      }
    };
    fetchFeriados();
  }, []);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFeriadoId === null) {
      alert('Seleccione un feriado para borrar');
      return;
    }

    try {
      const response = await fetch(`/api/feriado/delete/${selectedFeriadoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Feriado eliminado con éxito');
        setFeriados(feriados.filter((feriado) => feriado.id !== selectedFeriadoId));
        setSelectedFeriadoId(null);
      } else {
        alert('Error al borrar el feriado');
      }
    } catch (error) {
      alert(`Hubo un problema con la solicitud: ${error}`);
    }
  };

  return (
    <form onSubmit={handleDelete} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-2xl font-bold mb-4">Borrar Feriado</h2>
      <select
        value={selectedFeriadoId ?? ''}
        onChange={(e) => setSelectedFeriadoId(Number(e.target.value))}
        required
        className="w-full p-2 border rounded"
      >
        <option value="" disabled>
          Seleccionar un feriado
        </option>
        {feriados.map((feriado) => (
          <option key={feriado.id} value={feriado.id}>
            {`${feriado.fecha} - ${feriado.descripcion}`}
          </option>
        ))}
      </select>
      <button type="submit" className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600">
        Borrar Feriado
      </button>
    </form>
  );
}
