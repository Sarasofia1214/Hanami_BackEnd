// src/swagger/swaggerDocs.js
export default {
  openapi: "3.0.0",
  info: {
    title: "Hanami Restaurant API",
    version: "1.0.0",
    description:
      "API del restaurante asiático Hamani. Incluye autenticación, platos, categorías, ingredientes y pedidos.",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Local Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/api/categories": {
      get: {
        summary: "Listar categorías",
        tags: ["Categories"],
        responses: {
          200: {
            description: "Lista de categorías",
          },
        },
      },
    },
  },
};
