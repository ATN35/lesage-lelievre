import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGODB_URL as string);
let db: Db;

async function connectMongoDB(): Promise<void> {
  try {
    await mongoClient.connect();
    db = mongoClient.db("lesage_users_data");
    console.log("📌 Connecté à MongoDB");
  } catch (error) {
    console.error("❌ Erreur de connexion à MongoDB :", error);
    process.exit(1);
  }
}

// ✅ Fonction pour obtenir la collection cookies (évite d'accéder à MongoDB avant la connexion)
const cookieCollection = (): any => {
  if (!db) {
    throw new Error("MongoDB n'est pas connecté !");
  }
  return db.collection("cookies");
};

export { connectMongoDB, cookieCollection };
