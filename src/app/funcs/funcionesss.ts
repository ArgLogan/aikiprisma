
function formatearFecha(fechaOriginal: string): string {
    // Validate input format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaOriginal)) {
        throw new Error('La fecha debe estar en formato yyyy-mm-dd');
    }

    // Parse the original date into a Date object
    const fecha: Date = new Date(`${fechaOriginal}T00:00:00`);

    // Validate if the date is valid
    if (isNaN(fecha.getTime())) {
        throw new Error('Fecha inválida');
    }

    // Get day, month, and year
    const dia: string = fecha.getDate().toString().padStart(2, '0');
    const mes: string = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because months go from 0 to 11
    const año: string = fecha.getFullYear().toString();

    // Format the date as dd-mm-yyyy
    const fechaFormateada: string = `${dia}-${mes}-${año}`;

    return fechaFormateada;
}


export { formatearFecha };