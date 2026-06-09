const express = require("express");

const router = express.Router();

const { createUnit } = require(
  "../controllers/unitController"
);

const { protect } = require(
  "../middleware/authMiddleware"
);

const { authorize } = require(
  "../middleware/roleMiddleware"
);

router.post(
  "/",
  protect,
  authorize("admin"),
  createUnit
);

module.exports = router;