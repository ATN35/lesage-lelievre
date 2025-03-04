import express from "express";
import { getObituaries } from "../controllers/obituaryController";

const router = express.Router();

router.get("/", getObituaries);

export default router;
