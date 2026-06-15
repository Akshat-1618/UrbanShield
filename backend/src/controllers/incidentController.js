const Incident = require("../models/Incident");
const Unit = require("../models/Unit");
const {findShortestPath} = require("../algorithms/floyd");
const cityGraph = require("../algorithms/cityGraph");
const dispatcher = require("../algorithms/dispatcher");

const severityMap = {
  LOW: 3,
  MEDIUM: 6,
  HIGH: 8,
  CRITICAL: 10,
};

exports.createIncident = async (req, res) => {
  try {
    const {
      title,
      description = "",
      type,
      priority,
      areaName,
    } = req.body;

    const severity =
      severityMap[priority];

    if (!severity) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid priority level",
      });
    }

    const selectedNode =
      Object.entries(
        cityGraph.nodes
      ).find(
        ([nodeId, node]) =>
          node.name === areaName
      );

    if (!selectedNode) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid area selected",
      });
    }

    const [nodeId, nodeData] =
      selectedNode;

    const incident =
      await Incident.create({
        title,
        description,
        type,
        severity,
        location: {
          nodeId,
          areaName,
          coordinates: {
            lat: nodeData.lat,
            lng: nodeData.lng,
          },
        },
        status: "REPORTED",
        statusHistory: [
          {
            status:"REPORTED",
          },
        ],
        createdBy:
          req.user.id,
      });

    dispatcher.addIncident(
      incident
    );

    const io =
      req.app.get("io");

    io.emit(
      "incidentUpdated"
    );

    return res.status(201).json({
      success: true,

      message:
        "Incident created successfully",

      incident,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message:
        error.message,
    });
  }
};

exports.getMyIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({
      createdBy: req.user.id,
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: incidents.length,
      data: incidents,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find()
      .populate("createdBy", "name email")
      .populate("assignedUnit")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: incidents.length,
      data: incidents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("assignedUnit");

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: incident,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.assignUnit = async (req, res) => {
  try {
    const { unitId } = req.body;

    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    const unit = await Unit.findById(unitId);

    if (!unit) {
      return res.status(404).json({
        success: false,
        message: "Unit not found",
      });
    }

    if (!unit.availability) {
      return res.status(400).json({
        success: false,
        message: "Unit is not available",
      });
    }

    incident.assignedUnit = unit._id;
    incident.status = "ASSIGNED";

    incident.statusHistory.push({
      status: "ASSIGNED",
    });

    await incident.save();

    unit.currentMission = incident._id;
    unit.status = "ASSIGNED";
    unit.availability = false;

    await unit.save();

    dispatcher.removeIncident(incident._id);

    const io = req.app.get("io");

    io.emit(
      "incidentUpdated"
    );

    return res.status(200).json({
      success: true,
      message: "Unit assigned successfully",

      data: incident,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.autoAssignUnit = async (req, res) => {
  try {

    const incident = await Incident.findById(req.params.id);

    if (!incident) {

      return res.status(404).json({

        success: false,

        message: "Incident not found",

      });

    }

    if (incident.assignedUnit) {

      return res.status(400).json({

        success: false,

        message: "Incident already has an assigned unit",

      });

    }

    let requiredUnitType;

    switch (incident.type) {

      case "MEDICAL":
      case "ACCIDENT":
        requiredUnitType = "AMBULANCE";
        break;

      case "FIRE":
        requiredUnitType = "FIRE_BRIGADE";
        break;

      case "CRIME":
      case "INFRASTRUCTURE":
        requiredUnitType = "POLICE";
        break;

      default:

        return res.status(400).json({

          success: false,

          message: "Unsupported incident type",

        });

    }

    const availableUnits = await Unit.find({

      availability: true,

      unitType: requiredUnitType,

    });

    if (availableUnits.length === 0) {

      return res.status(404).json({

        success: false,

        message: "No available unit found",

      });

    }

    let bestUnit = null;

    let bestRoute = null;

    let minimumCost = Infinity;

    for (const currentUnit of availableUnits) {

      const currentRoute = findShortestPath(

        currentUnit.currentLocation.nodeId,

        incident.location.nodeId

      );

      if (currentRoute.totalCost < minimumCost) {

        minimumCost = currentRoute.totalCost;

        bestUnit = currentUnit;

        bestRoute = currentRoute;

      }

    }

    incident.assignedUnit = bestUnit._id;

    incident.status = "ASSIGNED";

    incident.statusHistory.push({

      status: "ASSIGNED",

    });

    await incident.save();

    bestUnit.currentMission = incident._id;

    bestUnit.status = "ASSIGNED";

    bestUnit.availability = false;

    await bestUnit.save();

    dispatcher.removeIncident(

      incident._id

    );

    const io = req.app.get("io");

    io.emit(
      "incidentUpdated"
    );

    return res.status(200).json({

      success: true,

      message: "Nearest available unit assigned successfully",

      assignedUnit: {

        id: bestUnit._id,

        unitName: bestUnit.unitName,

        unitType: bestUnit.unitType,

      },

      shortestDistance: minimumCost,

      route: bestRoute,

      pathLength: bestRoute.path.length,

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

exports.updateIncidentStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const allowedStatuses = [
      "ON_THE_WAY",
      "ARRIVED",
      "RESOLVED",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const incident = await Incident.findById(
      req.params.id
    );

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    const validTransitions = {

      ASSIGNED: ["ON_THE_WAY"],

      ON_THE_WAY: ["ARRIVED"],

      ARRIVED: ["RESOLVED"],

    };

    const currentStatus =
      incident.status;

    if (

      !validTransitions[currentStatus] ||

      !validTransitions[
        currentStatus
      ].includes(status)

    ) {

      return res.status(400).json({

        success: false,

        message:
          `Cannot move from ${currentStatus} to ${status}`,

      });

    }

    incident.status = status;

    incident.statusHistory.push({
      status,
    });

    await incident.save();

    if (incident.assignedUnit) {

      const unit =
        await Unit.findById(
          incident.assignedUnit
        );

      if (unit) {

        if (
          status === "ON_THE_WAY"
        ) {

          unit.status =
            "ON_THE_WAY";

        }

        else if (
          status === "ARRIVED"
        ) {

          unit.status =
            "BUSY";

        }

        else if (
          status === "RESOLVED"
        ) {

          unit.status =
            "IDLE";

          unit.availability =
            true;

          unit.currentMission =
            null;

        }

        await unit.save();

      }

    }

    const io = req.app.get("io");

    io.emit("incidentUpdated");

    return res.status(200).json({

      success: true,

      message:
        "Incident status updated successfully",

      data: incident,

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};