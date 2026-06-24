const Unit = require("../models/Unit");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cityGraph = require("../algorithms/cityGraph");

exports.createUnit = async (req, res) => {
  try {
    const {
      unitName,
      email,
      password,
      unitType,
      areaName,
    } = req.body;

    const existingUnit = await Unit.findOne({email});

    if (existingUnit) {
      return res.status(400).json({
        success: false,
        message:"Unit already exists",
      });
    }

    const selectedNode = Object.entries(cityGraph.nodes).
      find(([nodeId, node]) => node.name === areaName);

    if (!selectedNode) {
      return res.status(400).json({
        success: false,
        message: "Invalid area selected",
      });
    }
    const [
      nodeId,
      nodeData,
    ] = selectedNode;

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const unit =
      await Unit.create({
        unitName,
        email,
        password:hashedPassword,
        unitType,
        availability: true,
        currentLocation: {
          nodeId,
          areaName,
          coordinates: {
            lat:
              nodeData.lat,
            lng:
              nodeData.lng,
          },
        },
      });

    return res.status(201).json({
      success: true,
      message:
        "Unit created successfully",
      data: {
        id: unit._id,
        unitName:
          unit.unitName,
        email:
          unit.email,
        unitType:
          unit.unitType,
        currentLocation:
          unit.currentLocation,
      },
    });
  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

exports.loginUnit = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const unit = await Unit.findOne({
      email,
    });

    if (!unit) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        unit.password
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: unit._id,
        role: "unit",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Unit login successful",
      token,
      unit: {
        id: unit._id,
        unitName: unit.unitName,
        email: unit.email,
        unitType: unit.unitType,
      },
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.getAllUnits = async (req, res) => {
  try {
    const units = await Unit.find().select("-password")
      .populate("currentMission","title status")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: units.length,
      data: units,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const unit = await Unit.findById(req.user.id)
      .select("-password");

    if (!unit) {
      return res.status(404).json({
        success: false,
        message: "Unit not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: unit,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.getCurrentMission = async (req, res) => {
  try {
    const unit = await Unit.findById(req.user.id)
      .populate("currentMission");

    if (!unit) {
      return res.status(404).json({
        success: false,
        message: "Unit not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: unit.currentMission,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};