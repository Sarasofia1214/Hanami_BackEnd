import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Hanami API",
    description: "Documentación generada automáticamente"
  },
  servers: [
    { url: "http://localhost:3000" }
  ]
};

const outputFile = "./swagger/swaggerAuto.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
