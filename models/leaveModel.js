const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Employee = require("./employeeModel");

const Leave = sequelize.define("Leave", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: { type: DataTypes.STRING, allowNull: false }, 
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "pending" },
});

Employee.hasMany(Leave, { foreignKey: "employeeId" });
Leave.belongsTo(Employee, { foreignKey: "employeeId" });

module.exports = Leave;
