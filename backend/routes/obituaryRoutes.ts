import express from "express";
import { createObituary, getObituaries, addCondolence } from "../controllers/obituaryController";

const router = express.Router();

// ✅ Récupérer tous les avis d’obsèques
router.get("/", getObituaries);

// ✅ Ajouter un avis d’obsèques
router.post("/", createObituary);

// ✅ Ajouter une condoléance
router.post("/condolences", addCondolence);

export default router;
