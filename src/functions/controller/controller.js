import fnBiobio from "../services/fnbiobio.js";

const Controller = async (req) => {
  try {
    const json = req;
    const typeEvent = json["typeEvent"];
    const fileB64 = json["fileB64"];
    switch (typeEvent) {
      case "biobio":
        const biobio = await fnBiobio(fileB64);
        return biobio;
     
    }
  } catch (error) {
    console.error(error);
  }
};
export default Controller;
