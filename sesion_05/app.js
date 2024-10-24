const express = require("express");
const dotenv = require("dotenv");
const { setupDatabase } = require("./database");
const usuariosRouter = require("./routes/usuarios");
const productosRouter = require("./routes/productos");

dotenv.config();
setupDatabase();

const app = express();
const port = process.env.PORT || 3000;

// Middleware regulares
app.use(express.json());  // MIDDLEWARE NECESARIO PARA RECIBIR JSON EN EL CUERPO (req.body)
app.use(express.urlencoded({ extended: true }));  // MIDDLEWARE NECESARIO PARA RECIBIR URL encoded EN EL CUERPO (req.body)

app.use((req, res, next) => {
  console.log(`Se hizo una petición ${req.method} a ${req.url}`);
  next();
});

// Routers
app.use("/usuarios", usuariosRouter);
app.use("/productos", productosRouter);

// Middleware de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal");
});

app.listen(port, () => {
  console.log(`Escuchando en http://localhost:${port}`);
});
