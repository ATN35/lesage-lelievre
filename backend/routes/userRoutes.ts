import express, { Request, Response } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { prisma } from "../config/database";

const router = express.Router();

interface AuthenticatedRequest extends Request {
  user?: { id: string; name: string; email: string; role: string };
}

router.get("/me", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Utilisateur non authentifié" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    if (!user) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.delete("/:id", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || req.user.id !== req.params.id) {
      res.status(403).json({ error: "Accès refusé" });
      return;
    }

    await prisma.user.delete({ where: { id: req.params.id } });

    res.json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression du compte :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
