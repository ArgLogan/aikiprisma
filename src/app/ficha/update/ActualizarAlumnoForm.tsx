"use client";

import { useState } from "react";

interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaNacimiento: string;
  fechaInicio: string;
  graduacionActual: string;
  fechaGradActual: string;
  foto: string;
  passwordHash: string;
  dni:string;
}

export default function ActualizarAlumnoForm({ alumnos }: { alumnos: Alumno[] }) {
  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null);
  const [formData, setFormData] = useState<Partial<Alumno>>({});

  const handleSelectAlumno = (id: number) => {
    const alumno = alumnos.find((a) => a.id === id);
    setSelectedAlumno(alumno || null);
    setFormData(alumno || {});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlumno) {
      alert("Seleccione un alumno para actualizar");
      return;
    }
    console.log("formData:", formData);
    try {
      const response = await fetch(`/api/alumno/update/${selectedAlumno.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Alumno actualizado con éxito");
      } else {
        alert("Error al actualizar el alumno");
      }
    } catch (error) {
      alert(`Hubo un problema con la solicitud: ${error}`);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-2xl font-bold mb-4">Actualizar Alumno</h2>

      <select onChange={(e) => handleSelectAlumno(Number(e.target.value))} className="w-full p-2 border rounded">
        <option value="">Seleccionar un alumno</option>
        {alumnos.map((alumno) => (
          <option key={alumno.id} value={alumno.id}>
            {`${alumno.nombre} ${alumno.apellido}`}
          </option>
        ))}
      </select>

      {selectedAlumno && (
        <>
          <InputField name="nombre" value={formData.nombre || ""} onChange={handleInputChange} />
          <InputField name="apellido" value={formData.apellido || ""} onChange={handleInputChange} />
          <InputField name="email" value={formData.email || ""} onChange={handleInputChange} />
          <InputField name="telefono" value={formData.telefono || ""} onChange={handleInputChange} />
          <InputField name="direccion" value={formData.direccion || ""} onChange={handleInputChange} />
          <InputField name="fechaNacimiento" value={formData.fechaNacimiento || ""} onChange={handleInputChange} />
          <InputField name="fechaInicio" value={formData.fechaInicio || ""} onChange={handleInputChange} />
          <InputField name="graduacionActual" value={formData.graduacionActual || ""} onChange={handleInputChange} />
          <InputField name="fechaGradActual" value={formData.fechaGradActual || ""} onChange={handleInputChange} />
          <InputField name="foto" value={formData.foto || ""} onChange={handleInputChange} />
          <InputField name="dni" value={formData.dni || ""} onChange={handleInputChange} />
          <InputField name="passwordHash" value={formData.passwordHash || ""} onChange={handleInputChange} />

          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Actualizar Alumno
          </button>
        </>
      )}
    </form>
  );
}

// 🟢 Componente reutilizable para inputs
function InputField({ name, value, onChange }: { name: string; value: string; onChange: (e: any) => void }) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={name}
      required
      className="w-full p-2 border rounded"
    />
  );
}
