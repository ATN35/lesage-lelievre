import express, { Response } from "express";
import { register, login, createAdmin } from "../controllers/authController"; // ✅ Ajout de createAdmin
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

// ✅ Route pour supprimer son propre compte
router.delete("/delete-account", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Utilisateur non authentifié" });
      return;
    }

    // 🔍 Vérifie si l'utilisateur existe
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }

    // ⚠️ Supprime l'utilisateur et ses données associées
    await prisma.user.delete({ where: { id: req.user.id } });

    res.json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du compte :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ✅ Route pour récupérer tous les utilisateurs (Admin uniquement)
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
        reservation: { select: { id: true, productId: true, status: true, createdAt: true } },
        messagesSent: { select: { id: true, content: true, createdAt: true } },
        messagesReceived: { select: { id: true, content: true, createdAt: true } },
      },
    });

    res.json(users);
  } catch (error) {
    console.error("Erreur récupération des utilisateurs :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ✅ Route pour permettre à l'admin de supprimer un utilisateur
router.delete("/admin/users/:userId", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ error: "Accès interdit. Seul un administrateur peut supprimer des utilisateurs." });
      return;
    }

    const { userId } = req.params;

    // 🔍 Vérifie si l'utilisateur existe
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }

    // ⚠️ Empêcher la suppression d'un autre administrateur
    if (user.role === "admin") {
      res.status(403).json({ error: "Impossible de supprimer un administrateur." });
      return;
    }

    // ✅ Supprime l'utilisateur
    await prisma.user.delete({ where: { id: userId } });

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
