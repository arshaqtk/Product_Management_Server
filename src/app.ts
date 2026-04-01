import express, { type Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./modules/auth/auth.routes";

const app: Application = express();

// Global Middlewares
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Health Route
app.get("/", (req, res) => {
  res.send("API is running ");
});
app.use("/api/auth", authRoutes);
// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: "Route not found"
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;