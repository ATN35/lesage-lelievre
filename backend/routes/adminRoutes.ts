import express from "express";
import { authenticate, AuthenticatedRequest } from "../middleware/authMiddleware";
import { getUsers, deleteUser, deleteMessage } from "../controllers/authController";

const router = express.Router();

// 🔥 Récupérer tous les utilisateurs
router.get("/users", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    await getUsers(req, res);
  } catch (error) {
    console.error("❌ Erreur récupération utilisateurs :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// 🔥 Supprimer un utilisateur
router.delete("/users/:id", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    await deleteUser(req, res);
  } catch (error) {
    console.error("❌ Erreur suppression utilisateur :", error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression de l'utilisateur." });
  }
});

// 🔥 Supprimer un message
router.delete("/messages/:id", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    await deleteMessage(req, res);
  } catch (error) {
    console.error("❌ Erreur suppression message :", error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression du message." });
  }
});

export default router;
