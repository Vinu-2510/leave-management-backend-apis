const Leave = require("../models/leaveModel");

exports.applyLeave = async (req, res) => {
  try {
    const { type, startDate, endDate } = req.body;
    const leave = await Leave.create({
      type,
      startDate,
      endDate,
      employeeId: req.user.id,
    });
    res.json({ msg: "Leave applied", leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.findAll({ where: { employeeId: req.user.id } });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    if (req.user.role !== "HR")
      return res.status(403).json({ msg: "Unauthorized" });

    const { leaveId, status } = req.body;
    const leave = await Leave.findByPk(leaveId);
    if (!leave) return res.status(404).json({ msg: "Leave not found" });

    leave.status = status;
    await leave.save();

    res.json({ msg: "Leave status updated", leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
