// const {
//   emergencyQueue,
// } = require("./priorityQueue");

// const {
//   findNearestAvailableUnit,
// } = require("./bfs");

// const {
//   findShortestPath,
// } = require("./dijkstra");

// // =====================================
// // Decide Required Unit Type
// // =====================================

// const getRequiredUnitType = (
//   incidentType
// ) => {

//   switch (incidentType) {

//     case "MEDICAL":
//       return "AMBULANCE";

//     case "FIRE":
//       return "FIRE_BRIGADE";

//     case "CRIME":
//       return "POLICE";

//     case "ACCIDENT":
//       return "AMBULANCE";

//     case "INFRASTRUCTURE":
//       return "POLICE";

//     default:
//       return null;

//   }

// };

// // =====================================
// // Generate Dispatch Plan
// // =====================================

// const generateDispatchPlan =
//   async (incident) => {

//     emergencyQueue.enqueue(
//         incident
//         );

//     const currentIncident =
//         emergencyQueue.dequeue();

//     const requiredUnitType =
//       getRequiredUnitType(

//         currentIncident.type

//       );

//     if (!requiredUnitType) {

//       return {

//         success: false,

//         message:
//           "No matching unit type",

//       };

//     }

//     const bfsResult =
//       await findNearestAvailableUnit(

//         currentIncident.location.nodeId,

//         requiredUnitType

//       );

//     if (!bfsResult.found) {

//       return {

//         success: false,

//         message:
//           "No available unit found",

//       };

//     }

//     const shortestRoute =
//       findShortestPath(

//         bfsResult.unit.currentLocation.nodeId,

//         currentIncident.location.nodeId

//       );

//     return {

//       success: true,

//       incidentId:
//         currentIncident._id,

//       severity:
//         currentIncident.severity,

//       unitType:
//         requiredUnitType,

//       assignedUnit:
//         bfsResult.unit,

//       route:
//         shortestRoute,

//     };

//   };

// module.exports = {
//   generateDispatchPlan,
// };