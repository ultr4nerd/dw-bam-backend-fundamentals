const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const { setupDatabase } = require("./database");
const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");

dotenv.config();
setupDatabase();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Rutas
app.use("/users", usersRoutes);
app.use("/productos", productsRoutes);

// App listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
