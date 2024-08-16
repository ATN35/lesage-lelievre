import { useEffect, useState } from 'react';

const AvisGoogle = () => {
  const [avis, setAvis] = useState([]);

  useEffect(() => {
    const fetchAvis = async () => {
      const response = await fetch('/api/google-reviews');  // Assurez-vous d'avoir cette API
      const data = await response.json();
      setAvis(data.filter(review => review.note >= 4));
    };
    fetchAvis();
  }, []);

  return (
    <div className="carousel">
      {avis.map((review, index) => (
        <div key={index} className="carousel-item">
          <p>{review.contenu}</p>
          <p>{'★'.repeat(review.note)}</p>
        </div>
      ))}
    </div>
  );
};

export default AvisGoogle;
