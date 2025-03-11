import express, { Request, Response } from "express";
import { cookieCollection } from "../models/cookieModel";
import cookieParser from "cookie-parser";

const router = express.Router();
router.use(cookieParser());

// ✅ Enregistrer le consentement utilisateur
router.post("/set", async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, consent } = req.body;

    if (!userId || consent === undefined) {
      res.status(400).json({ error: "Données manquantes" });
      return;
    }

    await cookieCollection().updateOne(
      { userId },
      { $set: { consent, updatedAt: new Date() } },
      { upsert: true }
    );

    res.cookie("userConsent", consent, { httpOnly: true, maxAge: 365 * 24 * 60 * 60 * 1000 });
    res.json({ message: "Consentement mis à jour" });
  } catch (error) {
    console.error("❌ Erreur set cookie :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ✅ Récupérer l’état du consentement d’un utilisateur
router.get("/:userId", async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const cookie = await cookieCollection().findOne({ userId });

    res.json({ consent: cookie ? cookie.consent : null });
  } catch (error) {
    console.error("❌ Erreur get cookie :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ✅ Supprimer le consentement utilisateur
router.delete("/delete/:userId", async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    await cookieCollection().deleteOne({ userId });

    res.clearCookie("userConsent");
    res.json({ message: "Consentement retiré" });
  } catch (error) {
    console.error("❌ Erreur suppression cookie :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
