const { body, validationResult } = require("express-validator");

const createIncidentValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("type")
    .isIn([
      "ACCIDENT",
      "FIRE",
      "MEDICAL",
      "CRIME",
      "INFRASTRUCTURE",
    ])
    .withMessage("Invalid incident type"),

  body("priority")
    .isIn([
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL",
    ])
    .withMessage("Invalid priority level"),

  body("nodeId")
    .trim()
    .notEmpty()
    .withMessage("Node ID is required"),

  body("areaName")
    .trim()
    .notEmpty()
    .withMessage("Area name is required"),

  body("coordinates")
    .exists()
    .withMessage("Coordinates are required"),

  body("coordinates.lat")
    .isFloat()
    .withMessage("Valid latitude is required"),

  body("coordinates.lng")
    .isFloat()
    .withMessage("Valid longitude is required"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  createIncidentValidation,
  validate,
};