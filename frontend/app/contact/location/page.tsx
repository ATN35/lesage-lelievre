"use client";

import Image from "next/image";

const agencies = [
  {
    id: 1,
    name: "Chambre Funéraire - La Guerche de Bretagne",
    address: "12 Rue des Pompes Funèbres, 35130 La Guerche de Bretagne",
    phone: "02 99 96 12 34",
    image: "/images/chambre_funeraire_lesage-lelievre_guerche.png",
  },
  {
    id: 2,
    name: "Chambre Funéraire - Argentré-du-Plessis",
    address: "5 Place du Souvenir, 35370 Argentré-du-Plessis",
    phone: "02 99 76 45 67",
    image: "/images/chambre_funeraire_lesage-lelievre_argentre.png",
  },
];

export default function Locations() {
  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-800 text-center">
        Nos Agences
      </h1>
      <p className="text-gray-600 text-center mt-4">
        Retrouvez nos chambres funéraires et nos agences locales.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {agencies.map((agency) => (
          <div key={agency.id} className="bg-white p-6 shadow-lg rounded-lg">
            <Image
              src={agency.image}
              alt={agency.name}
              width={500}
              height={300}
              className="w-full h-60 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4">{agency.name}</h2>
            <p className="text-gray-600">{agency.address}</p>
            <p className="text-gray-800 font-semibold mt-2">📞 {agency.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
