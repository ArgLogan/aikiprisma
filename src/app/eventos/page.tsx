'use client';
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";


type EventoTipo = "CS" | "CD" | "SN" | "SI";

// const eventos: { id: number; categoria: EventoTipo; nombre: string; fecha: string }[] = [
//   { id: 1, categoria: "CS", nombre: "Shoshin Dojo 20 años", fecha: "2023-05-13" },
//   { id: 2, categoria: "CS", nombre: "Shin nen Geiko", fecha: "2023-01-01" },
//   { id: 3, categoria: "CD", nombre: "Febrero Danes", fecha: "2023-02-04" },
//   { id: 4, categoria: "CD", nombre: "Marzo Danes", fecha: "2023-03-04" },
//   { id: 5, categoria: "CD", nombre: "Abril Danes", fecha: "2023-04-01" },
//   { id: 6, categoria: "SN", nombre: "Seminario de verano", fecha: "2023-01-21" },
//   { id: 7, categoria: "SN", nombre: "Sem Leo Sakanashi", fecha: "2023-04-22" },
//   { id: 8, categoria: "CD", nombre: "Mayo Danes", fecha: "2023-05-06" },
//   { id: 9, categoria: "SI", nombre: "Seminario Internacional Japón", fecha: "2023-06-10" },
//   { id: 10, categoria: "SI", nombre: "Seminario Internacional España", fecha: "2023-07-15" },
// ];

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

  useEffect(() => {
      const fetchEventos = async () => {
        try {
          const response = await fetch('/api/evento/get')
          const data = await response.json()
          setEventos(data)
        } catch (error) {
          console.error('Error fetching alumnos:', error)
        }
      }
      fetchEventos()
  }, [])
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
    <div className="p-4 bg-gray-100 rounded-md">
      <h3 className="text-lg font-semibold mt-6 font-black">Agregar Evento</h3>
      <form onSubmit={handleAddEvento} className="space-y-2 mb-3">
        <input
          type="text"
          placeholder="Nombre del evento"
          className="border p-2 rounded w-full"
          value={nuevoEvento.nombre}
          onChange={(e) => setNuevoEvento({ ...nuevoEvento, nombre: e.target.value })}
          required
        />
        <input
          type="date"
          className="border p-2 rounded w-full"
          value={nuevoEvento.fecha}
          onChange={(e) => setNuevoEvento({ ...nuevoEvento, fecha: e.target.value })}
          required
        />
        <select
          className="border p-2 rounded w-full"
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
      <h2 className="text-lg font-semibold mb-2 mt-2 font-black">Eventos</h2>
      <div className="mb-4">
        <label className="block mb-1 font-black">Filtrar por tipo:</label>
        <select
          className="border p-2 rounded w-full font-black"
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
          <li key={evento.id} className="p-3 bg-white shadow rounded flex items-center">
            <span className="text-2xl mr-3">{iconos[evento.categoria]}</span>
            <div>
              <p className="font-semibold">{evento.nombre}</p>
              <p className="text-gray-500 text-sm">{evento.fecha}</p>
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
  );
}

