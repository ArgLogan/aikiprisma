'use client';
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {formatearFecha} from '../funcs/funciones'


type EventoTipo = "CS" | "CD" | "SN" | "SI";

const iconos = {
  CS: "🔵", // Clase especial
  CD: "🟣", // Clase de Danes
  SN: "🟢", // Seminario Nacional
  SI: "🔴", // Seminario Internacional
};
interface Eventos {
    id: number
    fecha: string
    nombre: string
    categoria: EventoTipo
}

export default function ListaEventos() {
  const [filtro, setFiltro] = useState("");
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [nuevoEvento, setNuevoEvento] = useState({ nombre: "", fecha: "", categoria: "" });
  const [eventos, setEventos] = useState<Eventos[]>([])
  const router = useRouter();

  const actualYear = new Date().getFullYear()
  
  useEffect(() => {
      const fetchEventos = async () => {
        try {
          const response = await fetch(`/api/evento/get?year=${actualYear}`)
          const data = await response.json()
          setEventos(data)
        } catch (error) {
          console.error('Error fetching alumnos:', error)
        }
      }
      fetchEventos()
  }, [actualYear])
  
  const eventosFiltrados = eventos
    .filter(e => (filtro ? e.categoria === filtro : true))
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  const eventosMostrados = mostrarTodos ? eventosFiltrados : eventosFiltrados.slice(0, 10);

  const handleAddEvento = async (e:FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/evento/crear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoEvento),
    });
    if (res.ok) {
      setNuevoEvento({ nombre: "", fecha: "", categoria: "" });
      router.refresh();
    }
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <h1 className="col-span-1 md:col-span-2 text-center font-bold">Eventos</h1>
      <div className="bg-gray-200 p-4">
        <h3 className="text-lg font-semibold mt-6 text-black">Agregar Evento</h3>
        <form onSubmit={handleAddEvento} className="space-y-2 mb-3">
          <input
            type="text"
            placeholder="Nombre del evento"
            className="border p-2 rounded w-full text-black"
            value={nuevoEvento.nombre}
            onChange={(e) => setNuevoEvento({ ...nuevoEvento, nombre: e.target.value })}
            required
            />
          <input
            type="date"
            className="border p-2 rounded w-full text-black"
            value={nuevoEvento.fecha}
            onChange={(e) => setNuevoEvento({ ...nuevoEvento, fecha: e.target.value })}
            required
            />
          <select
            className="border p-2 rounded w-full text-black"
            value={nuevoEvento.categoria}
            onChange={(e) => setNuevoEvento({ ...nuevoEvento, categoria: e.target.value })}
            required
            >
            <option value="">Seleccione tipo</option>
            <option value="CS">Clase Especial</option>
            <option value="CD">Clase de Danes</option>
            <option value="SN">Seminario Nacional</option>
            <option value="SI">Seminario Internacional</option>
          </select>
          <button type="submit" className="p-2 bg-green-500 text-white rounded w-full">Agregar Evento</button>
        </form>
      </div>
      <div className="bg-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-2 mt-2 text-black">Eventos</h2>
        <div className="mb-4">
          <label className="block mb-1 font-black">Filtrar por tipo:</label>
          <select
            className="border p-2 rounded w-full text-black"
            onChange={e => setFiltro(e.target.value)}
            value={filtro}
            >
            <option value="">Todos</option>
            <option value="CS">Clase Especial</option>
            <option value="CD">Clase de Danes</option>
            <option value="SN">Seminario Nacional</option>
            <option value="SI">Seminario Internacional</option>
          </select>
        </div>
        <ul className="space-y-2">
          {eventosMostrados.map(evento => (
            <li key={evento.id} className="p-3 bg-white shadow rounded flex items-center text-black">
              <span className="text-2xl mr-3">{iconos[evento.categoria]}</span>
              <div>
                <p className="font-semibold text-black">{evento.nombre}</p>
                <p className="text-gray-500 text-sm-blak">{formatearFecha( evento.fecha)}</p>
              </div>
            </li>
          ))}
        </ul>
        {eventosFiltrados.length > 10 && (
          <button
          onClick={() => setMostrarTodos(!mostrarTodos)}
          className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
          >
            {mostrarTodos ? "Mostrar menos" : "Mostrar más"}
          </button>
        )}
      </div>
    </div>
  );
}

