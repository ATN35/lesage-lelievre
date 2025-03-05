"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

export default function MapBox() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-1.18, 47.99], // Centre de la carte
      zoom: 10,
    });

    // Ajouter les marqueurs
    const locations = [
      { id: 1, name: "Chambre Funéraire - La Guerche de Bretagne", lng: -1.2201, lat: 47.9526 },
      { id: 2, name: "Chambre Funéraire - Argentré-du-Plessis", lng: -1.1475, lat: 48.0689 },
    ];

    locations.forEach((location) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(location.name);
      new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, []);

  return <div ref={mapContainer} className="w-full h-96" />;
}
