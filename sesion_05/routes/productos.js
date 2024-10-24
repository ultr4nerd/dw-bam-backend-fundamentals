const express = require("express");
const Producto = require("../models/Producto");

const router = express.Router();

/*
BUENA PRÁCTICA PARA REST APIs

Para saber qué entidad, nombre del recurso en la URL el plural
e.g.: /productos

  Para manipular VARIAS cosas, ocupamos el endpoint con slash (/)
  eg.: /productos (OBTENER LISTA DE PRODUCTOS y CREAR NUEVO PRODUCTO) (GET y POST)

  Para manipular UNA cosa, ocupamos el endpoint con el identificador (/:id)
  e.g.: /productos/1 (OBTENER EL DETALLE DE UN SOLO PRODUCTO, ACTUALIZAR y ELIMINAR) (GET, PUT/PATCH, DELETE)

Para saber lo que quiero hacer, métodos
e.g.: Para crear productos, usamos el método POST

Para comunicar el estado del resultado, usamos status
e.g.: Para comunicar que se creó de forma correcta, usamos 201 CREATED
      Para comunicar que los datos que envió el usuario están mal, usaremos 400 BAD REQUEST

MALA PRÁCTICA

Nombrar los endpoints con la acción que hacen (para eso están los métodos)

e.g.: /crearProducto
      /eliminarProducto
*/

// CRUD (Create, Read, Update, Delete)

// 1. CREATE

router.post("/", async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (err) {
    console.error(err.stack);
    res.status(400).json({
      success: false,
      error: "Datos incorrectos",
    });
  }
});

// 2. READ

// Lista de productos
router.get("/", async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

// Detalle de producto
router.get("/:id", async (req, res) => {
  const producto = await Producto.findById(req.params.id);

  if (!producto) {
    return res
      .status(404)
      .json({ success: false, message: "Producto no encontrado." });
  }

  return res.json(producto);
});

// 3. Update

// Actualizar producto
router.put("/:id", async (req, res) => {
  const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!producto) {
    return res
      .status(404)
      .json({ success: false, message: "Producto no encontrado." });
  }

  return res.json(producto);
});

// 4. Delete

// Eliminar un producto
router.delete("/:id", async (req, res) => {
  const producto = await Producto.findByIdAndDelete(req.params.id);

  if (!producto) {
    return res
      .status(404)
      .json({ success: false, message: "Producto no encontrado." });
  }

  return res.sendStatus(204);
});

module.exports = router;
