
'use client';
import { useState } from 'react';

export default function AlumnoForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    fechaInicio: '',
    graduacionActual: '',
    fechaGradActual: '',
    email: '',
    telefono: '',
    direccion: '',
    dni: '',
    passwordHash: '',
    foto: '',
  });

  const graduaciones = [
    '5to kyu', '4to kyu', '3er kyu', '2do kyu', '1er kyu',
    '1er Dan', '2do Dan', '3er Dan', '4to Dan', '5to Dan', '6to Dan', '7mo Dan'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/alumno/createal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Alumno creado con éxito');
        setFormData({
          nombre: '',
          apellido: '',
          fechaNacimiento: '',
          fechaInicio: '',
          graduacionActual: '1er Dan',
          fechaGradActual: '',
          email: '',
          telefono: '',
          direccion: '',
          dni: '',
          passwordHash: '',
          foto: '',
        });
      } else {
        alert('Error al crear el alumno');
      }
    } catch (error) {
      alert('Hubo un problema con la solicitud');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-2xl font-bold mb-4">Agregar Alumno</h2>
      <input
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="apellido"
        placeholder="Apellido"
        value={formData.apellido}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="fechaNacimiento"
        type="date"
        value={formData.fechaNacimiento}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="telefono"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="direccion"
        placeholder="Dirección"
        value={formData.direccion}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="dni"
        placeholder="DNI"
        value={formData.dni}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="foto"
        placeholder="URL de la foto"
        value={formData.foto}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="passwordHash"
        type="password"
        placeholder="Contraseña"
        value={formData.passwordHash}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="fechaInicio"
        type="date"
        value={formData.fechaInicio}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="fechaGradActual"
        type="date"
        value={formData.fechaGradActual}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <select
        name="graduacionActual"
        value={formData.graduacionActual}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="" disabled>Selecciona una graduación</option>
        {graduaciones.map((grado) => (
          <option key={grado} value={grado}>
            {grado}
          </option>
        ))}
      </select>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Agregar Alumno
      </button>
    </form>
  );
}
