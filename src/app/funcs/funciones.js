
function  formatearFecha(fechaOriginal) {
  
  if (!fechaOriginal.includes("T")) {
    // Si no lo tiene, lo agrega
    fechaOriginal += "T00:00:00";
  }
  // Parsea la fecha original en un objeto Date
  const fecha = new Date(fechaOriginal);
  // Obtiene el día, mes y año
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses van de 0 a 11
  const año = fecha.getFullYear().toString();

  // Formatea la fecha en dd-mm-yyyy
  const fechaFormateada = `${dia}-${mes}-${año}`;

  return fechaFormateada;
}

function verNroDeAlumno(listaAlumnos){
    // Encuentra el objeto con el id más alto
    const alumnoConIdMasAlto = listaAlumnos.reduce((maxAlumno, alumno) => {
      return alumno.id > maxAlumno.id ? alumno : maxAlumno;
    }, listaAlumnos[0]);
    
    // Obtén el valor del número del alumno con el id más alto
    const nroDelAlumnoConIdMasAlto = alumnoConIdMasAlto.nroDeAlumno;
    
    console.log("Número del alumno con el ID más alto:", nroDelAlumnoConIdMasAlto);
    
    return nroDelAlumnoConIdMasAlto
  }

  function calculaCantDias(diasEspecificados, fechaInicial, fechaFinal) {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    const fechaInicio = new Date(fechaInicial+ "T00:00:00");
    const fechaInicio2 = new Date(fechaInicial+ "T00:00:00");

    const fechaFin = fechaFinal;

    
    let contador = 0;
  
    while (fechaInicio <= fechaFin) {
      const diaSemana = diasSemana[fechaInicio.getDay()];
  
      if (diasEspecificados.includes(diaSemana)) {
        contador++;
      }
  
      fechaInicio.setDate(fechaInicio.getDate() + 1);
    }

    const mesesDiferencia = (fechaFin.getFullYear() - fechaInicio2.getFullYear()) * 12 + (fechaFin.getMonth() - fechaInicio2.getMonth());
    //console.log(`fechafinY:${fechaFin.getFullYear()}  FIY: ${fechaInicio.getFullYear()}  FFM: ${fechaFin.getMonth()} FFM: ${fechaInicio.getMonth()}`)

    return { cantidad: contador, meses: mesesDiferencia };
    //return contador;
  }


// Devuelve la foto asociada al tipo de evento
  function fotoEventos(evento){
    let fotoEvento = ""
  switch (evento.categoria) {
    case 'CD':
      fotoEvento = '/uploads/CD.png';
      break;
    case 'SI':
      fotoEvento = '/uploads/SI.png';
      break;
    case 'SN':
      fotoEvento = '/uploads/SN.png';
      break;
    case 'CS':
      fotoEvento = '/uploads/CS.png';
      break;
    default:
      // Valor por defecto si el tipo no coincide con ninguno de los casos anteriores
      fotoEvento = ''; // O cualquier otro valor predeterminado que desees
      break;
  }
  return fotoEvento
}

function obtenerColorIcono(fechaNacimiento){
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento + "T00:00:00");
  const diferenciaDias = hoy.getDate() - fechaNac.getDate();

  if(hoy.getMonth() === fechaNac.getMonth()){
    if (diferenciaDias === 0) {
      return 'verde'; // Día exacto
    } else if (diferenciaDias > 0 && diferenciaDias <= 7) {
      return 'amarillo'; // Días anteriores
    } else if (diferenciaDias < 0 && diferenciaDias >= -7) {
      return 'rojo'; // Días posteriores 
    } else {
      return null; // Fuera del rango
    }
  }else{
    return null; // Fuera del rango
  }
};
  


  export {formatearFecha, verNroDeAlumno, calculaCantDias, fotoEventos ,obtenerColorIcono}
