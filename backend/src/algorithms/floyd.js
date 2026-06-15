const cityGraph = require("./cityGraph");

const graph = cityGraph.graph;

const distances = {};
const nextNode = {};

const nodes = Object.keys(graph);

for (const i of nodes) {

  distances[i] = {};
  nextNode[i] = {};

  for (const j of nodes) {

    distances[i][j] = Infinity;
    nextNode[i][j] = null;

  }

  distances[i][i] = 0;

}

for (const from of nodes) {

  for (const edge of graph[from]) {

    distances[from][edge.to] =
      edge.distance;

    nextNode[from][edge.to] =
      edge.to;

  }

}

for (const k of nodes) {

  for (const i of nodes) {

    for (const j of nodes) {

      if (

        distances[i][k] + distances[k][j] <

        distances[i][j]

      ) {

        distances[i][j] =

          distances[i][k] +

          distances[k][j];

        nextNode[i][j] =

          nextNode[i][k];

      }

    }

  }

}

const findShortestPath = (

  startNode,
  endNode

) => {

  if (
    !nextNode[startNode] ||
    !nextNode[startNode][endNode]
  ) {

    return {
      totalCost: Infinity,
      path: [],
    };
  }

  const path = [];
  let current = startNode;
  while (current !== endNode) {
    path.push(current);
    current =
      nextNode[current][endNode];
  }

  path.push(endNode);
  
  return {
    totalCost:
      distances[startNode][endNode],
    path,
  };

};

module.exports = {
  findShortestPath,
};