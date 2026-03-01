import { useEffect, useRef } from "react";

const COMPANY_LAT = 35.2685;
const COMPANY_LNG = -81.1021;
const SERVICE_RADIUS_MILES = 40;

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import Leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      // Fix default marker icon paths broken by bundlers
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [COMPANY_LAT, COMPANY_LNG],
        zoom: 9,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      mapInstanceRef.current = map;

      // Dark tile layer that matches the site aesthetic
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      // Custom yellow pin marker
      const markerIcon = L.divIcon({
        className: "",
        html: `
          <div style="
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #facc15, #d97706);
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid #000;
            box-shadow: 0 2px 8px rgba(251,191,36,0.5);
          ">
            <div style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(45deg);
              width: 10px;
              height: 10px;
              background: #000;
              border-radius: 50%;
            "></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -36],
      });

      // Add marker with popup
      L.marker([COMPANY_LAT, COMPANY_LNG], { icon: markerIcon })
        .addTo(map)
        .bindPopup(`
          <div style="
            font-family: sans-serif;
            padding: 6px 4px;
            background: #111827;
            border-radius: 6px;
            min-width: 160px;
          ">
            <strong style="color: #facc15; font-size: 13px;">C&C Construction & Electrical</strong><br/>
            <span style="color: #9ca3af; font-size: 12px; line-height: 1.6;">
              510 West 1st Street<br/>Lowell, NC 28098
            </span>
          </div>
        `, {
          className: "dark-popup",
        })
        .openPopup();

      // Service area circle (~40 mile radius)
      const radiusMeters = SERVICE_RADIUS_MILES * 1609.34;
      L.circle([COMPANY_LAT, COMPANY_LNG], {
        radius: radiusMeters,
        color: "#facc15",
        fillColor: "#facc15",
        fillOpacity: 0.08,
        weight: 2,
        dashArray: "6, 6",
      }).addTo(map);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <style>{`
        .dark-popup .leaflet-popup-content-wrapper {
          background: #111827;
          border: 1px solid rgba(250, 204, 21, 0.3);
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
          padding: 0;
        }
        .dark-popup .leaflet-popup-tip {
          background: #111827;
        }
        .dark-popup .leaflet-popup-content {
          margin: 10px 14px;
        }
      `}</style>
      <div
        ref={mapRef}
        className="w-full h-full min-h-[200px] rounded-lg"
        style={{ background: "#1a1a2e" }}
      />
    </>
  );
}
