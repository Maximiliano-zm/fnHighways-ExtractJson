import ExtractJson from "../services/fnExtract-json.js";

const excelSerialToDateTime = (serial) => {
  const excelBaseDate = new Date(1899, 11, 30);
  const date = new Date(excelBaseDate.getTime() + serial * 86400000);
  
  const fecha = date.toLocaleDateString("es-CL"); // Solo la fecha
  const hora = date.toLocaleTimeString("es-CL"); // Solo la hora

  return { fecha, hora };
};

const Biobio = async (jsonFormater) => {
  // Dividir "Fecha Tránsito" en "Fecha" y "Hora" en cada entrada
  const formattedData = jsonFormater.map(entry => {
    const { fecha, hora } = excelSerialToDateTime(entry["Fecha Tránsito"]);
    
    return {
      ...entry,
      "Fecha": fecha,
      "Hora": hora,
      "Fecha Tránsito": undefined // Eliminar "Fecha Tránsito" si ya no es necesario
    };
  });

  console.log(formattedData);
  return formattedData;
};

const fnBiobio = async (fileB64) => {
  try {
    const jsonFormater = await ExtractJson(fileB64);

    const ReturnData = await Biobio(jsonFormater);
    return ReturnData;
  } catch (error) {
    console.error("Error en ExtractJsons:", error);
    throw new Error("Error en el servicio ExtractJsons");
  }
};

export default fnBiobio;
