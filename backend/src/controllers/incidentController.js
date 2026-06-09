const Incident = require("../models/Incident");

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