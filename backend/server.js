const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const obituaryRoutes = require("./routes/obituaryRoutes");

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
app.listen(PORT, () => console.log(`Serveur en cours sur le port ${PORT}`));
