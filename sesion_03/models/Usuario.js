const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  edad: Number,
  fechaRegistro: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
