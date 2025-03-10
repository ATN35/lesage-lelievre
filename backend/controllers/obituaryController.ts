import { Request, Response } from "express";
import { prisma } from "../config/database";
import crypto from "crypto"; // ✅ Import pour générer un UUID

// ✅ Récupérer tous les avis de décès
export const getObituaries = async (req: Request, res: Response) => {
  try {
    const obituaries = await prisma.obituary.findMany({
      include: {
        condolence: true, // ✅ Correction du champ (avant: "condolences")
      },
    });

    res.json(obituaries);
  } catch (error) {
    console.error("Erreur récupération avis de décès:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ✅ Créer un avis de décès
export const createObituary = async (req: Request, res: Response) => {
  try {
    const { deceased, date, message } = req.body;

    const newObituary = await prisma.obituary.create({
      data: {
        id: crypto.randomUUID(), // ✅ Ajout de l'ID unique
        deceased,
        date: new Date(date),
        message,
      },
    });

    res.status(201).json({ message: "Avis de décès créé avec succès", obituary: newObituary });
  } catch (error) {
    console.error("Erreur création avis de décès:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ✅ Ajouter une condoléance à un avis de décès
export const addCondolence = async (req: Request, res: Response) => {
  try {
    const { obituaryId, message, author } = req.body;

    const newCondolence = await prisma.condolence.create({
      data: {
        id: crypto.randomUUID(), // ✅ Ajout de l'ID unique
        obituary: { connect: { id: obituaryId } }, // ✅ Connection à l'obituary
        message,
        author,
      },
    });

    res.status(201).json({ message: "Condoléance ajoutée avec succès", condolence: newCondolence });
  } catch (error) {
    console.error("Erreur ajout condoléance:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ✅ Supprimer un avis de décès (admin seulement)
export const deleteObituary = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.obituary.delete({
      where: { id },
    });

    res.json({ message: "Avis de décès supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression avis de décès:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
