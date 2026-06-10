const {
  body,
  validationResult,
} = require("express-validator");

const loginUnitValidation = [

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

];

const validate = (req, res, next) => {

  const errors =
    validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });

  }

  next();

};

module.exports = {
  loginUnitValidation,
  validate,
};