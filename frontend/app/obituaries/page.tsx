"use client";

import { useEffect, useState } from "react";

type Obituary = {
  id: string;
  deceased: string;
  date: string;
  message: string;
  condolences: { id: string; message: string; author: string }[];
};

export default function Obituaries() {
  const [obituaries, setObituaries] = useState<Obituary[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/obituaries")
      .then((res) => res.json())
      .then((data) => setObituaries(data));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Avis obsèques</h1>
      {obituaries.map((obituary) => (
        <div key={obituary.id} className="bg-gray-100 p-4 my-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold">{obituary.deceased}</h2>
          <p className="text-gray-600">{new Date(obituary.date).toLocaleDateString()}</p>
          <p className="mt-2">{obituary.message}</p>

          <h3 className="text-lg mt-4">Condoléances :</h3>
          <ul className="list-disc ml-6">
            {obituary.condolences.map((condolence) => (
              <li key={condolence.id}>{condolence.author} : {condolence.message}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
