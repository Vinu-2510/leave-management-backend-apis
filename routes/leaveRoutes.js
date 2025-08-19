const express = require("express");
const {
  applyLeave,
  getLeaves,
  updateLeaveStatus,
} = require("../controllers/leaveController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/apply", auth, applyLeave);
router.get("/my-leaves", auth, getLeaves);
router.put("/status", auth, updateLeaveStatus);

module.exports = router;
