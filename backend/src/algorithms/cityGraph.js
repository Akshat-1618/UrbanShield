const cityGraph = {
  // =====================================
  // SMART CITY LOCATIONS
  // =====================================

  nodes: {
    N1: {
      name: "Sector 18",
      lat: 28.5706,
      lng: 77.3210,
    },

    N2: {
      name: "Sector 16",
      lat: 28.5688,
      lng: 77.3178,
    },

    N3: {
      name: "Botanical Garden",
      lat: 28.5642,
      lng: 77.3341,
    },

    N4: {
      name: "Noida City Centre",
      lat: 28.5745,
      lng: 77.3560,
    },

    N5: {
      name: "Atta Market",
      lat: 28.5697,
      lng: 77.3252,
    },

    N6: {
      name: "District Hospital",
      lat: 28.5663,
      lng: 77.3298,
    },

    N7: {
      name: "Fire Headquarters",
      lat: 28.5735,
      lng: 77.3365,
    },

    N8: {
      name: "Police Headquarters",
      lat: 28.5760,
      lng: 77.3480,
    },

    N9: {
      name: "Sector 62",
      lat: 28.6284,
      lng: 77.3649,
    },

    N10: {
      name: "Film City",
      lat: 28.5940,
      lng: 77.3175,
    },

    N11: {
      name: "Sector 137",
      lat: 28.5092,
      lng: 77.4083,
    },

    N12: {
      name: "Metro Depot",
      lat: 28.5425,
      lng: 77.3760,
    },

    N13: {
      name: "Pari Chowk",
      lat: 28.4634,
      lng: 77.5030,
    },

    N14: {
      name: "Knowledge Park",
      lat: 28.4748,
      lng: 77.5045,
    },

    N15: {
      name: "Expo Mart",
      lat: 28.4628,
      lng: 77.5005,
    },

    N16: {
      name: "Bus Terminal",
      lat: 28.5855,
      lng: 77.3124,
    },
  },

  // =====================================
  // ROAD NETWORK (ADJACENCY LIST)
  // weight = distance * trafficMultiplier
  // =====================================

  graph: {
    N1: [
      { to: "N2", distance: 2, trafficMultiplier: 1.0 },
      { to: "N5", distance: 2, trafficMultiplier: 1.1 },
      { to: "N6", distance: 3, trafficMultiplier: 1.2 },
    ],

    N2: [
      { to: "N1", distance: 2, trafficMultiplier: 1.0 },
      { to: "N3", distance: 3, trafficMultiplier: 1.3 },
      { to: "N6", distance: 2, trafficMultiplier: 1.0 },
      { to: "N7", distance: 4, trafficMultiplier: 1.2 },
    ],

    N3: [
      { to: "N2", distance: 3, trafficMultiplier: 1.3 },
      { to: "N4", distance: 4, trafficMultiplier: 1.1 },
      { to: "N7", distance: 2, trafficMultiplier: 1.0 },
      { to: "N8", distance: 3, trafficMultiplier: 1.4 },
    ],

    N4: [
      { to: "N3", distance: 4, trafficMultiplier: 1.1 },
      { to: "N8", distance: 2, trafficMultiplier: 1.0 },
    ],

    N5: [
      { to: "N1", distance: 2, trafficMultiplier: 1.1 },
      { to: "N6", distance: 3, trafficMultiplier: 1.0 },
      { to: "N9", distance: 4, trafficMultiplier: 1.2 },
      { to: "N10", distance: 3, trafficMultiplier: 1.0 },
    ],

    N6: [
      { to: "N1", distance: 3, trafficMultiplier: 1.2 },
      { to: "N2", distance: 2, trafficMultiplier: 1.0 },
      { to: "N5", distance: 3, trafficMultiplier: 1.0 },
      { to: "N7", distance: 2, trafficMultiplier: 1.0 },
      { to: "N10", distance: 3, trafficMultiplier: 1.1 },
      { to: "N11", distance: 5, trafficMultiplier: 1.3 },
    ],

    N7: [
      { to: "N2", distance: 4, trafficMultiplier: 1.2 },
      { to: "N3", distance: 2, trafficMultiplier: 1.0 },
      { to: "N6", distance: 2, trafficMultiplier: 1.0 },
      { to: "N8", distance: 2, trafficMultiplier: 1.0 },
      { to: "N11", distance: 3, trafficMultiplier: 1.2 },
    ],

    N8: [
      { to: "N3", distance: 3, trafficMultiplier: 1.4 },
      { to: "N4", distance: 2, trafficMultiplier: 1.0 },
      { to: "N7", distance: 2, trafficMultiplier: 1.0 },
      { to: "N12", distance: 4, trafficMultiplier: 1.2 },
    ],

    N9: [
      { to: "N5", distance: 4, trafficMultiplier: 1.2 },
      { to: "N10", distance: 2, trafficMultiplier: 1.0 },
      { to: "N13", distance: 5, trafficMultiplier: 1.1 },
    ],

    N10: [
      { to: "N5", distance: 3, trafficMultiplier: 1.0 },
      { to: "N6", distance: 3, trafficMultiplier: 1.1 },
      { to: "N9", distance: 2, trafficMultiplier: 1.0 },
      { to: "N11", distance: 2, trafficMultiplier: 1.2 },
      { to: "N14", distance: 5, trafficMultiplier: 1.3 },
    ],

    N11: [
      { to: "N6", distance: 5, trafficMultiplier: 1.3 },
      { to: "N7", distance: 3, trafficMultiplier: 1.2 },
      { to: "N10", distance: 2, trafficMultiplier: 1.2 },
      { to: "N12", distance: 3, trafficMultiplier: 1.0 },
      { to: "N15", distance: 4, trafficMultiplier: 1.1 },
    ],

    N12: [
      { to: "N8", distance: 4, trafficMultiplier: 1.2 },
      { to: "N11", distance: 3, trafficMultiplier: 1.0 },
      { to: "N16", distance: 5, trafficMultiplier: 1.2 },
    ],

    N13: [
      { to: "N9", distance: 5, trafficMultiplier: 1.1 },
      { to: "N14", distance: 2, trafficMultiplier: 1.0 },
    ],

    N14: [
      { to: "N10", distance: 5, trafficMultiplier: 1.3 },
      { to: "N13", distance: 2, trafficMultiplier: 1.0 },
      { to: "N15", distance: 2, trafficMultiplier: 1.0 },
    ],

    N15: [
      { to: "N11", distance: 4, trafficMultiplier: 1.1 },
      { to: "N14", distance: 2, trafficMultiplier: 1.0 },
      { to: "N16", distance: 3, trafficMultiplier: 1.2 },
    ],

    N16: [
      { to: "N12", distance: 5, trafficMultiplier: 1.2 },
      { to: "N15", distance: 3, trafficMultiplier: 1.2 },
    ],
  },
};

module.exports = cityGraph;