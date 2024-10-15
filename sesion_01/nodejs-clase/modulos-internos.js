const os = require("os");
const fs = require("fs");

console.log("Sistema operativo:", os.platform());
console.log("Memoria libre:", os.freemem());
console.log("Arquitectura:", os.arch());

fs.readFile("index.js", "utf8", (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }
  console.log("Contenido del archivo:\n", data);
});
