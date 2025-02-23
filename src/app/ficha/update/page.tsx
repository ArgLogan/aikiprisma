'use client';

import { useState, useEffect } from 'react';
import styles from '../../ui/ficha.module.css'
import { useRouter } from 'next/navigation'

interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  fechaInicio: string;
  graduacionActual: string;
  fechaGradActual: string;
  email: string;
  passwordHash: string;
  foto: string;
}

export default function ActualizarAlumnoForm() {
  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null);
  const router = useRouter()
  useEffect(() => {
    const alumnoData = sessionStorage.getItem('alumno');
    if (alumnoData) {
      setSelectedAlumno(JSON.parse(alumnoData));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedAlumno) {
      setSelectedAlumno({ ...selectedAlumno, [e.target.name]: e.target.value });
    }
  };
  const handleNavigation = (route: string) => {
    router.push(route)
  }
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
        handleNavigation('/ficha');
      } else {
        alert('Error al actualizar el alumno');
      }
    } catch (error) {
      alert(`Hubo un problema con la solicitud: ${error}`);	
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className={styles.titulo}>Actualizar Alumno</h2>
      
      {selectedAlumno && (
        <>
          <input
            name="nombre"
            value={selectedAlumno.nombre}
            onChange={handleInputChange}
            placeholder="Nombre"
            required
            className={styles.forminput}
          />
          <input
            name="apellido"
            value={selectedAlumno.apellido}
            onChange={handleInputChange}
            placeholder="Apellido"
            required
            className={styles.forminput}
          />
          <input
            name="foto"
            value={selectedAlumno.foto}
            onChange={handleInputChange}
            placeholder="Foto"
            required
            className={styles.forminput}
          />
          <input
            name="fechaNacimiento"
            value={selectedAlumno.fechaNacimiento}
            onChange={handleInputChange}
            placeholder="Fecha de Nacimiento"
            required
            className={styles.forminput}
          />
          <label htmlFor="fechaNacimiento"> fecha de nacimiento</label>
          <input
            name="email"
            value={selectedAlumno.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className={styles.forminput}
          />
          <input
            name="fechaInicio"
            value={selectedAlumno.fechaInicio}
            onChange={handleInputChange}
            placeholder="Fecha de Inicio"
            required
            className={styles.forminput}
          />
          <label htmlFor="fechaInicio">Fecha de inicio</label>
          <input
            name="fechaGradActual"
            value={selectedAlumno.fechaGradActual}
            onChange={handleInputChange}
            placeholder="Fecha de fecha Grad Actual"
            required
            className={styles.forminput}
          />
          <label htmlFor="fechaGradActual" >Fecha de graduación actual</label>
          {/* Agrega más campos según sea necesario */}
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Actualizar Alumno
          </button>

          <button 
            type='button'
            className=" p-2 bg-red-500 text-white rounded hover:bg-red-600"
            //onClick={() => handleNavigation('/ficha')}
            onClick={router.back}
          >
            Cancelar
          </button>
        </>
      )}
    </form>
  );
}