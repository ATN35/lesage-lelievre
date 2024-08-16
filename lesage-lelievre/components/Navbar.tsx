'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isArgentreOpen, setIsArgentreOpen] = useState(false);
  const [isGuercheOpen, setIsGuercheOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleArgentre = () => {
    setIsArgentreOpen(!isArgentreOpen);
  };

  const toggleGuerche = () => {
    setIsGuercheOpen(!isGuercheOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 flex justify-between items-center px-6 py-4">
      {/* Logo à gauche */}
      <div className="text-2xl font-bold text-gray-800">
        <Link href="/" className="hover:text-gray-600">Lesage-Lelièvre</Link>
      </div>

      {/* Icônes des chambres funéraires au centre */}
      <div className="flex space-x-24">
        <div className="relative group">
          <button onClick={toggleGuerche} className="text-gray-800 hover:text-blue-600">
            🏠 La Guerche-de-Bretagne
          </button>
          {isGuercheOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 p-4 bg-white border shadow-lg text-sm w-60">
              <strong>La Guerche-de-Bretagne (Siège social)</strong>
              <p>Adresse : 42, rue d'Anjou, 35130 La Guerche-de-Bretagne</p>
              <p>Tél : La Guerche-de-Bretagne</p>
              <p>Horaires : </p>
              <p>Du lundi au vendredi de 10h à 12h et de 14h30 à 18h</p>
              <p>Le samedi de 10h à 12h (l’après-midi sur RDV)</p>
              <p>Dimanche : fermé</p>
            </div>
          )}
        </div>
        <div className="relative group">
          <button onClick={toggleArgentre} className="text-gray-800 hover:text-blue-600">
            🏠 Argentré-du-Plessis
          </button>
          {isArgentreOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 p-4 bg-white border shadow-lg text-sm w-60">
              <strong>Argentré-du-Plessis</strong>
              <p>Adresse : 36, boulevard des Saulniers, 35370 Argentré-du-Plessis</p>
              <p>Tél : Argentré-du-Plessis</p>
              <p>Horaires : </p>
              <p>Du lundi au vendredi de 10h à 12h et de 15h à 18h</p>
              <p>Le samedi sur RDV</p>
              <p>Dimanche : fermé</p>
            </div>
          )}
        </div>
      </div>

      {/* Menu hamburger à droite */}
      <div>
        <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
          {isMenuOpen ? '✖' : '☰'}
        </button>
        {isMenuOpen && (
          <div className="absolute top-16 right-0 w-64 bg-black text-white shadow-lg p-6 flex flex-col space-y-4"> {/* Ajustement de la largeur et alignement à droite */}
            <Link href="/" className="hover:text-gray-300 text-right">Accueil</Link>
            <Link href="/death-notices" className="hover:text-gray-300 text-right">Avis de Décès</Link>
            <Link href="/products" className="hover:text-gray-300 text-right">Articles Funéraires</Link>
            <Link href="/login" className="hover:text-gray-300 text-right">Connexion</Link>
            <Link href="/signup" className="hover:text-gray-300 text-right">Inscription</Link>
            <Link href="/profile" className="hover:text-gray-300 text-right">Mon Profil</Link>
            <Link href="/contact" className="hover:text-gray-300 text-right">Contact</Link>
            <Link href="/about" className="hover:text-gray-300 text-right">À propos</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
