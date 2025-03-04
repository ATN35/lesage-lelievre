import { Request, Response } from "express";
import { prisma } from "../config/database";

export const getObituaries = async (req: Request, res: Response): Promise<void> => {
  try {
    const obituaries = await prisma.obituary.findMany();
    res.json(obituaries);
  } catch (error) {
    console.error("Erreur récupération des avis d'obsèques :", error);
    res.status(500).json({ error: "Impossible de récupérer les avis d'obsèques" });
  }
};
