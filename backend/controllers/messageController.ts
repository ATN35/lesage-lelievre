import { Request, Response } from "express";
import { prisma } from "../config/database";

// ✅ Étendre l'interface Request pour inclure `user`
interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; name: string; role: string };
}

// ✅ Envoyer un message depuis la page de contact
export const sendFromContact = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Utilisateur non authentifié" });
      return;
    }

    const { content } = req.body;
    const senderId = req.user.id;

    // ✅ Trouver un administrateur pour recevoir le message
    const admin = await prisma.user.findFirst({
      where: { role: "admin" },
      select: { id: true },
    });

    if (!admin) {
      res.status(404).json({ error: "Admin non trouvé" });
      return;
    }

    await prisma.message.create({
      data: {
        senderId,
        receiverId: admin.id,
        content,
      },
    });

    res.status(201).json({ message: "Message envoyé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message depuis Contact:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ✅ Récupérer les messages envoyés par l'utilisateur
export const getUserMessages = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Utilisateur non authentifié" });
      return;
    }

    const messages = await prisma.message.findMany({
      where: { senderId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    res.json(messages);
  } catch (error) {
    console.error("Erreur lors de la récupération des messages :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
