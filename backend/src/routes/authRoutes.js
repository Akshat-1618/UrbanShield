const express = require("express");

const { register } = require("../controllers/authController");

const {
  registerValidation,
  validate,
} = require("../middleware/validators/authValidator");

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  validate,
  register
);

module.exports = router;