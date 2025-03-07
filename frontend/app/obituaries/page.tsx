"use client";

export default function Obituaries() {
  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Avis de Décès</h1>
      <p className="text-gray-600 mt-4">Retrouvez les avis de décès récents en Ille-et-Vilaine.</p>

      <div className="mt-8 flex justify-center">
        <iframe 
          src="https://services.precom-obseques.fr/widget/5df9ff1b1ae1a" // URL de ton widget
          width="100%" 
          height="600"
          style={{ border: "none" }}
          title="Avis de décès"
        ></iframe>
      </div>
    </div>
  );
}
