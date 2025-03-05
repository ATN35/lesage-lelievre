"use client";

import { useEffect, useState } from "react";

// Définition du type des avis d'obsèques
type Obituary = {
  id: number;
  name: string;
  date: string;
  message: string;
};

export default function Obituaries() {
  const [obituaries, setObituaries] = useState<Obituary[]>([]); // 🔹 Typage du tableau d'obituaries

  useEffect(() => {
    fetch("https://api.example.com/obituaries")
      .then((res) => res.json())
      .then((data: Obituary[]) => setObituaries(data)) // 🔹 Type des données reçu
      .catch((err) => console.error("Erreur de chargement", err));
  }, []);

  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Avis Obsèques</h1>
      <p className="text-gray-600 mt-4">Consultez les derniers avis et laissez vos messages de condoléances.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {obituaries.length === 0 ? (
          <p className="text-gray-600">Chargement des avis...</p>
        ) : (
          obituaries.map((obituary) => (
            <div key={obituary.id} className="bg-white p-6 shadow-lg rounded-lg text-left">
              <h2 className="text-xl font-bold text-gray-900">{obituary.name}</h2>
              <p className="text-gray-600 text-sm">{obituary.date}</p>
              <p className="mt-2 text-gray-800">{obituary.message}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Ajouter un message
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
