"use client";

import { useEffect, useState } from "react";

type Reservation = {
  id: string;
  productId: string;
  status: string;
  createdAt: string;
};

type Message = {
  id: string;
  content: string;
  createdAt: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  reservation: Reservation[];
  messagesSent: Message[];
  messagesReceived: Message[];
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Vous devez être connecté en tant qu'admin.");
      return;
    }

    fetch("http://localhost:5000/api/auth/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error("Erreur chargement utilisateurs :", err);
        setError("Impossible de charger les utilisateurs");
      });
  };

  // ✅ Fonction pour supprimer un utilisateur
  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5000/api/auth/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de la suppression de l'utilisateur");
        return;
      }

      setSuccess("Utilisateur supprimé avec succès !");
      fetchUsers();
    } catch (err) {
      console.error("Erreur lors de la suppression de l'utilisateur :", err);
      setError("Erreur serveur. Veuillez réessayer.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Gestion des Utilisateurs</h1>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4">Nom</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Rôle</th>
              <th className="py-2 px-4">Créé le</th>
              <th className="py-2 px-4">Réservations</th>
              <th className="py-2 px-4">Messages Envoyés</th>
              <th className="py-2 px-4">Messages Reçus</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4">{user.reservation.length}</td>
                <td className="py-2 px-4">{user.messagesSent.length}</td>
                <td className="py-2 px-4">{user.messagesReceived.length}</td>
                <td className="py-2 px-4">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-600 text-white p-2 rounded hover:bg-red-500 transition cursor-pointer"
                    >
                      Supprimer
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
