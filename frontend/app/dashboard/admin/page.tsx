"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = { id: string; name: string; email: string; role: string };

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
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
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Échec de récupération des utilisateurs");

        const data: User[] = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("❌ Erreur récupération utilisateurs :", error);
        setError("Impossible de charger les utilisateurs");
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    const token = localStorage.getItem("token");

    if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

    try {
      const res = await fetch(`${API_URL}/api/auth/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Échec de suppression de l'utilisateur");

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("❌ Erreur suppression utilisateur :", error);
      setError("Erreur serveur lors de la suppression de l'utilisateur");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>

      {error && <p className="text-red-500">{error}</p>}

      {users.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {users.map((user) => (
            <li key={user.id} className="border p-2 rounded flex justify-between items-center">
              <span>{user.name} - {user.email} ({user.role})</span>
              {user.role !== "admin" && (
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="ml-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition"
                >
                  Supprimer
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4">Aucun utilisateur trouvé.</p>
      )}
    </div>
  );
}
