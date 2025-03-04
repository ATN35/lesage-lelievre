import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="container mx-auto text-center py-16 px-6">
        <h1 className="text-4xl font-bold text-gray-800">Accompagnement et Respect</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Depuis plusieurs générations, nous accompagnons les familles avec discrétion et bienveillance dans ces moments difficiles.
        </p>
        
        <div className="mt-10">
          <Image 
            src="/funeral_home.jpg" 
            alt="Pompes Funèbres Lesage-Lelièvre" 
            width={800} 
            height={400} 
            className="mx-auto rounded-lg shadow-lg"
          />
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
      <Footer />
    </div>
  );
}
