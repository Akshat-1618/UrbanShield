const express = require("express");

const {
  createIncident,
} = require("../controllers/incidentController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  createIncidentValidation,
  validate,
} = require("../middleware/validators/incidentValidator");

const router = express.Router();

router.post(
  "/",
  protect,
  createIncidentValidation,
  validate,
  createIncident
);

module.exports = router;