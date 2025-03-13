"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Message = { id: string; content: string; createdAt: string };
type User = { id: string; name: string; email: string };

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://lesage-lelievre-production.up.railway.app";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Échec de récupération des informations");

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("❌ Erreur récupération utilisateur :", error);
        setError("Impossible de récupérer vos informations");
      }
    };

    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_URL}/api/messages/user`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Échec de récupération des messages");

        const data: Message[] = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("❌ Erreur récupération messages :", error);
        setError("Erreur chargement des messages");
      }
    };

    fetchUser();
    fetchMessages();
  }, []);

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/api/auth/delete-account`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Échec de suppression du compte");

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      router.push("/auth/register");
    } catch (error) {
      console.error("❌ Erreur suppression compte :", error);
      setError("Erreur serveur lors de la suppression du compte");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Mon tableau de bord</h1>

      {error && <p className="text-red-500">{error}</p>}

      {user ? (
        <div className="mt-4 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold">Mes informations</h2>
          <p><strong>Nom :</strong> {user.name}</p>
          <p><strong>Email :</strong> {user.email}</p>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">Chargement des informations...</p>
      )}

      <h2 className="text-xl mt-6 font-semibold">Mes messages envoyés</h2>
      {messages.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {messages.map((msg) => (
            <li key={msg.id} className="border p-2 rounded">
              <p>{msg.content}</p>
              <small className="text-gray-500">
                Envoyé le {new Date(msg.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Aucun message envoyé.</p>
      )}

      <button
        onClick={handleDeleteAccount}
        className="bg-red-600 text-white p-2 rounded mt-6 w-full hover:bg-red-500 transition"
      >
        Supprimer mon compte
      </button>
    </div>
  );
}
