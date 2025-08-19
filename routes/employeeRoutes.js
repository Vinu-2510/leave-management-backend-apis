const express = require("express");
const {
  addEmployee,
  getLeaveBalance,
} = require("../controllers/employeeController");
const { protect, restrictTo } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, restrictTo("HR"), addEmployee); // only HR can add new employees
router.get("/:id/balance", protect, getLeaveBalance); // employees can view their own, HR can view anyone

module.exports = router;
