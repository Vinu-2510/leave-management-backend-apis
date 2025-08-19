require("dotenv").config();
const express = require("express");
const sequelize = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const leaveRoutes = require("./routes/leaveRoutes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/leave", leaveRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected");
    return sequelize.sync();
  })
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(` Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("DB error:", err));
