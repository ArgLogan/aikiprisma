'use client'
import { useState } from 'react';

export default function ClasesForm() {

const [formData, setFormData] = useState({
    fecha:'',
    instructor:'',
    presentes:[{id:1}], 
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        console.log(formData);
        const response = await fetch('/api/fechas/creafecha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
      
      if (response.ok) {
        alert('clase creada con éxito');
        setFormData({
            fecha:'',
            instructor:'',
            presentes:[{id:1}],
        });
      } else {
        alert('Error al crear la clase');
      }
    } catch (error) {
      alert('Hubo un problema con la solicitud');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="instructor" placeholder="instructor" value={formData.instructor} onChange={handleChange} required />
      <input name="fecha" type="date" value={formData.fecha} onChange={handleChange} required />
      <button type="submit">Agregar Alumno</button>
    </form>
  );
}