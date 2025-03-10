import express, { Request, Response, NextFunction } from "express";
import { register, login } from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";
import { prisma } from "../config/database";

const router = express.Router();

// ✅ Étendre l'interface Request pour inclure `user`
interface AuthenticatedRequest extends Request {
  user?: { id: string; name: string; email: string; role: string };
}

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

    res.json(user);  // ✅ Ne pas ajouter de `return` ici
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
