const express = require("express");

const router = express.Router();

const {
  createUnit,
  loginUnit,
} = require("../controllers/unitController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorize,
} = require("../middleware/roleMiddleware");

const {
  loginUnitValidation,
  validate,
} = require("../middleware/validators/unitValidator");

// =========================
// Unit Login
// =========================

router.post(
  "/login",
  loginUnitValidation,
  validate,
  loginUnit
);

// =========================
// Create Unit
// =========================

router.post(
  "/",
  protect,
  authorize("admin"),
  createUnit
);

module.exports = router;