"use client";

import Image from "next/image";

const urns = [
  {
    id: 1,
    name: "Urne funéraire en céramique",
    price: "120€",
    image: "/images/urnes.jpg",
  },
  {
    id: 2,
    name: "Urne en marbre",
    price: "180€",
    image: "/images/urnes.jpg",
  },
  {
    id: 3,
    name: "Urne biodégradable",
    price: "90€",
    image: "/images/urnes.jpg",
  },
];

export default function Urns() {
  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Nos Urnes Funéraires</h1>
      <p className="text-gray-600 mt-4">
        Découvrez notre sélection urnes funéraires adaptées à tous les besoins.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {urns.map((urn) => (
          <div key={urn.id} className="bg-white p-4 shadow-lg rounded-lg">
            <Image
              src={urn.image}
              alt={urn.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-lg font-bold mt-4">{urn.name}</h2>
            <p className="text-gray-600">{urn.price}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Voir plus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
