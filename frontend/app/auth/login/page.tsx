"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://lesage-lelievre-production.up.railway.app";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur de connexion");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      setTimeout(() => {
        router.push(data.role === "admin" ? "/dashboard/admin" : "/dashboard/user");
      }, 500);
    } catch (error) {
      console.error("❌ Erreur serveur :", error);
      setError("Erreur serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Connexion</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4 w-full max-w-md">
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
      <p className="mt-4">
        Pas encore de compte ?{" "}
        <a href="/auth/register" className="text-blue-500">Inscription</a>
      </p>
    </div>
  );
}
