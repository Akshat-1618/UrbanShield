const cityGraph = require("./cityGraph");

const findShortestPath = (startNode, endNode) => {

  const graph = cityGraph.graph;
  const distances = {};
  const previous = {};
  const visited = new Set();

  for (const node in graph) {

    distances[node] = Infinity;
    previous[node] = null;

  }

  distances[startNode] = 0;

  while (true) {

    let currentNode = null;
    let minDistance = Infinity;

    for (const node in distances) {

      if (!visited.has(node) && distances[node] < minDistance) 
        {
        minDistance = distances[node];
        currentNode = node;
      }
    }

    if (currentNode === null) {
      break;
    }

    visited.add(currentNode);

    if (currentNode === endNode) {
      break;
    }

    for (const neighbour of graph[currentNode]){

      const effectiveWeight = neighbour.distance * neighbour.trafficMultiplier;

      const newDistance = distances[currentNode] + effectiveWeight;

      if (newDistance < distances[neighbour.to]){

        distances[neighbour.to] = newDistance;
        previous[neighbour.to] = currentNode;

      }

    }

  }


  const path = [];

  let current = endNode;

  while (current) {

    path.unshift(current);

    current = previous[current];

  }

  return {

    totalCost:
      distances[endNode],

    path,

    visitedNodes:
      Array.from(visited),

  };

};

module.exports = {
  findShortestPath,
};