
function  formatearFecha(fechaOriginal) {
    // Parsea la fecha original en un objeto Date
    const fecha = new Date(fechaOriginal + "T00:00:00");
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
    //console.log(`dias:${diasEspecificados}  FI: ${fechaInicial}  FF: ${fechaFinal}`)

    const fechaInicio = new Date(fechaInicial+ "T00:00:00");
    const fechaInicio2 = new Date(fechaInicial+ "T00:00:00");
    //const fechaFin = new Date(fechaFinal+ "T00:00:00");
    const fechaFin = fechaFinal;

    //console.log(`despues de date FI: ${fechaInicio}  FF: ${fechaFin} `)
    
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

  switch (evento.tipo) {
    case 'CD':
      fotoEvento = './imgs/CD.png';
      break;
    case 'SI':
      fotoEvento = './imgs/SI.png';
      break;
    case 'SN':
      fotoEvento = './imgs/SN.png';
      break;
    case 'CS':
      fotoEvento = './imgs/CS.png';
      break;
    default:
      // Valor por defecto si el tipo no coincide con ninguno de los casos anteriores
      fotoEvento = ''; // O cualquier otro valor predeterminado que desees
      break;
  }
  return fotoEvento
}

function actualizardatos(){
  
  const url = localStorage.getItem("url");
  fetch(url + '/alumno/ver')
  .then((response) => response.json())
  .then((datos) => {
    // Actualiza el estado de los alumnos con la lista actualizada
    const lista = datos
   return lista;
  })
  .catch((error) => {
   console.error('Error al obtener la lista actualizada de alumnos:', error);
 });

}
/*
const fechasOrdenadas = fechas
  .map((fecha) => new Date(fecha)) // Realiza una copia de las fechas para evitar modificar el array original
  .sort((a, b) => a - b); // Ordena las fechas de forma ascendente

console.log(fechasOrdenadas);
*/
  


  export {formatearFecha, verNroDeAlumno, calculaCantDias, fotoEventos ,actualizardatos}
