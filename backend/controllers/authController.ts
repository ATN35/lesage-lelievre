import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/database";
import { Request, Response } from "express";

// ✅ Route pour l'inscription des utilisateurs
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: "user" }, // ✅ Ajout du rôle par défaut
    });

    res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    res.status(500).json({ error: "Erreur lors de l'inscription" });
  }
};

// ✅ Route pour la connexion des utilisateurs
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true, role: true }, // ✅ Vérifie qu'on récupère bien le rôle
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Identifiants incorrects" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.json({ message: "Connexion réussie", token, role: user.role });
  } catch (error) {
    console.error("Erreur de connexion:", error);
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};

// ✅ Clé secrète stockée dans `.env` pour sécuriser la création d'admin
const SECRET_KEY = process.env.ADMIN_SECRET_KEY || "supersecret";

// ✅ Route pour créer un administrateur
export const createAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, secretKey } = req.body;

    // 🔐 Vérifier la clé secrète
    if (secretKey !== SECRET_KEY) {
      res.status(403).json({ error: "Clé secrète invalide" });
      return;
    }

    // ✅ Vérifier si l'admin existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "Cet email est déjà utilisé" });
      return;
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
