'use client';

import { useState, useEffect } from 'react';

interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  fechaInicio: string;
  graduacionActual: string;
  fechaGradActual: string;
  email: string;
  telefono: string;
  direccion: string;
  dni: string;
  passwordHash: string;
  foto: string;
}

export default function ActualizarAlumnoForm() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch('/api/alumno/alumnos');
        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        alert(`Error al cargar los alumnos: ${error}`);	
      }
    };
    fetchAlumnos();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedAlumno) {
      setSelectedAlumno({ ...selectedAlumno, [e.target.name]: e.target.value });
    }
  };

  const handleSelectAlumno = (id: number) => {
    const alumno = alumnos.find((a) => a.id === id);
    setSelectedAlumno(alumno || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlumno) {
      alert('Seleccione un alumno para actualizar');
      return;
    }
    try {
      const response = await fetch(`/api/alumno/update/${selectedAlumno.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedAlumno),
      });

      if (response.ok) {
        alert('Alumno actualizado con éxito');
      } else {
        alert('Error al actualizar el alumno');
      }
    } catch (error) {
      alert(`Hubo un problema con la solicitud: ${error}`);	
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-2xl font-bold mb-4">Actualizar Alumno</h2>
      <select
        onChange={(e) => handleSelectAlumno(Number(e.target.value))}
        className="w-full p-2 border rounded"
      >
        <option value="">Seleccionar un alumno</option>
        {alumnos.map((alumno) => (
          <option key={alumno.id} value={alumno.id}>
            {`${alumno.nombre} ${alumno.apellido}`}
          </option>
        ))}
      </select>
      {selectedAlumno && (
        <>
          <input
            name="nombre"
            value={selectedAlumno.nombre}
            onChange={handleInputChange}
            placeholder="Nombre"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="apellido"
            value={selectedAlumno.apellido}
            onChange={handleInputChange}
            placeholder="Apellido"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="fechaNacimiento"
            value={selectedAlumno.fechaNacimiento}
            onChange={handleInputChange}
            placeholder="Fecha de Nacimiento"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            value={selectedAlumno.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="telefono"
            value={selectedAlumno.telefono}
            onChange={handleInputChange}
            placeholder="Teléfono"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="fechaInicio"
            value={selectedAlumno.fechaInicio}
            onChange={handleInputChange}
            placeholder="Fecha de Inicio"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="fechaGradActual"
            value={selectedAlumno.fechaGradActual}
            onChange={handleInputChange}
            placeholder="Fecha de fecha Grad Actual"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="foto"
            value={selectedAlumno.foto}
            onChange={handleInputChange}
            placeholder="Foto"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="graduacionActual"
            value={selectedAlumno.graduacionActual}
            onChange={handleInputChange}
            placeholder="Graduacion Actual"
            required
            className="w-full p-2 border rounded"
          />
          {/* Agrega más campos según sea necesario */}
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Actualizar Alumno
          </button>
        </>
      )}
    </form>
  );
}
