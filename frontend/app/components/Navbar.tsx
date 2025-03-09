"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const router = useRouter();
  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Fonction pour afficher le sous-menu immédiatement
  const handleMouseOver = (menu: string) => {
    clearTimeout(timeoutId);
    setDropdown(menu);
  };

  // ✅ Fonction pour masquer le sous-menu après un délai
  const handleMouseOut = () => {
    timeoutId = setTimeout(() => {
      setDropdown(null);
    }, 200);
  };

  // ✅ Fonction pour se déconnecter
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/auth/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* ✅ Logo */}
        <Link href="/" className="text-2xl font-bold">
          Lesage-Lelièvre
        </Link>

        {/* ✅ Bouton du menu hamburger (affiché en mobile) */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* ✅ Menu principal */}
        <ul
          className={`md:flex md:space-x-6 absolute md:static bg-gray-900 md:bg-transparent top-16 left-0 w-full md:w-auto flex-col md:flex-row items-start md:items-center transition-all duration-300 ease-in-out ${
            menuOpen ? "flex" : "hidden"
          } md:flex`}
        >
          {/* ✅ Avis obsèques */}
          <li className="relative w-full md:w-auto" onMouseOver={() => handleMouseOver("obituaries")} onMouseOut={handleMouseOut}>
            <button className="hover:text-gray-400 p-2 w-full md:w-auto text-left md:text-center">
              Avis obsèques ▾
            </button>
            {dropdown === "obituaries" && (
              <ul className="absolute left-0 mt-2 w-48 bg-gray-800 text-white shadow-md rounded-md z-50">
                <li><Link href="/obituaries" className="block px-4 py-2 hover:bg-gray-700">Tous les avis</Link></li>
                <li><Link href="/obituaries/new" className="block px-4 py-2 hover:bg-gray-700">Publier un avis</Link></li>
              </ul>
            )}
          </li>

          {/* ✅ Nos Produits */}
          <li className="relative w-full md:w-auto" onMouseOver={() => handleMouseOver("products")} onMouseOut={handleMouseOut}>
            <button className="hover:text-gray-400 p-2 w-full md:w-auto text-left md:text-center">
              Nos Produits ▾
            </button>
            {dropdown === "products" && (
              <ul className="absolute left-0 mt-2 w-48 bg-gray-800 text-white shadow-md rounded-md z-50">
                <li><Link href="/products/coffins" className="block px-4 py-2 hover:bg-gray-700">Cercueils</Link></li>
                <li><Link href="/products/urns" className="block px-4 py-2 hover:bg-gray-700">Urnes</Link></li>
                <li><Link href="/products/flowers" className="block px-4 py-2 hover:bg-gray-700">Fleurs</Link></li>
                <li><Link href="/products/plaques" className="block px-4 py-2 hover:bg-gray-700">Plaques Funéraires</Link></li>
              </ul>
            )}
          </li>

          {/* ✅ Contact */}
          <li className="relative w-full md:w-auto" onMouseOver={() => handleMouseOver("contact")} onMouseOut={handleMouseOut}>
            <button className="hover:text-gray-400 p-2 w-full md:w-auto text-left md:text-center">
              Contact ▾
            </button>
            {dropdown === "contact" && (
              <ul className="absolute left-0 mt-2 w-48 bg-gray-800 text-white shadow-md rounded-md z-50">
                <li><Link href="/contact" className="block px-4 py-2 hover:bg-gray-700">Nous contacter</Link></li>
                <li><Link href="/contact/location" className="block px-4 py-2 hover:bg-gray-700">Nos agences</Link></li>
              </ul>
            )}
          </li>

          {/* ✅ Inscription / Connexion / Mon Compte */}
          {!isLoggedIn ? (
            <li className="relative w-full md:w-auto" onMouseOver={() => handleMouseOver("auth")} onMouseOut={handleMouseOut}>
              <button className="hover:text-gray-400 p-2 w-full md:w-auto text-left md:text-center">
                Compte ▾
              </button>
              {dropdown === "auth" && (
                <ul className="absolute left-0 mt-2 w-48 bg-gray-800 text-white shadow-md rounded-md z-50">
                  <li><Link href="/auth/register" className="block px-4 py-2 hover:bg-gray-700">Inscription</Link></li>
                  <li><Link href="/auth/login" className="block px-4 py-2 hover:bg-gray-700">Se connecter</Link></li>
                </ul>
              )}
            </li>
          ) : (
            <li className="relative w-full md:w-auto" onMouseOver={() => handleMouseOver("profile")} onMouseOut={handleMouseOut}>
              <button className="hover:text-gray-400 p-2 w-full md:w-auto text-left md:text-center">
                Mon Compte ▾
              </button>
              {dropdown === "profile" && (
                <ul className="absolute left-0 mt-2 w-48 bg-gray-800 text-white shadow-md rounded-md z-50">
                  <li><Link href="/dashboard/user" className="block px-4 py-2 hover:bg-gray-700">Tableau de Bord</Link></li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      Déconnexion
                    </button>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
