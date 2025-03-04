import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function connectDB(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("📌 Connecté à la base de données MySQL");
  } catch (error) {
    console.error("❌ Erreur de connexion à MySQL :", error);
    process.exit(1);
  }
}

export { prisma, connectDB };
