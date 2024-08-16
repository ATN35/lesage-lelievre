'use client';

import { useEffect, useState } from 'react';

export default function DeathNotices() {
  const [deces, setDeces] = useState([]);

  useEffect(() => {
    fetch('/api/deces')
      .then(response => response.json())
      .then(data => setDeces(data))
      .catch(error => console.error('Erreur lors de la récupération des avis de décès:', error));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-10">Avis de Décès</h1>
      <ul>
        {deces.map((avis, index) => (
          <li key={index}>
            <p>{avis.nom_defunt} - {avis.date_deces}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
