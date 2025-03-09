type EventoTipo = "CS" | "CD" | "SN" | "SI";

export type Asistencia ={
    id:         number
    fecha:      string
    instructor: string
    tipo:       string
    presentes:  Alumno[]
  }
  export type Evento = {
    id:         number
    nombre:     string
    categoria:  EventoTipo
    fecha:      string
    presentes:  Alumno[]
  }
  export type Graduacion = {
    id:     number
    nivel:  string
    tipo:   string
    fecha:  string
    dojo:   string
    alumno: Alumno[]
  }
  
  export type Alumno ={
    id: number
    nombre: string
    apellido: string
    fechaNacimiento: string
    fechaInicio: string
    graduacionActual: string
    fechaGradActual: string
    email: string
    passwordHash: string
    foto: string
    asistencia: Asistencia[]
    Eventos: Evento[]
    graduaciones: Graduacion[]
  }

  export type Feriado = {
    id: Number,
    fecha: Date,
    descripcion: string
  }
  