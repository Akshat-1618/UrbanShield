const express = require("express");

const router = express.Router();

const {
  createUnit,
  loginUnit,
  getAllUnits,
  getMyProfile,
  getCurrentMission,
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
// Get All Units
// =========================

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllUnits
);

// =========================
// Logged In Unit Profile
// =========================

router.get(
  "/me",
  protect,
  getMyProfile
);

// =========================
// Current Assigned Mission
// =========================

router.get(
  "/my-mission",
  protect,
  getCurrentMission
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