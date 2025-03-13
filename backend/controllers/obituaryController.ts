import { Request, Response } from "express";

export const getObituaries = async (req: Request, res: Response) => {
  try {
    const response = await fetch("https://services.precom-obseques.fr/api/obituaries");
    const obituaries = await response.json();

    res.json(obituaries);
  } catch (error) {
    console.error("Erreur récupération avis de décès:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
