import express, { Request, Response } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { prisma } from "../config/database";

const router = express.Router();

// ✅ Route pour récupérer tous les utilisateurs
router.get("/users", authenticate, async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        reservation: true,
        messagesSent: true,
        messagesReceived: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
