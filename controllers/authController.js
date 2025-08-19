const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employeeModel");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await Employee.findOne({ where: { email } });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await Employee.create({ name, email, password: hashed, role });

    res.json({ msg: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Employee.findOne({ where: { email } });

    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ msg: "Login success", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
