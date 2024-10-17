const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    edad: { type: Number },
    fechaRegistro: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", usuarioSchema);
