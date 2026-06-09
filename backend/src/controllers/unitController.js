const Unit = require("../models/Unit");

exports.createUnit = async (req, res) => {
  try {
    const unit = await Unit.create(req.body);

    res.status(201).json({
      success: true,
      unit,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};