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

const createIcon = (emoji, size = 24) =>
  divIcon({
    html: `
      <div style="
        font-size:${size}px;
        display:flex;
        align-items:center;
        justify-content:center;
        width:${size + 10}px;
        height:${size + 10}px;
        border-radius:50%;
        background:white;
        box-shadow:0 2px 8px rgba(0,0,0,.25);
      ">
        ${emoji}
      </div>
    `,
    className: "",
    iconSize: [size + 10, size + 10],
  });

const nodeIcon = createIcon("📍", 18);
const ambulanceIcon = createIcon("🚑", 24);
const policeIcon = createIcon("🚓", 24);
const fireIcon = createIcon("🚒", 24);
const incidentIcon = createIcon("🚨", 26);

const Legend = () => (
  <div
    style={{
      position: "absolute",
      bottom: 20,
      right: 20,
      zIndex: 1000,
    }}
    className="rounded-xl border bg-white p-4 shadow-lg"
  >
    <h3 className="mb-3 text-sm font-bold text-slate-800">
      Map Legend
    </h3>
    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-2">
        <span>🚨</span>
        <span>Incident</span>
      </div>
      <div className="flex items-center gap-2">
        <span>🚑</span>
        <span>Ambulance</span>
      </div>
      <div className="flex items-center gap-2">
        <span>🚓</span>
        <span>Police</span>
      </div>
      <div className="flex items-center gap-2">
        <span>🚒</span>
        <span>Fire Brigade</span>
      </div>
      <div className="flex items-center gap-2">
        <span>📍</span>
        <span>City Node</span>
      </div>
    </div>
  </div>
);

const CityMap = ({
  units = [],
  incidents = [],
  route = [],
  showNodes = true,
}) => {

  const routeCoordinates = useMemo(() => {
    if (!route.length) return [];
    return route
      .map((nodeId) => {
        const node = cityGraph.nodes[nodeId];
        if (!node) return null;
        return [
          node.lat,
          node.lng,
        ];
      })
      .filter(Boolean);
  }, [route]);

    return (
    <div className="relative">
      <MapContainer
        center={[28.5706, 77.3210]}
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
            <Marker
              key={nodeId}
              icon={nodeIcon}
              position={[node.lat, node.lng]}
            >
              <Popup>
                <div className="min-w-[150px]">
                  <h3 className="font-bold text-slate-800">
                    {node.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Node {nodeId}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

        {units.map((unit) => {
          let icon = ambulanceIcon;
          if (unit.unitType === "POLICE") {
            icon = policeIcon;
          }
          if (unit.unitType === "FIRE_BRIGADE") {
            icon = fireIcon;
          }
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
                <div className="min-w-[180px]">
                  <h3 className="font-bold text-slate-900">
                    {unit.unitName}
                  </h3>
                  <p>
                    {unit.unitType}
                  </p>
                  <p>
                    Status: <strong>{unit.status}</strong>
                  </p>
                  <p>
                    {unit.availability
                      ? "🟢 Available"
                      : "🔴 Busy"}
                  </p>
                  <p>
                    📍 {unit.currentLocation.areaName}
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
                <h3 className="font-bold text-red-600">
                  🚨 {incident.title}
                </h3>
                <p>
                  {incident.type}
                </p>
                <p>
                  Status: <strong>{incident.status}</strong>
                </p>
                <p>
                  Severity: <strong>{incident.severity}</strong>
                </p>
                <p>
                  📍 {incident.location.areaName}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {routeCoordinates.length > 1 && (
          <Polyline
            positions={routeCoordinates}
            pathOptions={{
              color: "#2563eb",
              weight: 7,
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