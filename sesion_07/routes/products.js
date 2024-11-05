const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Rutas
router.post("/", async (req, res) => {
  const { name, price, inStock } = req.body;

  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    return res
      .status(400)
      .json({ success: false, error: "Product already exists." });
  }

  const product = new Product({
    name,
    price,
  });

  // Solo para booleanos
  if (inStock !== undefined) {
    product.inStock = inStock;
  }

  await product.save();

  return res
    .status(201)
    .json({ success: true, message: "Product created successfully" });
});

module.exports = router;
