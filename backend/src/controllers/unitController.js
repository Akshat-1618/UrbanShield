const Unit = require("../models/Unit");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================================
// Create Unit (Admin)
// ================================

exports.createUnit = async (req, res) => {
  try {
    const {
      unitName,
      email,
      password,
      unitType,
      availability,
      currentLocation,
    } = req.body;

    const existingUnit = await Unit.findOne({
      email,
    });

    if (existingUnit) {
      return res.status(400).json({
        success: false,
        message: "Unit already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const unit = await Unit.create({
      unitName,
      email,
      password: hashedPassword,
      unitType,
      availability,
      currentLocation,
    });

    return res.status(201).json({
      success: true,
      message: "Unit created successfully",

      data: {
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

// ================================
// Unit Login
// ================================

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

// ================================
// Get All Units (Admin)
// ================================

exports.getAllUnits = async (req, res) => {
  try {

    const units = await Unit.find()
      .select("-password")
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

// ================================
// Get Logged In Unit Profile
// ================================

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

// ================================
// Get Current Assigned Mission
// ================================

exports.getCurrentMission = async (req, res) => {
  try {

    const unit = await Unit.findById(req.user.id)
      .populate(
        "currentMission"
      );

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