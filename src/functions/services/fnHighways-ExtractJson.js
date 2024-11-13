import XLSX from "xlsx";

const ExtractJson = async (fileB64) => {
  try {
    // Verificar si fileB64 es una cadena
    if (typeof fileB64 !== "string") {
      throw new Error("El archivo Base64 no es una cadena válida.");
    }
    // Decodificar el Base64
    const buffer = Buffer.from(fileB64, "base64");
    // Leer el archivo Excel desde el buffer
    const workbook = XLSX.read(buffer, { type: "buffer" });
    // Obtener el nombre de la primera hoja
    const firstSheetName = workbook.SheetNames[0];
    // Obtener la hoja
    const worksheet = workbook.Sheets[firstSheetName];
    // Convertir la hoja a JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Mapear los datos a un arreglo de objetos con campos nombrados
    const headers = jsonData[0];
    const formattedData = jsonData.slice(1).map((row) => {
      const rowObject = {};
      headers.forEach((header, index) => {
        rowObject[header] = row[index];
      });
      return rowObject;
    });

    return formattedData;
  } catch (error) {
    console.error("Error al procesar el archivo Excel:", error);
    throw new Error("Error al procesar el archivo Excel");
  }
};

const ExtractJsons = async (json) => {
  try {
    const fileB64 = json.B64File;
    const extractJsonReturnData = await ExtractJson(fileB64);
    return extractJsonReturnData;
  } catch (error) {
    console.error("Error en ExtractJsons:", error);
    throw new Error("Error en el servicio ExtractJsons");
  }
};

export default ExtractJsons;
