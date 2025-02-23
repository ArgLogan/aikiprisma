'use client';
import { useState, useEffect } from 'react';
import styles from '../../ui/ficha.module.css';
import { formatearFecha } from '../../funcs/funciones'; 

interface Evento {
  id: number;
  nombre: string;
  fecha: string;
  categoria: string;
}

export default function EventosList() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [selectedEventos, setSelectedEventos] = useState<number[]>([]); // Almacena los IDs de los eventos seleccionados

  // Obtener la lista de eventos
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('/api/evento/get');
        const data = await response.json();
        setEventos(data);
      } catch (error) {
        alert(`Error al cargar la lista de eventos: ${error}`);
      }
    };
    fetchEventos();
  }, []);

  // Manejar el cambio en los checkboxes
  const handleCheckboxChange = (id: number) => {
    setSelectedEventos((prevSelected) => {
      if (prevSelected.includes(id)) {
        // Si ya está seleccionado, lo quitamos
        return prevSelected.filter((eventoId) => eventoId !== id);
      } else {
        // Si no está seleccionado, lo agregamos
        return [...prevSelected, id];
      }
    });
  };
  console.log(eventos);
  return (
    <div className={styles.container}>
      <h2 className="text-2xl font-bold mb-4">Lista de Eventos</h2>
      <div className="max-h-40 overflow-y-auto space-y-2">
        {eventos.map((evento) => (
          <label key={evento.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedEventos.includes(evento.id)}
              onChange={() => handleCheckboxChange(evento.id)}
              className="w-4 h-4"
            />
            <span>
            ({evento.categoria}) - {formatearFecha(evento.fecha)} - {evento.nombre}  
            </span>
          </label>
        ))}
      </div>

      {/* Mostrar los eventos seleccionados (opcional) */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Eventos Seleccionados</h3>
        <ul>
          {selectedEventos.map((id) => {
            const evento = eventos.find((e) => e.id === id);
            return (
              <li key={id} className="mb-2">
                {evento?.nombre} - {formatearFecha(evento?.fecha)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}