import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import L from "leaflet";
import { divIcon } from "leaflet";

import { useMemo } from "react";

import cityGraph from "../../data/cityGraph";

const nodeIcon = divIcon({

  html: `<div style="
    font-size:18px;
  ">
    📍
  </div>`,

  className: "",

  iconSize: [20, 20],

});

const ambulanceIcon = divIcon({

  html: `

    <div style="font-size:24px;">

      🚑

    </div>

  `,

  className: "",

  iconSize: [24,24],

});

const policeIcon = divIcon({

  html: `

    <div style="font-size:24px;">

      🚓

    </div>

  `,

  className: "",

  iconSize: [24,24],

});

const fireIcon = divIcon({

  html: `

    <div style="font-size:24px;">

      🚒

    </div>

  `,

  className: "",

  iconSize: [24,24],

});

const incidentIcon = divIcon({

  html: `

    <div style="font-size:26px;">

      🚨

    </div>

  `,

  className: "",

  iconSize: [26,26],

});

const CityMap = ({

    units = [],

    incidents = [],

    route = [],

    showNodes = true,

  }) => {

    const routeCoordinates = useMemo(() => {

      if (!route || route.length === 0) {

        return [];

      }

      return route
        .map((nodeId) => {

          const node = cityGraph.nodes[nodeId];

          if (!node) {

            return null;

          }

          return [

            node.lat,

            node.lng,

          ];

        })

        .filter(Boolean);

    }, [route]);

  return (

    <MapContainer

      center={[28.5706, 77.3210]}

      zoom={14}

      style={{

        height: "600px",

        width: "100%",

        borderRadius: "12px",

      }}

    >

      <TileLayer

        attribution='&copy; OpenStreetMap contributors'

        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

      />

      {

        showNodes &&

        Object.entries(cityGraph.nodes).map(

          ([nodeId, node]) => (

            <Marker

              icon={nodeIcon}

              key={nodeId}

              position={[

                node.lat,

                node.lng,

              ]}

            >

              <Popup>

                <h3>

                  {node.name}

                </h3>

                <p>

                  {nodeId}

                </p>

              </Popup>

            </Marker>

          )

        )

      }

      {

        units.map((unit) => {

          let icon = ambulanceIcon;

          if (

            unit.unitType ===

            "POLICE"

          ) {

            icon = policeIcon;

          }

          if (

            unit.unitType ===

            "FIRE_BRIGADE"

          ) {

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

                <strong>

                  {unit.unitName}

                </strong>

                <br />

                {unit.unitType}

              </Popup>

            </Marker>

          );

        })

      }    

      {

        incidents.map((incident) => (

          <Marker

            key={incident._id}

            icon={incidentIcon}

            position={[

              incident.location.coordinates.lat,

              incident.location.coordinates.lng,

            ]}

          >

            <Popup>

              <strong>

                {incident.title}

              </strong>

              <br />

              {incident.location.areaName}

            </Popup>

          </Marker>

        ))

      }  

      {

        routeCoordinates.length > 1 && (

          <Polyline

            positions={routeCoordinates}

            pathOptions={{

              color: "blue",

              weight: 5,

            }}

          />

        )

      }

    </MapContainer>

  );

};

export default CityMap;