import { Request, Response } from "express";
import { prisma } from "../config/database";

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Erreur récupération des produits :", error);
    res.status(500).json({ error: "Impossible de récupérer les produits" });
  }
};
