"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Message = {
  id: string;
  content: string;
  createdAt: string;
};

type User = {
  id: string;
  name: string;
  email: string;
};

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");

    if (!storedRole) {
      router.push("/auth/login");
      return;
    }

    setRole(storedRole);
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setError("Impossible de récupérer vos informations"));

    fetch("http://localhost:5000/api/messages/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data: Message[]) => setMessages(data))
      .catch(() => console.error("Erreur chargement des messages"));
  }, []);

  const handleDeleteAccount = async () => {
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/auth/delete-account", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de la suppression du compte");
        return;
      }

      setSuccess("Compte supprimé avec succès !");
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      setTimeout(() => {
        router.push("/auth/register");
      }, 2000);
    } catch (err) {
      console.error("Erreur lors de la suppression du compte :", err);
      setError("Erreur serveur. Veuillez réessayer.");
    }
  };

  if (!role) {
    return <p className="text-center text-gray-500">Chargement...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Mon tableau de bord</h1>

      {user ? (
        <div className="mt-4 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold">Mes informations</h2>
          <p className="text-gray-700 mt-2"><strong>Nom :</strong> {user.name}</p>
          <p className="text-gray-700"><strong>Email :</strong> {user.email}</p>
          <p className="text-gray-700"><strong>Mot de passe :</strong> ********</p>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">Chargement des informations...</p>
      )}

      <h2 className="text-xl mt-6">Mes messages envoyés</h2>
      <ul>
        {messages.length > 0 ? (
          messages.map((msg) => (
            <li key={msg.id} className="border p-2 my-2">
              <p>{msg.content}</p>
              <small className="text-gray-500">Envoyé le {new Date(msg.createdAt).toLocaleString()}</small>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Aucun message envoyé.</p>
        )}
      </ul>

      <div className="mt-6">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <button
          onClick={handleDeleteAccount}
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-500 transition cursor-pointer"
        >
          Supprimer mon compte
        </button>
      </div>
    </div>
  );
}
