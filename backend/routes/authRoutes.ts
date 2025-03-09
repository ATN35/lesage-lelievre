import express, { Request, Response } from "express";
import { register, login } from "../controllers/authController";
import bcrypt from "bcrypt";
import { prisma } from "../config/database";

const router = express.Router();

// ✅ Route pour l'inscription
router.post("/register", async (req: Request, res: Response) => register(req, res));

// ✅ Route pour la connexion
router.post("/login", async (req: Request, res: Response) => login(req, res));

// ✅ Route pour créer un admin (protégée par une clé secrète)
router.post("/create-admin", async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, secretKey } = req.body;

  if (!secretKey || secretKey !== process.env.ADMIN_SECRET) {
    res.status(403).json({ error: "Accès refusé." });
    return;
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "Cet email est déjà utilisé." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: "admin" },
    });

    res.status(201).json({ message: "Admin créé avec succès", admin: newAdmin });
  } catch (error) {
    console.error("Erreur lors de la création de l'admin:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

export default router;
