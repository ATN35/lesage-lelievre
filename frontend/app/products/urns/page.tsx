"use client";

import { useState } from "react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
};

const urns: Product[] = [
  { id: 1, name: "Urne funéraire en céramique", price: "120€", image: "/images/urnes.jpg", description: "Urne en céramique peinte à la main, idéale pour un hommage discret." },
  { id: 2, name: "Urne en marbre", price: "180€", image: "/images/urnes.jpg", description: "Urne en marbre élégante avec gravure personnalisable." },
  { id: 3, name: "Urne biodégradable", price: "90€", image: "/images/urnes.jpg", description: "Urne biodégradable conçue pour une dispersion respectueuse de l’environnement." },
];

export default function Urns() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Nos Urnes Funéraires</h1>
      <p className="text-gray-600 mt-4">Découvrez notre sélection de urnes funéraires adaptées à tous les besoins.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {urns.map((urn) => (
          <div key={urn.id} className="bg-white p-4 shadow-lg rounded-lg">
            <Image src={urn.image} alt={urn.name} width={300} height={200} className="w-full h-48 object-cover rounded-lg" />
            <h2 className="text-lg font-bold mt-4">{urn.name}</h2>
            <p className="text-gray-600">{urn.price}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
              onClick={() => setSelectedProduct(urn)}
            >
              Voir plus
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="mt-6 p-4 border rounded bg-gray-100 text-left">
          <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
          <p className="text-gray-700 mt-2">{selectedProduct.description}</p>
          <button
            className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-400 transition cursor-pointer"
            onClick={() => setSelectedProduct(null)}
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}
