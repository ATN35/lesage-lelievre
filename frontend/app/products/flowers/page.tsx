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

const flowers: Product[] = [
  { id: 1, name: "Bouquet de roses blanches", price: "50€", image: "/images/flowers.jpg", description: "Bouquet de roses blanches symbolisant la pureté et l'affection." },
  { id: 2, name: "Couronne florale", price: "120€", image: "/images/flowers.jpg", description: "Couronne de fleurs naturelles, parfaite pour les cérémonies funéraires." },
  { id: 3, name: "Arrangement floral", price: "90€", image: "/images/flowers.jpg", description: "Arrangement de fleurs conçu pour apporter réconfort et hommage." },
];

export default function Flowers() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
              onClick={() => setSelectedProduct(flower)}
            >
              Voir plus
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="mt-6 p-4 border rounded bg-gray-100 text-left shadow-md">
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
