import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import { divIcon } from "leaflet";
import { useMemo } from "react";
import cityGraph from "../../data/cityGraph";

// Simple, hand-drawn glyphs (not copied from any icon library) so map
// markers render as clean vector shapes instead of emoji.
const GLYPHS = {
  pin: '<circle cx="12" cy="12" r="4.5" />',
  medical:
    '<path d="M11 5.5h2v5h5v2h-5v5h-2v-5H6v-2h5z" />',
  shield:
    '<path d="M12 2.5 19 5.5v6c0 5-3 8.7-7 10-4-1.3-7-5-7-10v-6z" />',
  flame:
    '<path d="M12 2c1.2 3 -1.6 4.2 -1.6 6.8a3.6 3.6 0 1 0 7.2 0c0 -1.6 -0.8 -2.6 -0.8 -2.6s0.7 3.4 -1.6 3.4c-1.3 0 -1.7 -1.3 -0.9 -2.6 0 0 -2.6 1.7 -1.9 4.4a4.6 4.6 0 1 1 -9 -1.1c0 -3.5 2.6 -4.3 3.4 -5.9C7.6 3.1 8.7 2 12 2z" />',
  warning:
    '<path d="M12 3 21.5 20H2.5Z" /><rect x="11" y="9" width="2" height="5.5" fill="#fff"/><circle cx="12" cy="17" r="1.1" fill="#fff"/>',
};

const buildMarkerHtml = ({ bg, glyph, size, ring = "white" }) => `
  <div style="
    width:${size}px;
    height:${size}px;
    border-radius:9999px;
    background:${bg};
    display:flex;
    align-items:center;
    justify-content:center;
    box-shadow:0 3px 10px rgba(15,23,42,0.35);
    border:2.5px solid ${ring};
  ">
    <svg width="${Math.round(size * 0.52)}" height="${Math.round(size * 0.52)}" viewBox="0 0 24 24" fill="white">
      ${GLYPHS[glyph]}
    </svg>
  </div>
`;

const createIcon = (html, size) =>
  divIcon({
    html,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

const nodeIcon = createIcon(
  buildMarkerHtml({ bg: "#64748b", glyph: "pin", size: 20, ring: "#f1f5f9" }),
  20
);
const ambulanceIcon = createIcon(
  buildMarkerHtml({ bg: "#dc2626", glyph: "medical", size: 34 }),
  34
);
const policeIcon = createIcon(
  buildMarkerHtml({ bg: "#348aa7", glyph: "shield", size: 34 }),
  34
);
const fireIcon = createIcon(
  buildMarkerHtml({ bg: "#ea580c", glyph: "flame", size: 34 }),
  34
);
const incidentIcon = createIcon(
  buildMarkerHtml({ bg: "#b91c1c", glyph: "warning", size: 36 }),
  36
);

const legendItems = [
  { glyph: "warning", bg: "#b91c1c", label: "Incident" },
  { glyph: "medical", bg: "#dc2626", label: "Ambulance" },
  { glyph: "shield", bg: "#348aa7", label: "Police" },
  { glyph: "flame", bg: "#ea580c", label: "Fire Brigade" },
  { glyph: "pin", bg: "#64748b", label: "City Node" },
];

const Legend = () => (
  <div
    style={{ position: "absolute", bottom: 16, right: 16, zIndex: 1000 }}
    className="rounded-xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur"
  >
    <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
      Map Legend
    </h3>
    <div className="space-y-2.5 text-sm text-slate-700">
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2.5">
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
            style={{ background: item.bg }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
              {/* eslint-disable-next-line react/no-danger */}
              <g dangerouslySetInnerHTML={{ __html: GLYPHS[item.glyph] }} />
            </svg>
          </span>
          {item.label}
        </div>
      ))}
    </div>
  </div>
);

const CityMap = ({ units = [], incidents = [], route = [], showNodes = true }) => {
  const routeCoordinates = useMemo(() => {
    if (!route.length) return [];
    return route
      .map((nodeId) => {
        const node = cityGraph.nodes[nodeId];
        if (!node) return null;
        return [node.lat, node.lng];
      })
      .filter(Boolean);
  }, [route]);

  return (
    <div className="relative isolate overflow-hidden rounded-[18px]">
      <MapContainer
        center={[28.5706, 77.321]}
        zoom={13}
        scrollWheelZoom={false}
        zoomControl={true}
        style={{
          height: "650px",
          width: "100%",
          borderRadius: "18px",
          border: "1px solid #e2e8f0",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showNodes &&
          Object.entries(cityGraph.nodes).map(([nodeId, node]) => (
            <Marker key={nodeId} icon={nodeIcon} position={[node.lat, node.lng]}>
              <Popup>
                <div className="min-w-[150px]">
                  <h3 className="font-bold text-slate-800">{node.name}</h3>
                  <p className="text-sm text-slate-500">Node {nodeId}</p>
                </div>
              </Popup>
            </Marker>
          ))}

        {units.map((unit) => {
          let icon = ambulanceIcon;
          if (unit.unitType === "POLICE") icon = policeIcon;
          if (unit.unitType === "FIRE_BRIGADE") icon = fireIcon;
          return (
            <Marker
              key={unit._id}
              icon={icon}
              position={[
                unit.currentLocation.coordinates.lat,
                unit.currentLocation.coordinates.lng,
              ]}
            >
              <Popup>
                <div className="min-w-[190px]">
                  <h3 className="font-bold text-slate-900">{unit.unitName}</h3>
                  <p className="text-slate-600">{unit.unitType}</p>
                  <p className="text-slate-600">
                    Status: <strong>{unit.status}</strong>
                  </p>
                  <p
                    className={`mt-1 font-semibold ${
                      unit.availability ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {unit.availability ? "Available" : "Busy"}
                  </p>
                  <p className="mt-1 text-slate-500">
                    {unit.currentLocation.areaName}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {incidents.map((incident) => (
          <Marker
            key={incident._id}
            icon={incidentIcon}
            position={[
              incident.location.coordinates.lat,
              incident.location.coordinates.lng,
            ]}
          >
            <Popup>
              <div className="min-w-[190px]">
                <h3 className="font-bold text-red-700">{incident.title}</h3>
                <p className="text-slate-600">{incident.type}</p>
                <p className="text-slate-600">
                  Status: <strong>{incident.status}</strong>
                </p>
                <p className="text-slate-600">
                  Severity: <strong>{incident.severity}</strong>
                </p>
                <p className="mt-1 text-slate-500">
                  {incident.location.areaName}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {routeCoordinates.length > 1 && (
          <Polyline
            positions={routeCoordinates}
            pathOptions={{
              color: "#348aa7",
              weight: 6,
              opacity: 0.9,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        )}
      </MapContainer>
      <Legend />
    </div>
  );
};

export default CityMap;
