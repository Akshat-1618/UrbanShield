const { body, validationResult } = require("express-validator");

const createIncidentValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .optional()
    .trim(),

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

  body("areaName")
    .trim()
    .notEmpty()
    .withMessage("Area name is required"),

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