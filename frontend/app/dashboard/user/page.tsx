"use client";

import { useEffect, useState } from "react";

type Reservation = {
  id: string;
  productName: string;
  status: string;
};

export default function UserDashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetch("/api/reservations/user")
      .then((res) => res.json())
      .then((data: Reservation[]) => setReservations(data))
      .catch((error) => console.error("Erreur chargement des réservations:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Mon tableau de bord</h1>
      <h2 className="text-xl mt-4">Mes réservations</h2>
      <ul>
        {reservations.length > 0 ? (
          reservations.map((res) => (
            <li key={res.id} className="border p-2 my-2">
              {res.productName} - {res.status}
            </li>
          ))
        ) : (
          <p className="text-gray-500">Aucune réservation trouvée.</p>
        )}
      </ul>
    </div>
  );
}
