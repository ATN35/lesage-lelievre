import express, { Request, Response } from "express";
import { register, login } from "../controllers/authController";

const router = express.Router();

// ✅ Corriger la déclaration des routes avec `RequestHandler`
router.post("/register", async (req: Request, res: Response) => register(req, res));
router.post("/login", async (req: Request, res: Response) => login(req, res));

export default router;
