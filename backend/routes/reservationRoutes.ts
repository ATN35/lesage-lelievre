import express from "express";
import { createReservation } from "../controllers/reservationController";

const router = express.Router();

router.post("/", createReservation);

export default router;
