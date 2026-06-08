const express = require("express");

const { register,login } = require("../controllers/authController");

const {
  registerValidation,
  loginValidation,
  validate,
} = require("../middleware/validators/authValidator");

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  validate,
  register
);

router.post(
  "/login",
  loginValidation,
  validate,
  login
);

module.exports = router;