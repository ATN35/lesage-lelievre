"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
};

type Reservation = {
  id: string;
  productName: string;
  status: string;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [newProduct, setNewProduct] = useState("");
  const [, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");

    if (!storedRole) {
      router.push("/auth/login");
      return;
    }

    if (storedRole !== "admin") {
      router.replace("/dashboard/user");
      return;
    }

    setRole(storedRole);

    fetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch((error) => console.error("Erreur chargement des produits:", error));

    fetch("/api/reservations")
      .then((res) => res.json())
      .then((data: Reservation[]) => setReservations(data))
      .catch((error) => console.error("Erreur chargement des réservations:", error));
  }, []);

  const addProduct = async () => {
    if (!newProduct) return;

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newProduct }),
      });

      const data = await res.json();
      setProducts([...products, data]);
      setNewProduct("");
    } catch (error) {
      console.error("Erreur ajout produit:", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erreur suppression produit:", error);
    }
  };

  const validateReservation = async (id: string) => {
    try {
      await fetch(`/api/reservations/${id}/validate`, { method: "POST" });
      setReservations(
        reservations.map((r) =>
          r.id === id ? { ...r, status: "Validée" } : r
        )
      );
    } catch (error) {
      console.error("Erreur validation réservation:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Tableau de bord Admin</h1>

      <h2 className="text-xl mt-4">Gestion des Produits</h2>
      <div className="flex">
        <input
          type="text"
          placeholder="Nom du produit"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          className="border p-2"
        />
        <button onClick={addProduct} className="bg-green-600 text-white px-4 py-2">
          Ajouter
        </button>
      </div>
      <ul>
        {products.map((p) => (
          <li key={p.id} className="border p-2 flex justify-between items-center">
            {p.name}
            <button onClick={() => deleteProduct(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-xl mt-6">Gestion des Réservations</h2>
      <ul>
        {reservations.map((r) => (
          <li key={r.id} className="border p-2 flex justify-between items-center">
            {r.productName} - {r.status}
            <button onClick={() => validateReservation(r.id)} className="bg-blue-500 text-white px-2 py-1 rounded">
              Valider
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
