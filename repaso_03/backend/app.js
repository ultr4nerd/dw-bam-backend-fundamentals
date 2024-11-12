import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swaggerOptions.js";
import jwtStrategy from "./auth/jtw-strategy.js";
import { setupDatabase } from "./database.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";

export function createApp() {
  const app = express();
  setupDatabase();
  passport.use(jwtStrategy);

  // Third-party middleware
  app.use(express.json()); // Body parsing JSON
  app.use(express.urlencoded({ extended: true })); // Body parsing URLEncoded
  app.use(cors())  // CORS
  app.use(helmet()); // Security
  app.use(morgan("tiny")); // Logger
  app.use(passport.initialize()); // Authentication

  // Routes
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use("/auth", authRoutes);
  app.use("/products", productRoutes);

  app.get("/", (req, res) => {
    res.send("Hola mundo");
  });

  return app;
}
