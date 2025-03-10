import express, { Response } from "express";
import { register, login, createAdmin } from "../controllers/authController"; // ✅ Ajoute createAdmin
import { authenticate, AuthenticatedRequest } from "../middleware/authMiddleware";
import { prisma } from "../config/database";

const router = express.Router();

// ✅ Route d'inscription
router.post("/register", register);

// ✅ Route de connexion
router.post("/login", login);

// ✅ Route pour récupérer l'utilisateur connecté
router.get("/me", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Utilisateur non authentifié" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ✅ Route pour créer un administrateur
router.post("/create-admin", createAdmin);

export default router;
