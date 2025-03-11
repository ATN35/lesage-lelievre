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
        id: crypto.randomUUID(), 
        user: { connect: { id: userId } },  
        product: { connect: { id: productId } },
        status: "pending",
      },
    });

    res.status(201).json({ message: "Réservation effectuée", reservation });
  } catch (error) {
    console.error("Erreur réservation :", error);
    res.status(500).json({ error: "Impossible de réserver cet article" });
  }
};
