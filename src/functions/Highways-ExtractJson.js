import Controller from "./controller/controller.js";
import { app } from "@azure/functions";
app.setup({
  enableHttpStream: true,
});
app.http("fnHighways-ExtractJson", {
  methods: ["POST"],
  authLevel: "anonymous",
  headers: {
    'Content-Type': 'application/json'
  },
  handler: async (request, context) => {
    try {
      const json = request.query.get("json") || (await request.json());
      const respuesta = await Controller(json);
      JSON.stringify(respuesta)
      if (!respuesta) {
        return { status: 400, jsonBody: { error: "Error en el body" } };
      } else {
        return {jsonBody : respuesta};
      }
    } catch (error) {
      return { status: 500, jsonBody: { error: "Error interno del servidor" } };
    }
  }
});
