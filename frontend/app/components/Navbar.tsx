"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Lesage-Lelièvre
        </Link>

        {/* Bouton du menu hamburger (affiché en mobile) */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Menu de navigation */}
        <ul className={`md:flex space-x-6 md:space-x-6 absolute md:static bg-gray-900 md:bg-transparent top-16 left-0 w-full md:w-auto flex-col md:flex-row items-center md:items-center transition-all duration-300 ease-in-out ${
          menuOpen ? "flex" : "hidden"
        } md:flex`}>
          <li><Link href="/obituaries" className="hover:text-gray-400 p-2">Avis d'obsèques</Link></li>
          <li><Link href="/products" className="hover:text-gray-400 p-2">Nos Produits</Link></li>
          <li><Link href="/contact" className="hover:text-gray-400 p-2">Contact</Link></li>

          {isLoggedIn ? (
            <li><Link href="/dashboard/user" className="hover:text-gray-400 p-2">Mon Compte</Link></li>
          ) : (
            <>
              <li><Link href="/auth/register" className="hover:text-gray-400 p-2">S'inscrire</Link></li>
              <li><Link href="/auth/login" className="hover:text-gray-400 p-2">Se connecter</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
