const mongoose = require("mongoose");
const Pedido = require("./models/Pedido");

// Importar variables de entorno
require("dotenv").config();

// Importar modelos que no se están usando EXPLÍCITAMENTE
require("./models/Producto");
require("./models/Usuario");

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Conectado a MongoDB Atlas");
  } catch (err) {
    console.error("Error al conectar a MongoDB Atlas", err);
  }

  const pedido = await Pedido.findOne()
    .populate("producto")
    .populate("usuario");

  console.log("Pedido:", pedido);
}

main();
