"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = { id: string; name: string; email: string; role: string };
type Message = { id: string; content: string; createdAt: string; sender: { name: string; email: string } };

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
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

    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/admin/users`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Échec de récupération des utilisateurs");

        const data: User[] = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("❌ Erreur récupération utilisateurs :", error);
        setError("Impossible de charger les utilisateurs");
      }
    };

    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_URL}/api/messages/all`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Échec de récupération des messages");

        const data: Message[] = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("❌ Erreur récupération messages :", error);
        setError("Impossible de charger les messages");
      }
    };

    fetchUsers();
    fetchMessages();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

    try {
      await fetch(`${API_URL}/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("❌ Erreur suppression utilisateur :", error);
      setError("Erreur lors de la suppression de l'utilisateur");
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce message ?")) return;

    try {
      await fetch(`${API_URL}/api/admin/messages/${messageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setMessages(messages.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error("❌ Erreur suppression message :", error);
      setError("Erreur lors de la suppression du message");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <h2 className="text-xl mt-6 font-semibold">Utilisateurs</h2>
      {users.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {users.map((user) => (
            <li key={user.id} className="border p-2 rounded flex justify-between items-center">
              <span>{user.name} - {user.email} ({user.role})</span>
              {user.role !== "admin" && (
              <button
              onClick={() => handleDeleteUser(user.id)}
              className="ml-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition cursor-pointer"
            >
              Supprimer
            </button>            
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Aucun utilisateur trouvé.</p>
      )}

      <h2 className="text-xl mt-6 font-semibold">Messages envoyés</h2>
      {messages.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {messages.map((msg) => (
            <li key={msg.id} className="border p-2 rounded">
              <p><strong>De :</strong> {msg.sender.name} ({msg.sender.email})</p>
              <p>{msg.content}</p>
              <small className="text-gray-500">
                Envoyé le {new Date(msg.createdAt).toLocaleString()}
              </small>
              <button
                onClick={() => handleDeleteMessage(msg.id)}
                className="ml-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition cursor-pointer"
                >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Aucun message reçu.</p>
      )}
    </div>
  );
}
