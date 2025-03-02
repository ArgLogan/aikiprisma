'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../ui/clases.module.css';
import { formatearFecha } from '../funcs/funciones'; 
import type { Asistencia, Alumno } from '../funcs/models';


export default function ClasesForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fecha: '',
    instructor: '',
    tipo: '',
    presentes: [] as { id: number }[],
  });
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [clases, setClases] = useState<string[]>([]); // Estado para almacenar las clases
  const [expanded, setExpanded] = useState(false); // Estado para controlar la expansión de la lista

  function ordenarFechas(clases: Asistencia[]): string[] {
    // Extraer las fechas del array de objetos Clase
    const fechas = clases.map((clase) => clase.fecha);
  
    // Ordenar las fechas de la más actual a la más antigua
    fechas.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
    return fechas;
  }

  // Obtener la lista de alumnos
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch('/api/alumno/alumnos');
        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        alert(`Error al cargar la lista de alumnos, ${error}`);
      }
    };
    fetchAlumnos();
  }, []);

  // Obtener la lista de clases
  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await fetch('/api/fechas/clases');
        const data = await response.json();
        setClases(ordenarFechas(data));
      } catch (error) {
        alert(`Error al cargar la lista de clases, ${error}`);
      }
    };
    fetchClases();
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
        // Recargar la lista de clases después de crear una nueva
        const response = await fetch('/api/fechas/clases');
        const data = await response.json();
        setClases(ordenarFechas(data));
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

  // Mostrar solo los primeros 10 elementos si no está expandido
  const displayedClases = expanded ? clases : clases.slice(0, 10);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <section className="bg-gray-300 shadow-md rounded p-4">
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className="w-full text-center p-4 text-2xl font-bold mb-4">Registrar Clase</h2>
          <input
            name="instructor"
            placeholder="Instructor"
            value={formData.instructor}
            onChange={handleChange}
            required
            className="w-full p-4 border rounded mb-2 "
          />
          <input
            name="tipo"
            placeholder="Tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-2"
          />
          <input
            name="fecha"
            type="date"
            value={formData.fecha}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-2"
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
      </section>
{/* Lista de clases cargadas */}      
      <section className="bg-gray-300 shadow-md rounded p-4">
        <div className={styles.clasesList}>
          <h2 className="text-2xl font-bold mb-4">Clases Registradas</h2>
          <ul>
            {displayedClases.map((clase) => (
              <li key={clase} className="mb-2">
                <p><strong>Fecha:</strong> {formatearFecha(clase)}</p>
              </li>
            ))}
          </ul>
          {clases.length > 10 && (
            <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 text-blue-500 hover:text-blue-700"
            >
              {expanded ? 'Mostrar menos' : 'Mostrar más'}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}