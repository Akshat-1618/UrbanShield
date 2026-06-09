const Unit = require("../models/Unit");

exports.createUnit = async (req, res) => {
  try {
    const existingUnit = await Unit.findOne({
      unitName: req.body.unitName,
    });

    if (existingUnit) {
      return res.status(400).json({
        success: false,
        message: "Unit already exists",
      });
    }

    const unit = await Unit.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Unit created successfully",
      data: unit,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};