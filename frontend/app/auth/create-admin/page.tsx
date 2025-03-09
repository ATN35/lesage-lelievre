"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
        const res = await fetch("http://localhost:5000/api/auth/create-admin", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, secretKey }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de la création de l'admin");
        return;
      }

      setSuccess("Admin créé avec succès !");
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (err) {
      console.error("Erreur lors de la création de l'admin :", err);
      setError("Erreur serveur. Veuillez réessayer.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Créer un Administrateur</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Clé Secrète"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition"
        >
          Créer un compte admin
        </button>
      </form>
    </div>
  );
}
