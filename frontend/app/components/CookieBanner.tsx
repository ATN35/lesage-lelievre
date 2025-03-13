"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    console.log("🔍 Vérification du consentement...");

    const storedConsent = localStorage.getItem("cookieConsent");
    console.log("📂 Valeur dans localStorage :", storedConsent);

    if (storedConsent === "true" || storedConsent === "false") {
      console.log("✅ Consentement trouvé :", storedConsent);
      setConsent(storedConsent === "true");
    } else {
      console.log("⚠️ Aucun consentement trouvé. La bannière RESTE AFFICHÉE.");
      setConsent(null);
    }
  }, []);

  const handleAccept = () => {
    console.log("✅ L'utilisateur a accepté les cookies.");
    localStorage.setItem("cookieConsent", "true");
    setConsent(true);
  };

  const handleReject = () => {
    console.log("❌ L'utilisateur a refusé les cookies.");
    localStorage.setItem("cookieConsent", "false");
    setConsent(false);
  };

  if (consent !== null) {
    console.log("🚨 La bannière NE DEVRAIT PLUS être affichée.");
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-lg border border-gray-300 p-4 rounded-lg w-[90%] max-w-[400px] text-center z-50">
      <h2 className="text-lg font-semibold text-gray-800">🍪 Gestion des Cookies</h2>
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
