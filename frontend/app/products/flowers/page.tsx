"use client";

import Image from "next/image";

const flowers = [
  { id: 1, name: "Bouquet de roses blanches", price: "50€", image: "/images/flowers.jpg" },
  { id: 2, name: "Couronne florale", price: "120€", image: "/images/flowers.jpg" },
  { id: 3, name: "Arrangement floral", price: "90€", image: "/images/flowers.jpg" },
];

export default function Flowers() {
  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Nos Fleurs</h1>
      <p className="text-gray-600 mt-4">Des fleurs naturelles pour rendre hommage.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {flowers.map((flower) => (
          <div key={flower.id} className="bg-white p-4 shadow-lg rounded-lg">
            <Image src={flower.image} alt={flower.name} width={300} height={200} className="w-full h-48 object-cover rounded-lg" />
            <h2 className="text-lg font-bold mt-4">{flower.name}</h2>
            <p className="text-gray-600">{flower.price}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Voir plus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
