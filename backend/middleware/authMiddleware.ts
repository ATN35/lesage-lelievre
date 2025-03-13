import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/database";

export interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; name: string; role: string };
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Accès interdit, token manquant." });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) {
      res.status(403).json({ error: "Utilisateur non trouvé." });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Erreur d'authentification :", error);
    res.status(403).json({ error: "Token invalide." });
    return;
  }
};
