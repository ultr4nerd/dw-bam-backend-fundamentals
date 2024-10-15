const mongoose = require("mongoose");
const Usuario = require("./models/Usuario");

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://bedu:ZbTYGEtVKHbunBWN@cluster0.svnbh.mongodb.net/myFirstDatabaseBedu"
    );
    console.log("Conectado a MongoDB Atlas");
  } catch (err) {
    console.error("Error al conectar a MongoDB Atlas", err);
  }

  // Crear
  const nuevoUsuario = await Usuario.create({
    nombre: "Mauricio Chávez",
    email: "m@bedu.org",
    edad: 18,
  });
  console.log("Nuevo usuario:", nuevoUsuario);

  // Obtener
  const usuario = await Usuario.findOne({ email: "m@bedu.org" });
  console.log("Usuario:", usuario);

  // Obtener por ID
  const usuarioConID = await Usuario.findOne({ _id: nuevoUsuario._id });
  console.log("Usuario con ID:", usuarioConID);

  // Actualizar
  const res1 = await Usuario.updateOne({ email: "m@bedu.org" }, { edad: 25 });
  console.log("Actualización:", res1);

  // Eliminar
  const res2 = await Usuario.deleteOne({ email: "m@bedu.org" });
  console.log("Eliminación:", res2);

  // Obtener TODOS
  const usuarios = await Usuario.find();
  console.log("Usuarios:", usuarios);
}

main();
