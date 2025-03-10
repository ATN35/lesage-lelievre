"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");

    // ✅ Si aucun rôle trouvé, redirige vers la page de connexion
    if (!storedRole) {
      router.push("/auth/login");
      return;
    }

    // ✅ Si l'utilisateur n'est pas admin, le rediriger vers `/dashboard/user`
    if (storedRole !== "admin") {
      router.replace("/dashboard/user");
      return;
    }

    setRole(storedRole);
  }, []);

  if (!role) {
    return <p className="text-center text-gray-500">Chargement...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Tableau de bord Admin</h1>
      <p>Interface pour gérer les produits et réservations.</p>
    </div>
  );
}