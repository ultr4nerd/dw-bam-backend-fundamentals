const bcrypt = require("bcryptjs");
const crypto = require("node:crypto");

async function generacionContrasena() {
  // Generar contraseña y guardar base de datos
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("osito123", salt);
  console.log(hashedPassword);

  // Recibir la contraseña y compararla con el hash en la base de datos
  const isMatch = await bcrypt.compare("osito123", hashedPassword);
  console.log("isMatch", isMatch);
}

async function encriptadoDesenscriptado() {
  const secret = "miLlaveSecreta";
  const iv = crypto.randomBytes(16);
  console.log(secret);
  console.log(iv);

  // Crear el cifrador
  const cipher = crypto.createCipheriv("aes-256-cbc", secret, iv);

  // Cifrar los datos
  let encrypted = cipher.update("datos sensibles 123", "utf8", "hex");
  encrypted += cipher.final("hex");
  console.log("encrypted:", encrypted);

  // Crear el descifrador usando la misma clave y IV
  const decipher = crypto.createDecipheriv("aes-256-cbc", secret, iv);

  // Descifrar los datos
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  console.log("decrypted:", decrypted);
}
