
'use client';

import { useState, useEffect } from 'react';
import { formatearFecha } from '../funcs/funciones';
import { useRouter } from 'next/navigation'

export default function CrearFeriadoForm() {
  interface Feriado {
    id: number;   
    fecha: string;
    descripcion: string;
  }
  const router = useRouter()

  const [formData, setFormData] = useState({
    fecha: '',
    descripcion: '',
  });
  const [feriados, setFeriados] = useState<Feriado[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchFeriados = async () => {
      try {
        const response = await fetch('/api/feriado/get');
        const data = await response.json();
        setFeriados(data);
      } catch (error) {
        alert(`Error al cargar la lista de feriados, ${error}`);
      }
    };
    fetchFeriados();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/feriado/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Feriado creado con éxito');
        setFormData({ fecha: '', descripcion: '' });
        const response = await fetch('/api/feriado/get');
        const data = await response.json();
        setFeriados(data);
      } else {
        alert('Error al crear el feriado');
      }
      
    } catch (error) {
      alert(`Hubo un problema con la solicitud: ${error}`);
    }
  };
  const handleNavigate = (route:string) => {
    router.push(route)
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <section className='bg-gray-300 p-4'>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
          <h2 className="text-2xl font-bold mb-4">Crear Feriado</h2>
          <input
            name="fecha"
            type="date"
            value={formData.fecha}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            />
          <input
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Crear Feriado
          </button>
        </form>
      </section>
      <div className="bg-gray-300 p-4">
        <h2 className="w-full px-4 text-center text-xl font-bold mb-2">Lista de Feriados</h2>
        <ul className="list-disc pl-6">
          {feriados.length > 0 ? (
            feriados.map((feriado) => (
              <li key={feriado.id} className="mb-2" onDoubleClick={() => handleNavigate('/feriados/delete/')}>
                <span className="font-semibold">{formatearFecha(feriado.fecha)}:</span> {feriado.descripcion}
              </li>
            ))
          ) : (
            <p>No hay feriados registrados.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
