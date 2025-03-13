import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/database";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

if (!process.env.ADMIN_SECRET_KEY) {
  throw new Error("ADMIN_SECRET_KEY n'est pas défini ! Vérifiez votre fichier .env");
}

const SECRET_KEY = process.env.ADMIN_SECRET_KEY;

// 🔥 Inscription utilisateur
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "Cet email est déjà utilisé" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: "user" },
    });

    res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
  } catch (error) {
    console.error("❌ Erreur lors de l'inscription :", error);
    res.status(500).json({ error: "Erreur serveur lors de l'inscription." });
  }
};

// 🔥 Connexion utilisateur
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Identifiants incorrects" });
      return;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.json({ message: "Connexion réussie", token, role: user.role });
  } catch (error) {
    console.error("❌ Erreur lors de la connexion :", error);
    res.status(500).json({ error: "Erreur serveur lors de la connexion." });
  }
};

// 🔥 Créer un administrateur
export const createAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, secretKey } = req.body;

    if (secretKey !== SECRET_KEY) {
      res.status(403).json({ error: "Clé secrète invalide" });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "Cet email est déjà utilisé" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: "admin" },
    });

    res.status(201).json({ message: "Administrateur créé avec succès", admin: newAdmin });
  } catch (error) {
    console.error("❌ Erreur lors de la création de l'administrateur :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🔥 Récupérer tous les utilisateurs (Admin uniquement)
export const getUsers = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== "admin") {
      res.status(403).json({ error: "Accès refusé" });
      return;
    }

    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    res.json(users);
  } catch (error) {
    console.error("❌ Erreur récupération utilisateurs :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🔥 Supprimer un utilisateur (Admin uniquement)
export const deleteUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== "admin") {
      res.status(403).json({ error: "Accès refusé" });
      return;
    }

    const userId = req.params.id;

    await prisma.user.delete({ where: { id: userId } });

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("❌ Erreur suppression utilisateur :", error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression de l'utilisateur." });
  }
};

// 🔥 Supprimer un message (Admin uniquement)
export const deleteMessage = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== "admin") {
      res.status(403).json({ error: "Accès refusé" });
      return;
    }

    const messageId = req.params.id;

    await prisma.message.delete({ where: { id: messageId } });

    res.json({ message: "Message supprimé avec succès" });
  } catch (error) {
    console.error("❌ Erreur suppression message :", error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression du message." });
  }
};
