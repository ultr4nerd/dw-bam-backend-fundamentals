const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    categoria: {
      type: String,
      required: true,
      enum: ["Electrónica", "Hogar", "Moda"],
    },
    fechaCreacion: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Producto", productoSchema);
