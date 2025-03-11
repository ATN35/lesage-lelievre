import express from "express";
import { createObituary, getObituaries, addCondolence } from "../controllers/obituaryController";

const router = express.Router();

router.get("/", getObituaries);

router.post("/", createObituary);

router.post("/condolences", addCondolence);

export default router;
