type EventoTipo = "CS" | "CD" | "SN" | "SI";

export type Asistencia ={
    id:         number
    fecha:      string
    instructor: string
    tipo:       string
  }
  export type Evento = {
    id:         number
    nombre:     string
    categoria:  EventoTipo
    fecha:      string
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