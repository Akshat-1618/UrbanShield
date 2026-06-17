const cityGraph = {

  nodes: {

  N1: {
    name: "Sector 18",
    lat: 28.5700,
    lng: 77.3210,
  },

  N2: {
    name: "Sector 16",
    lat: 28.5680,
    lng: 77.3260,
  },

  N3: {
    name: "Botanical Garden",
    lat: 28.5655,
    lng: 77.3320,
  },

  N4: {
    name: "Noida City Centre",
    lat: 28.5720,
    lng: 77.3470,
  },

  N5: {
    name: "Atta Market",
    lat: 28.5725,
    lng: 77.3265,
  },

  N6: {
    name: "District Hospital",
    lat: 28.5670,
    lng: 77.3370,
  },

  N7: {
    name: "Fire Headquarters",
    lat: 28.5735,
    lng: 77.3385,
  },

  N8: {
    name: "Police Headquarters",
    lat: 28.5755,
    lng: 77.3450,
  },

  N9: {
    name: "Sector 62",
    lat: 28.6270,
    lng: 77.3640,
  },

  N10: {
    name: "Film City",
    lat: 28.5920,
    lng: 77.3175,
  },

  N11: {
    name: "Sector 137",
    lat: 28.5110,
    lng: 77.4070,
  },

  N12: {
    name: "Metro Depot",
    lat: 28.5450,
    lng: 77.3720,
  },

  N13: {
    name: "Pari Chowk",
    lat: 28.4660,
    lng: 77.5030,
  },

  N14: {
    name: "Knowledge Park",
    lat: 28.4740,
    lng: 77.5000,
  },

  N15: {
    name: "Expo Mart",
    lat: 28.4615,
    lng: 77.4970,
  },

  N16: {
    name: "Bus Terminal",
    lat: 28.5840,
    lng: 77.3120,
  },

},

  graph: {
    N1: [
      { to: "N2", distance: 2},
      { to: "N5", distance: 2},
      { to: "N6", distance: 3},
    ],

    N2: [
      { to: "N1", distance: 2},
      { to: "N3", distance: 3},
      { to: "N6", distance: 2},
      { to: "N7", distance: 4},
    ],

    N3: [
      { to: "N2", distance: 3},
      { to: "N4", distance: 4},
      { to: "N7", distance: 2},
      { to: "N8", distance: 3},
    ],

    N4: [
      { to: "N3", distance: 4},
      { to: "N8", distance: 2},
    ],

    N5: [
      { to: "N1", distance: 2},
      { to: "N6", distance: 3},
      { to: "N9", distance: 4},
      { to: "N10", distance: 3},
    ],

    N6: [
      { to: "N1", distance: 3},
      { to: "N2", distance: 2},
      { to: "N5", distance: 3},
      { to: "N7", distance: 2},
      { to: "N10", distance: 3},
      { to: "N11", distance: 5},
    ],

    N7: [
      { to: "N2", distance: 4},
      { to: "N3", distance: 2},
      { to: "N6", distance: 2},
      { to: "N8", distance: 2},
      { to: "N11", distance: 3},
    ],

    N8: [
      { to: "N3", distance: 3},
      { to: "N4", distance: 2},
      { to: "N7", distance: 2},
      { to: "N12", distance: 4},
    ],

    N9: [
      { to: "N5", distance: 4},
      { to: "N10", distance: 2},
      { to: "N13", distance: 5},
    ],

    N10: [
      { to: "N5", distance: 3},
      { to: "N6", distance: 3},
      { to: "N9", distance: 2},
      { to: "N11", distance: 2},
      { to: "N14", distance: 5},
    ],

    N11: [
      { to: "N6", distance: 5},
      { to: "N7", distance: 3},
      { to: "N10", distance: 2},
      { to: "N12", distance: 3},
      { to: "N15", distance: 4},
    ],

    N12: [
      { to: "N8", distance: 4},
      { to: "N11", distance: 3},
      { to: "N16", distance: 5},
    ],

    N13: [
      { to: "N9", distance: 5},
      { to: "N14", distance: 2},
    ],

    N14: [
      { to: "N10", distance: 5},
      { to: "N13", distance: 2},
      { to: "N15", distance: 2},
    ],

    N15: [
      { to: "N11", distance: 4},
      { to: "N14", distance: 2},
      { to: "N16", distance: 3},
    ],

    N16: [
      { to: "N12", distance: 5},
      { to: "N15", distance: 3},
    ],
  },
};

const getNodeByAreaName = (areaName) => {

  return Object.entries(cityGraph.nodes).find(
    ([, node]) => node.name === areaName
  );

};

cityGraph.getNodeByAreaName =
  getNodeByAreaName;

export default cityGraph;