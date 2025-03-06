"use client";

import Image from "next/image";

const plaques = [
  {
    id: 1,
    name: "Plaque de Granit",
    price: "150€",
    image: "/images/plaque_granit.jpg",
  },
  {
    id: 2,
    name: "Plaque d’Urne",
    price: "120€",
    image: "/images/plaque_urne.jpg",
  },
  {
    id: 3,
    name: "Plaque de Cavurne",
    price: "180€",
    image: "/images/plaque_cavurne.jpg",
  },
  {
    id: 4,
    name: "Plaque de Vase",
    price: "90€",
    image: "/images/plaque_vase.jpg",
  },
];

export default function Plaques() {
  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Nos Plaques Funéraires</h1>
      <p className="text-gray-600 mt-4">
        Découvrez notre sélection de plaques funéraires pour un hommage personnalisé.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {plaques.map((plaque) => (
          <div key={plaque.id} className="bg-white p-4 shadow-lg rounded-lg">
            <Image
              src={plaque.image}
              alt={plaque.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-lg font-bold mt-4">{plaque.name}</h2>
            <p className="text-gray-600">{plaque.price}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Voir plus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
