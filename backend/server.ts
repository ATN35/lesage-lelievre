import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectMySQL } from "./config/database";
import { connectMongoDB } from "./models/cookieModel";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import obituaryRoutes from "./routes/obituaryRoutes";
import messageRoutes from "./routes/messageRoutes";
import adminRoutes from "./routes/adminRoutes";
import cookieRoutes from "./routes/cookieRoutes";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://lesage-lelievre.vercel.app",
      "https://lesage-lelievre-production.up.railway.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/obituaries", obituaryRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cookies", cookieRoutes);

Promise.all([connectMySQL(), connectMongoDB()])
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Serveur lancé sur le port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ Erreur lors du démarrage du serveur :", error);
    process.exit(1);
  });
