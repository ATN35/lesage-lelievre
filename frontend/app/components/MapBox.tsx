"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const LOCATIONS = [
  {
    id: 1,
    name: "Chambre Funéraire - La Guerche de Bretagne",
    longitude: -1.2201,
    latitude: 47.9526,
  },
  {
    id: 2,
    name: "Chambre Funéraire - Argentré-du-Plessis",
    longitude: -1.1475,
    latitude: 48.0689,
  },
];

export default function MapBox({ selectedLocationIndex }: { selectedLocationIndex: number }) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [LOCATIONS[selectedLocationIndex].longitude, LOCATIONS[selectedLocationIndex].latitude],
        zoom: 12,
      });

      LOCATIONS.forEach((location) => {
        new mapboxgl.Marker()
          .setLngLat([location.longitude, location.latitude])
          .setPopup(new mapboxgl.Popup().setText(location.name))
          .addTo(mapRef.current as mapboxgl.Map);
      });
    } else {
      mapRef.current.flyTo({
        center: [LOCATIONS[selectedLocationIndex].longitude, LOCATIONS[selectedLocationIndex].latitude],
        zoom: 12,
        essential: true,
      });
    }
  }, [selectedLocationIndex]);

  return <div ref={mapContainerRef} className="w-full h-96" />;
}
