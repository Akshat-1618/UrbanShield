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
  createUnitValidation,
  validate,
} = require("../middleware/validators/unitValidator");

router.post(
  "/login",
  loginUnitValidation,
  validate,
  loginUnit
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllUnits
);

router.get(
  "/me",
  protect,
  authorize("unit"),
  getMyProfile
);

router.get(
  "/my-mission",
  protect,
  authorize("unit"),
  getCurrentMission
);

router.post(
  "/",
  protect,
  authorize("admin"),
  createUnitValidation,
  validate,
  createUnit
);

module.exports = router;