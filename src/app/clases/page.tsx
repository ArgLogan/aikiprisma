'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
}

export default function ClasesForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fecha: '',
    instructor: '',
    tipo: '',
    presentes: [] as { id: number }[],
  });
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch('/api/alumno/alumnos');
        console.log('response:', response);
        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        alert(`Error al cargar la lista de alumnos, ${error}`);
      }
    };
    fetchAlumnos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (id: number) => {
    setFormData((prevData) => {
      const isPresent = prevData.presentes.find((alumno) => alumno.id === id);
      const updatedPresentes = isPresent
        ? prevData.presentes.filter((alumno) => alumno.id !== id)
        : [...prevData.presentes, { id }];
      return { ...prevData, presentes: updatedPresentes };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/fechas/creafecha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Clase creada con éxito');
        setFormData({
          fecha: '',
          instructor: '',
          tipo: '',
          presentes: [],
        });
      } else {
        alert('Error al crear la clase');
      }
    } catch (error) {
      alert(`Hubo un problema con la solicitud: ${error}`);
    }
  };

  const handleDeleteRedirect = () => {
    router.push('/clases/delete');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-2xl font-bold mb-4">Registrar Clase</h2>
      <input
        name="instructor"
        placeholder="Instructor"
        value={formData.instructor}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="tipo"
        placeholder="tipo"
        value={formData.tipo}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="fecha"
        type="date"
        value={formData.fecha}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <div>
        <h3 className="text-lg font-semibold mb-2">Seleccionar Alumnos Presentes</h3>
        <div className="max-h-40 overflow-y-auto space-y-2">
          {alumnos.map((alumno) => (
            <label key={alumno.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.presentes.some((a) => a.id === alumno.id)}
                onChange={() => handleCheckboxChange(alumno.id)}
                className="w-4 h-4"
              />
              <span>{`${alumno.nombre} ${alumno.apellido}`}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex space-x-4">
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Registrar Clase
        </button>
        <button
          type="button"
          onClick={handleDeleteRedirect}
          className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Eliminar Clase
        </button>
      </div>
    </form>
  );
}

