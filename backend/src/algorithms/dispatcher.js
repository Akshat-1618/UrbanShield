const {emergencyQueue} = require("./priorityQueue");

const addIncident = (incident) => {
  emergencyQueue.enqueue(incident);
};

const removeIncident = (incidentId) => {
  emergencyQueue.removeById(incidentId);
};

const getQueue = () => {
  return emergencyQueue.getAll()
    .sort(
      (a, b) =>
        b.severity - a.severity
    );
};

const peekIncident = () => {
  return emergencyQueue.peek();
};

const dispatchNext = () => {
  return emergencyQueue.dequeue();
};

module.exports = {
  addIncident,
  removeIncident,
  getQueue,
  peekIncident,
  dispatchNext,
};