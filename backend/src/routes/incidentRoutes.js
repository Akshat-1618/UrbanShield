const express = require("express");

const {
  createIncident,
  getMyIncidents,
  getPendingIncidents,
  getAllIncidents,
  getIncidentById,
  autoAssignUnit,
  updateIncidentStatus,
} = require("../controllers/incidentController");

const { protect } = require("../middleware/authMiddleware");

const { authorize } = require("../middleware/roleMiddleware");

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

router.get(
  "/my-incidents",
  protect,
  getMyIncidents
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllIncidents
);

router.patch(
  "/:id/status",
  protect,
  authorize("unit"),
  updateIncidentStatus
);

router.patch(
  "/:id/auto-assign",
  protect,
  authorize("admin"),
  autoAssignUnit
);

router.get(
  "/pending",
  protect,
  authorize("admin"),
  getPendingIncidents
);

router.get(
  "/:id",
  protect,
  getIncidentById
);

module.exports = router;