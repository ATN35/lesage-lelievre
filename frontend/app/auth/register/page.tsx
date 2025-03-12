"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://lesage-lelievre-production.up.railway.app";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur d'inscription");
      }

      router.push("/auth/login");
    } catch (error) {
      console.error("❌ Erreur serveur :", error);
      setError(error instanceof Error ? error.message : "Une erreur inconnue est survenue");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Inscription</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <input type="text" name="name" placeholder="Nom" onChange={handleChange} className="border p-2" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2" required />
        <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} className="border p-2" required />
        <button type="submit" className="bg-blue-500 text-white p-2">Inscription</button>
      </form>
      <p className="mt-4">
        Déjà un compte ? <a href="/auth/login" className="text-blue-500">Se connecter</a>
      </p>
    </div>
  );
}
