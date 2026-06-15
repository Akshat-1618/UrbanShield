const {body,validationResult,} = require("express-validator");

const loginUnitValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
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

const createUnitValidation = [

  body("unitName")
    .trim()
    .notEmpty()
    .withMessage(
      "Unit name is required"
    ),

  body("email")
    .isEmail()
    .withMessage(
      "Valid email is required"
    ),

  body("password")
    .isLength({ min: 6 })
    .withMessage(
      "Password must be at least 6 characters"
    ),

  body("unitType")
    .isIn([
      "AMBULANCE",
      "POLICE",
      "FIRE_BRIGADE",
    ])
    .withMessage(
      "Invalid unit type"
    ),

  body("areaName")
    .trim()
    .notEmpty()
    .withMessage(
      "Area name is required"
    ),

];

module.exports = {
  loginUnitValidation,
  createUnitValidation,
  validate,
};