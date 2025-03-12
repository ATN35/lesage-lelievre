"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import MapBox from "./components/MapBox";
import Link from "next/link";

export default function Home() {
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 📌 Images du carrousel pour chaque localisation
  const locations = [
    {
      name: "La Guerche de Bretagne",
      images: [
        "/images/chambre_funeraire_lesage-lelievre_guerche",
        "/images/sarl-lesage-lelievre-img013bis-791w.jpg",
        "/images/sarl-lesage-lelievre-img062-1920w.jpg",
      ],
    },
    {
      name: "Argentré-du-Plessis",
      images: [
        "/images/chambre_funeraire_lesage-lelievre_argentre.jpg",
        "/images/sarl-lesage-lelievre-img021-1920w.jpg",
        "/images/sarl-lesage-lelievre-img063-1920w.jpg",
      ],
    },
  ];

  // 📌 Changer automatiquement d'image toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto text-center py-16 px-6">
        <h1 className="text-4xl font-bold text-gray-800">Accompagnement et Respect</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Depuis plusieurs générations, nous accompagnons les familles avec discrétion et bienveillance dans ces moments difficiles.
        </p>

        {/* 📌 Bouton pour changer de localisation */}
        <div className="mt-6">
          <button
            onClick={() => setSelectedLocationIndex((prev) => (prev === 0 ? 1 : 0))}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
          >
            Passer à {locations[selectedLocationIndex === 0 ? 1 : 0].name}
          </button>
        </div>

        {/* 📌 Carrousel d'images */}
        <div className="mt-10 relative w-full max-w-2xl mx-auto">
          <button
            onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1))}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full hover:bg-gray-600 transition cursor-pointer"
            aria-label="Image précédente"
          >
            ◀
          </button>

          <Image
            src={locations[selectedLocationIndex].images[currentImageIndex]}
            alt={`Pompes Funèbres Lesage-Lelièvre - ${locations[selectedLocationIndex].name}`}
            width={800}
            height={400}
            className="rounded-lg shadow-lg transition-opacity duration-500 mx-auto"
          />

          <button
            onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1))}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full hover:bg-gray-600 transition cursor-pointer"
            aria-label="Image suivante"
          >
            ▶
          </button>
        </div>

        {/* 📌 Icônes et valeurs */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
          <div className="flex flex-col items-center">
            <Image src="/images/picto-0003-132w.webp" width={80} height={80} alt="Entreprise familiale" />
            <p className="text-gray-700 mt-2 font-semibold">Entreprise familiale depuis 2002</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/images/picto-0002-132w.webp" width={80} height={80} alt="Intervention funéraire" />
            <p className="text-gray-700 mt-2 font-semibold">Intervention funéraire 7j/7</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/images/picto-0001-132w.webp" width={80} height={80} alt="Disponibilité" />
            <p className="text-gray-700 mt-2 font-semibold">Disponibilité, écoute et discrétion</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/images/picto-0000-132w.webp" width={80} height={80} alt="Grand choix d’articles funéraires" />
            <p className="text-gray-700 mt-2 font-semibold">Grand choix d’articles funéraires</p>
          </div>
        </div>

        {/* 📌 Carte MapBox */}
        <div className="mt-12">
          <MapBox selectedLocationIndex={selectedLocationIndex} />
        </div>

        {/* 📌 Boutons d'actions */}
        <div className="mt-10 flex justify-center space-x-6">
        <Link href="/contact/location" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
            Nos agences
          </Link>
          <Link href="/obituaries" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
            Voir les avis obsèques
          </Link>
        <Link href="/contact" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
            Nous contacter
          </Link>
        </div>
      </main>
    </div>
  );
}
