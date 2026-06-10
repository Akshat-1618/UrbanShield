const cityGraph = require("./cityGraph");
const Unit = require("../models/Unit");

const findNearestAvailableUnit = async (
  startNode,
  unitType
) => {

  // Fetch all available units once

  const availableUnits =
    await Unit.find({

      availability: true,

      unitType,

    });

  // Create lookup map

  const unitMap = new Map();

  for (const unit of availableUnits) {

    unitMap.set(

      unit.currentLocation.nodeId,

      unit

    );

  }

  // Standard BFS

  const queue = [];

  const visited = new Set();

  queue.push(startNode);

  visited.add(startNode);

  while (queue.length > 0) {

    const currentNode =
      queue.shift();

    // O(1) lookup

    if (
      unitMap.has(currentNode)
    ) {

      return {

        found: true,

        node: currentNode,

        unit: unitMap.get(
          currentNode
        ),

      };

    }

    const neighbours =
      cityGraph.graph[currentNode];

    for (const neighbour of neighbours) {

      if (
        !visited.has(
          neighbour.to
        )
      ) {

        visited.add(
          neighbour.to
        );

        queue.push(
          neighbour.to
        );

      }

    }

  }

  return {

    found: false,

    node: null,

    unit: null,

  };

};

module.exports = {
  findNearestAvailableUnit,
};