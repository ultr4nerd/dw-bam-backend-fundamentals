const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto" },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  fechaPedido: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pedido", pedidoSchema);
