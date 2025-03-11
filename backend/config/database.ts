import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function connectMySQL(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("📌 Connecté à MySQL");
  } catch (error) {
    console.error("❌ Erreur de connexion à MySQL :", error);
    process.exit(1);
  }
}

export { prisma, connectMySQL };
