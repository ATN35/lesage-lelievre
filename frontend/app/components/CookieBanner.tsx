"use client";

import { useEffect, useState } from "react";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://lesage-lelievre-production.up.railway.app";

export default function CookieBanner() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/cookies/user123`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setConsent(data.consent))
      .catch(() => setConsent(null));
  }, []);

  const handleAccept = () => {
    fetch(`${API_URL}/api/cookies/set`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userId: "user123", consent: true }),
    }).then(() => setConsent(true));
  };

  const handleReject = () => {
    fetch(`${API_URL}/api/cookies/delete/user123`, {
      method: "DELETE",
      credentials: "include",
    }).then(() => setConsent(false));
  };

  if (consent !== null) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-lg border border-gray-300 p-6 rounded-lg w-[400px] text-center z-50">
      <h2 className="text-lg font-semibold text-gray-800">🍪 Les Cookies</h2>
      <p className="text-gray-600 text-sm mt-2">
        Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez accepter ou refuser.
      </p>
      <div className="mt-4 flex justify-center space-x-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition cursor-pointer"
          onClick={handleAccept}
        >
          Accepter
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition cursor-pointer"
          onClick={handleReject}
        >
          Refuser
        </button>
      </div>
    </div>
  );
}
