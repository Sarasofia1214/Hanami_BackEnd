import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Hanami API",
      version: "1.0.0",
      description: "Documentación de la API del backend Hanami (Dishes, Categories, Users, Ingredients, Orders)",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },

  // Archivos donde Swagger buscará anotaciones
  apis: [
    "./Routes/*.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
