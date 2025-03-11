"use client";

import { useState, useEffect } from "react";

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erreur de récupération de l'utilisateur");
          return res.json();
        })
        .then((data) => setUser({ name: data.name, email: data.email }))
        .catch((error) => {
          console.error("Erreur lors de la récupération de l'utilisateur :", error);
          setUser(null);
        });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      setStatus("error");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/messages/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: message }),
      });

      if (!res.ok) throw new Error("Échec de l'envoi");

      setMessage("");
      setStatus("success");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Contactez Admin</h2>

      {user ? (
        <>
          <p className="text-center text-gray-600">De : {user.name} ({user.email})</p>
          {status === "success" && <p className="text-green-500 text-center">Message envoyé !</p>}
          {status === "error" && <p className="text-red-500 text-center">Échec envoi.</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              placeholder="Écrivez votre message ici..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded h-32"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition cursor-pointer"
            >
              Envoyer
            </button>
          </form>
        </>
      ) : (
        <p className="text-center text-red-500">Vous devez être connecté pour envoyer un message.</p>
      )}
    </div>
  );
}
