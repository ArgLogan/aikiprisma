'use client';
import { useState, useEffect } from 'react';
//import { useRouter } from 'next/navigation';
import type { Alumno } from '../funcs/models';

export default function GraduacionList() {

    //const router = useRouter();
    const [formData, setFormData] = useState({
        fecha: '',
        instructor: '',
        tipo: '',
        graduaciones: [] as { id: number }[],
    });
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleCheckboxChange = (id: number) => {
        setFormData((prevData) => {
            const isPresent = prevData.graduaciones.find((alumno) => alumno.id === id);
            const updatedPresentes = isPresent
            ? prevData.graduaciones.filter((alumno) => alumno.id !== id)
            : [...prevData.graduaciones, { id }];
            return { ...prevData, graduaciones: updatedPresentes };
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
                graduaciones: [],
            });
            } else {
            alert('Error al crear la clase');
            }
        } catch (error) {
            alert(`Hubo un problema con la solicitud: ${error}`);
        }
    };

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <section className="bg-gray-300 shadow-md rounded p-4">
                <form onSubmit={handleSubmit} className='{styles.form}'>
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
                    <div className="flex space-x-4">
                        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Registrar Clase
                        </button>
                        
                    </div>
                </form>
            </section>
            <section className="bg-gray-300 shadow-md rounded p-4 h-full">
                <h3 className="text-lg font-semibold mb-2">Seleccionar Alumnos Presentes</h3>
                <div className="max-h-96 overflow-y-auto space-y-2 p-4">
                    {alumnos.map((alumno) => (
                        <label key={alumno.id} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={formData.graduaciones.some((a) => a.id === alumno.id)}
                            onChange={() => handleCheckboxChange(alumno.id)}
                            className="w-4 h-4"
                        />
                        <span>{`${alumno.nombre} ${alumno.apellido}`}</span>
                        </label>
                    ))}
                </div>
            </section>
            
        </div>
    )
    
}