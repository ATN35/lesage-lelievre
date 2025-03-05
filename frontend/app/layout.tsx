import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";  // ✅ Importation de la Navbar
import Footer from "./components/Footer";  // ✅ Importation du Footer

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lesage-Lelièvre",
  description: "Pompes funèbres Lesage-Lelièvre, accompagnement et respect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <Navbar /> {/* ✅ La Navbar reste visible sur tout le site */}
        <main className="pt-16">{children}</main> {/* ✅ Ajout de padding-top pour éviter que la navbar cache le contenu */}
        <Footer /> {/* ✅ Footer toujours présent */}
      </body>
    </html>
  );
}
