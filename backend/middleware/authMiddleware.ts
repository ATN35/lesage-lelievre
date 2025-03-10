import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/database";

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; role: string };
}

// ✅ Middleware pour vérifier l'authentification
export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Accès interdit, token manquant." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
      role: string;
    };

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      res.status(403).json({ error: "Utilisateur non trouvé." });
      return;
    }

    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (error) {
    res.status(403).json({ error: "Token invalide." });
  }
};

// ✅ Middleware pour vérifier si l'utilisateur est admin
export const isAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Accès interdit, utilisateur non authentifié." });
    return;
  }

  if (req.user.role !== "admin") {
    res.status(403).json({ error: "Accès refusé, vous devez être administrateur." });
    return;
  }

  next();
};
