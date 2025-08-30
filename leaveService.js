async function approveLeave(leaveId) {
  const leave = await LeaveRepository.getLeaveById(leaveId);
  if (!leave) {
    return { success: false, message: "Leave not found" };
  }
  if (leave.status !== "PENDING") {
    return { success: false, message: "Leave already processed" };
  }
  const employee = await EmployeeRepository.getEmployeeById(leave.employeeId);
  if (!employee) {
    return { success: false, message: "Employee not found" };
  }
  const daysRequested = calculateDays(leave.startDate, leave.endDate);

  if (employee.leaveBalance >= daysRequested) {
    employee.leaveBalance -= daysRequested;

    await EmployeeRepository.updateEmployee(employee.employeeId, {
      leaveBalance: employee.leaveBalance,
    });
    await LeaveRepository.updateLeave(leaveId, { status: "APPROVED" });

    return { success: true, message: "Leave Approved", status: "APPROVED" };
  } else {
    await LeaveRepository.updateLeave(leaveId, { status: "REJECTED" });
    return {
      success: false,
      message: "Insufficient balance. Leave Rejected.",
      status: "REJECTED",
    };
  }
}
function calculateDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  return diff;
}

module.exports = { approveLeave };
