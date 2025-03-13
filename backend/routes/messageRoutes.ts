import express from "express";
import { authenticate, AuthenticatedRequest } from "../middleware/authMiddleware";
import { sendFromContact, getUserMessages } from "../controllers/messageController";

const router = express.Router();

router.post("/contact", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    await sendFromContact(req, res);
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi du message :", error);
    res.status(500).json({ error: "Erreur serveur lors de l'envoi du message." });
  }
});

router.get("/user", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    await getUserMessages(req, res);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des messages :", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des messages." });
  }
});

export default router;
