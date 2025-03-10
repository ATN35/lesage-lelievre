import { Request, Response } from "express";
import { prisma } from "../config/database";

export const createReservation = async (req: Request, res: Response): Promise<void> => {
  const { userId, productId } = req.body;

  try {
    if (!userId || !productId) {
      res.status(400).json({ error: "Utilisateur ou produit manquant" });
      return;
    }

    const reservation = await prisma.reservation.create({
      data: {
        id: crypto.randomUUID(), // Génère un ID unique
        user: { connect: { id: userId } },   // Lie la réservation à l'utilisateur
        product: { connect: { id: productId } }, // Lie la réservation au produit
        status: "pending", // Statut par défaut
      },
    });

    res.status(201).json({ message: "Réservation effectuée", reservation });
  } catch (error) {
    console.error("Erreur réservation :", error);
    res.status(500).json({ error: "Impossible de réserver cet article" });
  }
};
