const express = require("express");

const {
  createIncident,
  getMyIncidents,
  getAllIncidents,
  getIncidentById,
} = require("../controllers/incidentController");

const { protect } = require("../middleware/authMiddleware");

const { authorize } = require("../middleware/roleMiddleware");

const {
  createIncidentValidation,
  validate,
} = require("../middleware/validators/incidentValidator");

const router = express.Router();

// Create Incident
router.post(
  "/",
  protect,
  createIncidentValidation,
  validate,
  createIncident
);

// Citizen - My Incidents
router.get(
  "/my-incidents",
  protect,
  getMyIncidents
);

// Admin - All Incidents
router.get(
  "/",
  protect,
  authorize("admin"),
  getAllIncidents
);

// Get Incident By ID
router.get(
  "/:id",
  protect,
  getIncidentById
);

module.exports = router;