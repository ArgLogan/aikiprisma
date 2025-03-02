'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Alumno } from '../funcs/models';

export default function GraduacionList() {

    const storedAlumno = sessionStorage.getItem('alumno');
    const alumno: Alumno | null = storedAlumno ? JSON.parse(storedAlumno) : null;
    const idAlumno = alumno ? alumno.id : null;
    
    const router = useRouter();
    const [formData, setFormData] = useState({
        nivel:'',
        tipo:'',
        fecha: '',
        dojo: '',
        alumno: [{id: idAlumno}],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/graduacion/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
            });

            if (response.ok) {
            alert('Graduación creada con éxito');
            setFormData({
                nivel: '',
                tipo: '',
                fecha: '',
                dojo: '',
                alumno: [],
            });
            router.push('/ficha');
            } else {
            alert('Error al crear la Graduación');
            }
        } catch (error) {
            alert(`Hubo un problema con la solicitud: ${error}`);
        }
    };

    const graduaciones = [
        'mu Kyu','10mo Kyu','9no Kyu','8vo Kyu','7mo kyu','6to Kyu','5to kyu', '4to kyu', '3er kyu', '2do kyu', '1er kyu',
        '1er Dan', '2do Dan', '3er Dan', '4to Dan', '5to Dan', '6to Dan', '7mo Dan'
    ];

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <section className="bg-gray-300 shadow-md rounded p-4 col-span-1 md:col-span-2">
                <form onSubmit={handleSubmit} className=''>
                    <h2 className="w-full text-center p-4 text-2xl font-bold mb-4">Registrar Graduación</h2>
                    <input
                        name="dojo"
                        placeholder="Dojo"
                        value={formData.dojo}
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
                    <select
                        name="nivel"
                        value={formData.nivel}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mb-2"
                    >
                        <option value="" disabled>Selecciona una graduación</option>
                        {graduaciones.map((grado) => (
                            <option key={grado} value={grado}>
                            {grado}
                        </option>
                        ))}
                    </select>
                    <div className="flex space-x-4">
                        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Registrar Graduación
                        </button>
                        
                    </div>
                </form>
            </section>
        </div>
    )
    
}