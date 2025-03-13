import express, { Response } from "express";
import { register, login, createAdmin } from "../controllers/authController";
import { authenticate, AuthenticatedRequest } from "../middleware/authMiddleware";
import { prisma } from "../config/database";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin/register", createAdmin);

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
    console.error("❌ Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.delete("/delete-account", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Utilisateur non authentifié" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }

    await prisma.user.delete({ where: { id: req.user.id } });

    res.json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression du compte :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/admin/users", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Accès interdit. Seul l'admin peut voir les utilisateurs." });
      return;
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        messagesSent: { select: { id: true, content: true, createdAt: true } },
        messagesReceived: { select: { id: true, content: true, createdAt: true } },
      },
    });

    res.json(users);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.delete("/admin/users/:userId", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Accès interdit. Seul un administrateur peut supprimer des utilisateurs." });
      return;
    }

    const { userId } = req.params;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }

    if (user.role === "admin") {
      res.status(403).json({ error: "Impossible de supprimer un administrateur." });
      return;
    }

    await prisma.user.delete({ where: { id: userId } });

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/admin/messages", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Accès interdit. Seul un administrateur peut voir les messages." });
      return;
    }

    const messages = await prisma.message.findMany({
      select: {
        id: true,
        content: true,
        createdAt: true,
        sender: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(messages);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des messages :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
