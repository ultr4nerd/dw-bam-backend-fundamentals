const mongoose = require("mongoose");

async function setupDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error("No se pudo conectar a MongoDB", err);
    process.exit(1);
  }
}

module.exports = {
  setupDatabase,
};
