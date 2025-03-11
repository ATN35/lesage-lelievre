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

  const handleMouseOver = (menu: string) => {
    clearTimeout(timeoutId);
    setDropdown(menu);
  };

  const handleMouseOut = () => {
    timeoutId = setTimeout(() => {
      setDropdown(null);
    }, 200);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/auth/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">

        <Link href="/" className="text-2xl font-bold cursor-pointer">
          Lesage-Lelièvre
        </Link>

        <button
          className="md:hidden text-2xl focus:outline-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        <ul
          className={`md:flex md:space-x-6 absolute md:static bg-gray-900 md:bg-transparent top-16 left-0 w-full md:w-auto flex-col md:flex-row items-start md:items-center transition-all duration-300 ease-in-out ${
            menuOpen ? "flex" : "hidden"
          } md:flex`}
        >
          <li className="relative w-full md:w-auto" onMouseOver={() => handleMouseOver("obituaries")} onMouseOut={handleMouseOut}>
            <button className="hover:text-gray-400 p-2 w-full md:w-auto text-left md:text-center cursor-pointer">
              Avis obsèques ▾
            </button>
            {dropdown === "obituaries" && (
              <ul className="absolute left-0 mt-2 w-48 bg-gray-800 text-white shadow-md rounded-md z-50">
                <li><Link href="/obituaries" className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Tous les avis</Link></li>
                <li><Link href="/obituaries/new" className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Publier un avis</Link></li>
              </ul>
            )}
          </li>

          <li className="relative w-full md:w-auto" onMouseOver={() => handleMouseOver("products")} onMouseOut={handleMouseOut}>
            <button className="hover:text-gray-400 p-2 w-full md:w-auto text-left md:text-center cursor-pointer">
              Nos Produits ▾
            </button>
            {dropdown === "products" && (
              <ul className="absolute left-0 mt-2 w-48 bg-gray-800 text-white shadow-md rounded-md z-50">
                <li><Link href="/products/coffins" className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Cercueils</Link></li>
                <li><Link href="/products/urns" className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Urnes</Link></li>
                <li><Link href="/products/flowers" className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Fleurs</Link></li>
                <li><Link href="/products/plaques" className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Plaques Funéraires</Link></li>
              </ul>
            )}
          </li>

          <li className="relative w-full md:w-auto" onMouseOver={() => handleMouseOver("contact")} onMouseOut={handleMouseOut}>
            <button className="hover:text-gray-400 p-2 w-full md:w-auto text-left md:text-center cursor-pointer">
              Contact ▾
            </button>
            {dropdown === "contact" && (
              <ul className="absolute left-0 mt-2 w-48 bg-gray-800 text-white shadow-md rounded-md z-50">
                <li><Link href="/contact" className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Nous contacter</Link></li>
                <li><Link href="/contact/location" className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Nos agences</Link></li>
              </ul>
            )}
          </li>

          {!isLoggedIn ? (
            <li className="relative w-full md:w-auto" onMouseOver={() => handleMouseOver("auth")} onMouseOut={handleMouseOut}>
              <button className="hover:text-gray-400 p-2 w-full md:w-auto text-left md:text-center cursor-pointer">
                Compte ▾
              </button>
              {dropdown === "auth" && (
                <ul className="absolute left-0 mt-2 w-48 bg-gray-800 text-white shadow-md rounded-md z-50">
                  <li><Link href="/auth/register" className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Inscription</Link></li>
                  <li><Link href="/auth/login" className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Se connecter</Link></li>
                </ul>
              )}
            </li>
          ) : (
            <li className="relative w-full md:w-auto" onMouseOver={() => handleMouseOver("profile")} onMouseOut={handleMouseOut}>
              <button className="hover:text-gray-400 p-2 w-full md:w-auto text-left md:text-center cursor-pointer">
                Mon Compte ▾
              </button>
              {dropdown === "profile" && (
                <ul className="absolute left-0 mt-2 w-48 bg-gray-800 text-white shadow-md rounded-md z-50">
                  <li><Link href="/dashboard/user" className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Tableau de Bord</Link></li>
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
