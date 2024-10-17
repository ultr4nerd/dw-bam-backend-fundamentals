const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Producto = require("./models/Producto");
const Usuario = require("./models/Usuario");
const Pedido = require("./models/Pedido");

async function removeEverythingFromCollections() {
  await Producto.deleteMany();
  await Usuario.deleteMany();
  await Pedido.deleteMany();
}

async function crearProductoUsuario() {
  const producto = await Producto.create({
    nombre: "Laptop",
    precio: 1200,
    stock: 5,
    categoria: "Electrónica",
  });

  const usuario = await Usuario.create({
    nombre: "Mauricio",
    email: "m@gmail.com",
    edad: 25,
  });

  return { producto, usuario };
}

async function crudProducto(justCreate = false) {
  // Create

  const producto1 = new Producto({
    nombre: "Laptop",
    precio: 1200,
    stock: 5,
    categoria: "Electrónica",
  });

  await producto1.save();

  const producto2 = await Producto.create({
    nombre: "Tablet",
    precio: 300,
    stock: 10,
    categoria: "Electrónica",
  });

  if (justCreate) {
    return;
  }

  // Read
  const productos = await Producto.find({ precio: { $gt: 200 } });
  console.log("PRODUCTOS OBTENIDOS:", productos);

  const productoFindOne = await Producto.findOne({ nombre: "Laptop" });
  console.log("PRODUCTO FIND ONE:", productoFindOne);

  const productoFindByID = await Producto.findById(producto2._id);
  console.log("PRODUCTO FIND BY ID:", productoFindByID);

  // Update
  await Producto.updateOne({ nombre: "Tablet" }, { precio: 500 });

  const resultado = await Producto.updateMany(
    { precio: { $gt: 250 } },
    { precio: 200 }
  );
  console.log(resultado);

  await Producto.findByIdAndUpdate(producto2._id, { stock: 20 });

  // Delete
  await Producto.deleteOne({ nombre: "Tablet" });
  await Producto.findByIdAndDelete(producto1._id);
  await Producto.deleteMany({ precio: { $lt: 2000 } });
}

async function reto1() {
  const usuario = new Usuario({
    nombre: "Mauricio",
    email: "m@gmail.com",
    edad: 25,
  });

  await usuario.save();
}

async function crearPedidos() {
  const { producto, usuario } = await crearProductoUsuario();

  const resultado = await Pedido.create({
    producto: producto,
    usuario: usuario,
  });

  const pedido = await Pedido.findById(resultado._id)
    .populate("producto")
    .populate("usuario");
  console.log(pedido);
}

async function reto3() {
  const { producto, usuario } = await crearProductoUsuario();

  const resultado = await Pedido.create({
    producto: producto,
    usuario: usuario,
  });

  const pedido = await Pedido.findOne({ _id: resultado._id })
    .populate("producto")
    .populate("usuario");
  console.log(pedido);
}

async function aggregations() {
  const data = [
    { nombre: "Laptop", precio: 1200, stock: 10, categoria: "Electrónica" },
    { nombre: "Smartphone", precio: 600, stock: 5, categoria: "Electrónica" },
    { nombre: "Tablet", precio: 700, stock: 15, categoria: "Electrónica" },
    { nombre: "Consola", precio: 500, stock: 10, categoria: "Electrónica" },
    { nombre: "Teclado", precio: 100, stock: 1, categoria: "Electrónica" },
    { nombre: "Maceta", precio: 20, stock: 10, categoria: "Hogar" },
    { nombre: "Tapete", precio: 100, stock: 5, categoria: "Hogar" },
    { nombre: "Playera", precio: 5, stock: 2, categoria: "Moda" },
    { nombre: "Pantalón", precio: 10, stock: 4, categoria: "Moda" },
    { nombre: "Chamarra", precio: 15, stock: 6, categoria: "Moda" },
  ];

  await Producto.insertMany(data, { timestamps: true });

  // Contar stock total de productos con precio mayor a 200

  const resultado1 = await Producto.aggregate([
    { $match: { precio: { $gt: 200 } } },
    { $group: { _id: null, stockTotal: { $sum: "$stock" } } },
  ]);

  console.log(
    "Stock total de productos con precio mayor a 200:",
    resultado1[0].stockTotal
  );

  // Ver precio promedio por categoría de forma descendente

  const resultado2 = await Producto.aggregate([
    { $group: { _id: "$categoria", precioPromedio: { $avg: "$precio" } } },
    { $sort: { precioPromedio: -1 } },
  ]);

  const resultado3 = resultado2.map((item) => ({
    [item._id]: item.precioPromedio,
  }));

  console.log(
    "Precio promedio por categoría de forma descendente:",
    resultado3
  );
}

async function main() {
  try {
    // Conexión
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Conectado a MongoDB Atlas");

    // Programa
    await removeEverythingFromCollections();
    await aggregations();

    // Desconexión
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error al conectar a MongoDB Atlas", err);
  }
}

dotenv.config();
main();
