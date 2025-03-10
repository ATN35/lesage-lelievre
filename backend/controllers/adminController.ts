import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../config/database";

// ✅ Clé secrète pour créer un admin
const SECRET_KEY = process.env.ADMIN_SECRET_KEY || "monmotdepasseultrasecurisé";

// ✅ Créer un administrateur
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password, secretKey } = req.body;

    // 🔐 Vérifier la clé secrète
    if (secretKey !== SECRET_KEY) {
      return res.status(403).json({ error: "Clé secrète invalide" });
    }

    // ✅ Vérifier si l'admin existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Cet email est déjà utilisé" });
    }

    // 🔐 Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Créer l'administrateur
    const newAdmin = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: "admin" },
    });

    res.status(201).json({ message: "Administrateur créé avec succès", admin: newAdmin });
  } catch (error) {
    console.error("Erreur lors de la création de l'admin :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
