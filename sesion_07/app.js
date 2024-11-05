require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("passport");
const { setupDatabase } = require("./database");
const jwtStrategy = require("./jtw-strategy");
const { checkAdminRole } = require("./middleware/authorization");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/products");

const app = express();
const port = process.env.PORT || 3000;

setupDatabase();
passport.use(jwtStrategy);

// Third-party middleware
app.use(express.json()); // Body (JSON)
app.use(express.urlencoded({ extended: true })); // Body (URL encoded)
app.use(helmet()); // Security
app.use(morgan("dev")); // Logger
app.use(passport.initialize()); // Authentication

// Routes
app.use("/auth", authRouter);
app.use(
  "/products",
  passport.authenticate("jwt", { session: false }),
  productRouter
);

app.get(
  "/datos-protegidos",
  passport.authenticate("jwt", { session: false }),
  checkAdminRole,
  (req, res) => {
    res.send("Acceso autorizado a datos sensibles");
  }
);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
