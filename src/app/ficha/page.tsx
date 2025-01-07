'use client'
import { useState } from 'react';

export default function AlumnoForm() {

const [formData, setFormData] = useState({
    nombre:'' ,
            apellido:'',
            fechaNacimiento:'',
            fechaInicio:'',
            graduacionActual:'',             
            fechaGradActual:'',
            email:'',
            telefono:'',
            direccion:'',
            dni:'',
            passwordHash:'',
            foto:'',
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        console.log(formData);
        const response = await fetch('/api/alumno/createal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
      
      if (response.ok) {
        alert('Alumno creado con éxito');
        setFormData({
            nombre:'' ,
            apellido:'',
            fechaNacimiento:'',
            fechaInicio:'',
            graduacionActual:'1er Dan',             
            fechaGradActual:'',
            email:'',
            telefono:'',
            direccion:'',
            dni:'',
            passwordHash:'',
            foto:'',
        });
      } else {
        alert('Error al crear el alumno');
      }
    } catch (error) {
      alert('Hubo un problema con la solicitud');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
      <input name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
      <input name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
      <input name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} required />
      <input name="dni" placeholder="DNI" value={formData.dni} onChange={handleChange} required />
      <input name="foto" placeholder="URL de la foto" value={formData.foto} onChange={handleChange} />
      <input name="passwordHash" type="password" placeholder="Contraseña" value={formData.passwordHash} onChange={handleChange} required />
      <input name="fechaInicio" type="date" value={formData.fechaInicio} onChange={handleChange} required />
      <input name="fechaGradActual" type="date" value={formData.fechaGradActual} onChange={handleChange} required />
      <button type="submit">Agregar Alumno</button>
    </form>
  );
}
