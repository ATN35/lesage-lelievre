"use client";

import Image from "next/image";

const coffins = [
  { id: 1, name: "Cercueil en chêne massif", price: "850€", image: "/images/coffin1.jpg" },
  { id: 2, name: "Cercueil écologique", price: "620€", image: "/images/coffin2.jpg" },
  { id: 3, name: "Cercueil classique en pin", price: "450€", image: "/images/coffin3.jpg" },
];

export default function Coffins() {
  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Nos Cercueils</h1>
      <p className="text-gray-600 mt-4">Une sélection de cercueils adaptés à vos besoins et traditions.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {coffins.map((coffin) => (
          <div key={coffin.id} className="bg-white p-4 shadow-lg rounded-lg">
            <Image src={coffin.image} alt={coffin.name} width={300} height={200} className="w-full h-48 object-cover rounded-lg" />
            <h2 className="text-lg font-bold mt-4">{coffin.name}</h2>
            <p className="text-gray-600">{coffin.price}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Voir plus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
