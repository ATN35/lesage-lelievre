import { Request, Response } from "express";
import { prisma } from "../config/database";

export const createReservation = async (req: Request, res: Response): Promise<void> => {
  const { userId, productId } = req.body;

  try {
    const reservation = await prisma.reservation.create({
      data: { userId, productId },
    });

    res.status(201).json({ message: "Réservation effectuée", reservation });
  } catch (error) {
    console.error("Erreur réservation :", error);
    res.status(500).json({ error: "Impossible de réserver cet article" });
  }
};
