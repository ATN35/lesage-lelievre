"use client";

import { useState } from "react";
import MapBox from "./components/MapBox";
import Image from "next/image";

export default function Home() {
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);

  const locations = [
    { 
      name: "La Guerche de Bretagne", 
      image: "/images/chambre_funeraire_lesage-lelievre_guerche.png",
    },
    { 
      name: "Argentré-du-Plessis", 
      image: "/images/chambre_funeraire_lesage-lelievre_argentre.png",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto text-center py-16 px-6">
        <h1 className="text-4xl font-bold text-gray-800">Accompagnement et Respect</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Depuis plusieurs générations, nous accompagnons les familles avec discrétion et bienveillance dans ces moments difficiles.
        </p>

        {/* Bouton pour changer de localisation */}
        <div className="mt-6">
          <button
            onClick={() => setSelectedLocationIndex((prev) => (prev === 0 ? 1 : 0))}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Passer à {locations[selectedLocationIndex === 0 ? 1 : 0].name}
          </button>
        </div>

        {/* Image qui change en fonction de la localisation */}
        <div className="mt-10">
          <Image 
            src={locations[selectedLocationIndex].image} 
            alt={`Pompes Funèbres Lesage-Lelièvre - ${locations[selectedLocationIndex].name}`} 
            width={800} 
            height={400} 
            className="mx-auto rounded-lg shadow-lg transition-opacity duration-500"
          />
        </div>

        {/* Carte MapBox avec la localisation actuelle */}
        <div className="mt-10">
          <MapBox selectedLocationIndex={selectedLocationIndex} />
        </div>

        <div className="mt-10 flex justify-center space-x-6">
          <a href="/obituaries" className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
            Voir les avis obsèques
          </a>
          <a href="/contact" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-500">
            Nous contacter
          </a>
        </div>
      </main>
    </div>
  );
}
