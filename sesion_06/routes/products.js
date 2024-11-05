const express = require("express");
const Producto = require("../models/Producto");

const router = express.Router();

// Rutas
router.post("/", async (req, res) => {
  const { nombre, precio, categoria, enStock, fechaCreacion } = req.body;

  const existingProduct = await Producto.findOne({ nombre });
  if (existingProduct) {
    return res
      .status(400)
      .json({ success: false, error: "Product already exists." });
  }

  const product = new Producto({
    nombre,
    precio,
    categoria,
  });

  // Solo para booleanos
  if (enStock !== undefined) {
    product.enStock = enStock;
  }

  if (fechaCreacion) {
    product.fechaCreacion = fechaCreacion;
  }

  try {
    await product.save();
  } catch (err) {
    const errors = [];

    if (!err.errors) {
      errors.push({
        message: "Ha ocurrido un error inesperado",
        path: null,
        value: null,
      });
    }

    // Iterar sobre las propiedades de un objeto
    for (const prop in err?.errors) {
      const properties = err.errors[prop].properties;
      errors.push({
        message: properties.message,
        path: properties.path,
        value: properties.value,
      });
    }

    return res.status(400).json({
      success: false,
      errors,
    });
  }

  return res
    .status(201)
    .json({ success: true, message: "Product created successfully" });
});

module.exports = router;
