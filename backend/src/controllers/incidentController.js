const Incident = require("../models/Incident");
const Unit = require("../models/Unit");
const {
  findNearestAvailableUnit,
} = require("../algorithms/bfs");

const {
  findShortestPath,
} = require("../algorithms/dijkstra");

// Priority -> Severity Mapping
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
      description,
      type,
      priority,
      nodeId,
      areaName,
      coordinates,
    } = req.body;

    const { lat, lng } = coordinates;

    // Convert priority to severity
    const severity = severityMap[priority];

    // Safety check
    if (!severity) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority level",
      });
    }

    // Create incident
    const incident = await Incident.create({
      title,
      description,
      type,
      severity,

      location: {
        nodeId,
        areaName,
        coordinates: {
          lat,
          lng,
        },
      },

      status: "REPORTED",

      statusHistory: [
        {
          status: "REPORTED",
        },
      ],

      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Incident created successfully",
      incident,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
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

    // Update Incident

    incident.assignedUnit = unit._id;
    incident.status = "ASSIGNED";

    incident.statusHistory.push({
      status: "ASSIGNED",
    });

    await incident.save();

    // Update Unit

    unit.currentMission = incident._id;
    unit.status = "ASSIGNED";
    unit.availability = false;

    await unit.save();

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

    // ----------------------------------
    // Decide required emergency unit
    // ----------------------------------

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

    // ----------------------------------
    // BFS
    // ----------------------------------

    const bfsResult =
      await findNearestAvailableUnit(
        incident.location.nodeId,
        requiredUnitType
      );

    if (!bfsResult.found) {

      return res.status(404).json({
        success: false,
        message: "No available unit found",
      });

    }

    const unit = bfsResult.unit;

    // ----------------------------------
    // Dijkstra
    // ----------------------------------

    const route =
      findShortestPath(
        unit.currentLocation.nodeId,
        incident.location.nodeId
      );

    // ----------------------------------
    // Update Incident
    // ----------------------------------

    incident.assignedUnit = unit._id;

    incident.status = "ASSIGNED";

    incident.statusHistory.push({
      status: "ASSIGNED",
    });

    await incident.save();

    // ----------------------------------
    // Update Unit
    // ----------------------------------

    unit.currentMission = incident._id;

    unit.status = "ASSIGNED";

    unit.availability = false;

    await unit.save();

    // ----------------------------------
    // Response
    // ----------------------------------

    return res.status(200).json({

      success: true,

      message:
        "Nearest available unit assigned successfully",

      assignedUnit: {

        id: unit._id,

        unitName: unit.unitName,

        unitType: unit.unitType,

      },

      route,

    });

  } catch (error) {

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
      "ACCEPTED",
      "EN_ROUTE",
      "ARRIVED",
      "RESOLVED",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    // Update incident status
    incident.status = status;

    incident.statusHistory.push({
      status,
    });

    await incident.save();

    // Update assigned unit if exists
    if (incident.assignedUnit) {
      const unit = await Unit.findById(
        incident.assignedUnit
      );

      if (unit) {
        if (status === "ACCEPTED") {
          unit.status = "BUSY";
        } 
        else if (status === "EN_ROUTE") {
          unit.status = "EN_ROUTE";
        } 
        else if (status === "ARRIVED") {
          unit.status = "BUSY";
        } 
        else if (status === "RESOLVED") {
          unit.status = "IDLE";
          unit.availability = true;
          unit.currentMission = null;
        }

        await unit.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: "Incident status updated successfully",
      data: incident,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};