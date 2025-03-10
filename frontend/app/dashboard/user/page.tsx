"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Message = {
  id: string;
  content: string;
  createdAt: string;
};

export default function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");

    if (!storedRole) {
      router.push("/auth/login");
      return;
    }

    setRole(storedRole);

    const token = localStorage.getItem("token");

    fetch("/api/messages/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data: Message[]) => setMessages(data))
      .catch((error) => console.error("Erreur chargement des messages :", error));
  }, []);

  if (!role) {
    return <p className="text-center text-gray-500">Chargement...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Mon tableau de bord</h1>
      <h2 className="text-xl mt-4">Mes messages envoyés</h2>
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
    </div>
  );
}
