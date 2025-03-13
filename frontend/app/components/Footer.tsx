import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 p-6 border-t border-gray-700 w-full mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">

        <div className="text-center md:text-left">
          <p className="text-white font-semibold">© 2025 Lesage-Lelièvre - Tous droits réservés.</p>
          <p className="text-sm mt-1">06 76 28 29 06 • contact@lesage-lelievre.fr</p>
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition cursor-pointer">
            <FaFacebook size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition cursor-pointer">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition cursor-pointer">
            <FaLinkedin size={24} />
          </a>
        </div>

        <div className="text-center mt-4 md:mt-0">
          <a 
            href="https://github.com/ATN35" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white font-semibold cursor-pointer hover:text-blue-400 transition"
          >
            Website created by Antoine Lelièvre
          </a>
        </div>

      </div>
    </footer>
  );
}
