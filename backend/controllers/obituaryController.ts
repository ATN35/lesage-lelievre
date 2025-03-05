import { Request, Response } from "express";
import { prisma } from "../config/database";

// ✅ Récupérer tous les avis d’obsèques
export const getObituaries = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("🔍 Requête reçue pour récupérer les avis d’obsèques...");
    const obituaries = await prisma.obituary.findMany({
      include: {
        condolences: true,
      },
    });
    console.log("✅ Données récupérées :", obituaries);
    res.json(obituaries);
  } catch (error) {
    console.error("❌ Erreur détaillée :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des avis d’obsèques" });
  }
};

// ✅ Ajouter un avis d’obsèques
export const createObituary = async (req: Request, res: Response): Promise<void> => {
  const { deceased, date, message } = req.body;

  if (!deceased || !date || !message) {
    res.status(400).json({ error: "Tous les champs sont obligatoires." });
    return;
  }

  try {
    const newObituary = await prisma.obituary.create({
      data: {
        deceased,
        date: new Date(date),
        message,
      },
    });
    res.status(201).json(newObituary);
  } catch (error) {
    console.error("❌ Erreur lors de l’ajout de l’avis d’obsèques :", error);
    res.status(500).json({ error: "Erreur lors de l’ajout de l’avis d’obsèques" });
  }
};

// ✅ Ajouter une condoléance
export const addCondolence = async (req: Request, res: Response): Promise<void> => {
  const { obituaryId, message, author } = req.body;

  if (!obituaryId || !message || !author) {
    res.status(400).json({ error: "Tous les champs sont obligatoires." });
    return;
  }

  try {
    // Vérifier si l'avis d'obsèques existe
    const obituaryExists = await prisma.obituary.findUnique({
      where: { id: obituaryId },
    });

    if (!obituaryExists) {
      res.status(404).json({ error: "L'avis d'obsèques n'existe pas." });
      return;
    }

    const newCondolence = await prisma.condolence.create({
      data: {
        obituaryId,
        message,
        author,
      },
    });
    res.status(201).json(newCondolence);
  } catch (error) {
    console.error("❌ Erreur lors de l’ajout de la condoléance :", error);
    res.status(500).json({ error: "Erreur lors de l’ajout de la condoléance" });
  }
};
