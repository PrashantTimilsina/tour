"use client";

import { useEffect, useRef } from "react";
import L, { LatLngExpression, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const DefaultIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type MapProps = {
  latitude: number;
  longitude: number;
  name?: string;
  location?: string;
};

export default function Map({ latitude, longitude, name, location }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const center: LatLngExpression = [latitude, longitude];

    const map = L.map(mapRef.current).setView(center, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(center, { icon: DefaultIcon })
      .addTo(map)
      .bindPopup(`${name}, ${location}`)
      .openPopup();

    return () => {
      map.remove();
    };
  }, [latitude, longitude, location, name]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
}
