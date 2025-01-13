'use client';

import { useState } from 'react';

export default function CrearFeriadoForm() {
  const [formData, setFormData] = useState({
    fecha: '',
    descripcion: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
      } else {
        alert('Error al crear el feriado');
      }
    } catch (error) {
      alert('Hubo un problema con la solicitud');
    }
  };

  return (
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
  );
}
