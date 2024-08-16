import { useEffect, useRef } from 'react';

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 48.05, lng: -1.2 },
        zoom: 10,
      });

      new google.maps.Marker({
        position: { lat: 47.9427, lng: -1.2241 },
        map,
        title: "Chambre Funéraire - La Guerche-de-Bretagne",
      });

      new google.maps.Marker({
        position: { lat: 48.0691, lng: -1.1499 },
        map,
        title: "Chambre Funéraire - Argentré-du-Plessis",
      });
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  }, []);

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
};

export default Map;
