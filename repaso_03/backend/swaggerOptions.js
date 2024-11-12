import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bedu Shop Docs",
      version: "1.0.0",
      description: "API documentation for Bedu Shop",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

export default swaggerJsDoc(swaggerOptions);
