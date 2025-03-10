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

  useEffect(() => {
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
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Gestion des Utilisateurs</h1>

      {error && <p className="text-red-500">{error}</p>}

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
