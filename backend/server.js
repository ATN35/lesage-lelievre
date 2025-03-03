import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import obituaryRoutes from "./routes/obituaryRoutes.js";

dotenv.config();
const app = express();

// Middlewares globaux
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/obituaries", obituaryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur en cours sur le port ${PORT}`));
