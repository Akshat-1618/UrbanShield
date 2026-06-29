const express = require("express");

const router = express.Router();

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorize,
} = require("../middleware/roleMiddleware");

const {
  getPriorityQueue,
} = require("../controllers/dispatcherController");

router.get(
  "/queue",
  protect,
  authorize("admin"),
  getPriorityQueue
);

module.exports = router;