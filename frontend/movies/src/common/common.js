// Función para convertir una fecha en formato Date a una cadena en formato "AAAA-MM-DD"
export const formatDateToString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  
  // Función para convertir una cadena en formato "AAAA-MM-DD" a un objeto Date
 export  const parseStringToDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return new Date(Number(year), Number(month) - 1, Number(day));
  };





