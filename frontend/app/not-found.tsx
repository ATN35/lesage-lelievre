"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulation du chargement de 2 secondes

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-semibold">Chargement en cours...</p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-6xl font-bold">Erreur 404</h1>
          <p className="text-xl mt-2">Page introuvable</p>
          <p className="text-gray-400 mt-2">
            La page que vous cherchez ne semble pas exister.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
          >
            Retour à la page d accueil
          </button>
        </div>
      )}
    </div>
  );
}
