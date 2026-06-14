const {
  emergencyQueue,
} = require("./priorityQueue");

const addIncident = (
  incident
) => {

  emergencyQueue.enqueue(
    incident
  );

};

const removeIncident = (
  incidentId
) => {

  emergencyQueue.removeById(
    incidentId
  );

};

const getQueue = () => {

  return emergencyQueue.getAll();

};

const peekIncident = () => {

  return emergencyQueue.peek();

};

module.exports = {

  addIncident,

  removeIncident,

  getQueue,

  peekIncident,

};