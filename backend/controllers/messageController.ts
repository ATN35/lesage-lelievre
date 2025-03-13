import { Response } from "express";
import { prisma } from "../config/database";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export const sendFromContact = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { content } = req.body;

    if (!content || !req.user) {
      res.status(400).json({ error: "Données incomplètes" });
      return;
    }

    const admin = await prisma.user.findFirst({ where: { role: "admin" } });
    if (!admin) {
      res.status(500).json({ error: "Aucun administrateur trouvé" });
      return;
    }

    await prisma.message.create({
      data: {
        senderId: req.user.id,
        receiverId: admin.id,
        content,
      },
    });

    res.status(201).json({ message: "Message envoyé avec succès" });
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi du message :", error);
    res.status(500).json({ error: "Erreur serveur lors de l'envoi du message." });
  }
};

export const getUserMessages = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Utilisateur non authentifié" });
      return;
    }

    const messages = await prisma.message.findMany({
      where: { senderId: req.user.id },
      select: { id: true, content: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(messages);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des messages :", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des messages." });
  }
};

export const getAllMessages = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== "admin") {
      res.status(403).json({ error: "Accès refusé" });
      return;
    }

    const messages = await prisma.message.findMany({
      include: {
        sender: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(messages);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des messages :", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des messages." });
  }
};
