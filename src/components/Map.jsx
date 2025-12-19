import React, { useEffect } from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Configuration des icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});


export default function Map({ mapId, latitude, longitude, name }) {
     useEffect(() => {
          // add se balise css de leaflet
            const link = document.createElement("link");
            link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
            link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
            link.rel = "stylesheet";
            link.crossOrigin = "";
            document.body.appendChild(link);
    
            return () => {
                document.body.removeChild(link);
            };
        }, []);
    
      useEffect(() => {
        if (!latitude || !longitude) return;
    
         if (typeof window !== "undefined") {
          // Crée la carte seulement si elle n’existe pas déjà
          const map = L.map(mapId).setView([latitude, longitude], 15);
    
          // Ajoute les tuiles OpenStreetMap
          L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);
    
          // Ajoute un marqueur avec popup
          L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(name)
            .openPopup();
    
          // Nettoyage à la suppression du composant
          return () => {
            map.remove();
          };
        }
      }, [mapId, latitude, longitude, name]);
  return (
    <>
      <div
        id={mapId}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </>
  )
}
