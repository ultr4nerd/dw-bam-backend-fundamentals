const express = require("express");

const app = express();

function loggerMiddleware(req, res, next) {
  console.log(`Nueva solicitud: ${req.method} ${req.url}`);
  next();
}

function aboutMiddleware(req, res, next) {
  console.log("Middleware de about");
  next();
}

// Middleware global
app.use(loggerMiddleware);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Bienvenido a mi servidor");
});

// Middleware específico de ruta
app.get("/about", aboutMiddleware, (req, res) => {
  res.send("Esta es la página de acerca de");
});

app.get("/contacto", (req, res) => {
  res.send("Esta es la página de contacto");
});

// app.get("/usuario/:nombre", (req, res) => {
//   const nombre = req.params.nombre;
//   res.send(`Hola, ${nombre}`);
// });

app.get("/usuario/:id", (req, res) => {
  res.send(`Bienvenido, usuario con ID: ${req.params.id}`);
});

app.get("/buscar", (req, res) => {
  const query = req.query.q;

  if (!query) {
    res.send("Buscar en Bedu Search");
  } else {
    res.send(`Resultados de búsqueda para: ${query}`);
  }
});

app.get("/productos", (req, res) => {
  res.send(`Mostrando productos de la categoría: ${req.query.categoria}`);
});

app.post("/productos", (req, res) => {
  const producto = req.body;

  console.log("PRODUCTO", producto);

  res.send(`He creado el producto con nombre ${producto.nombre}`);
});

app.listen(3000, () => {
  console.log("Escuchando peticiones en http://localhost:3000");
});
