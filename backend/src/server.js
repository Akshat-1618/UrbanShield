const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const incidentRoutes = require("./routes/incidentRoutes");
const unitRoutes = require("./routes/unitRoutes");
const dispatcherRoutes = require("./routes/dispatcherRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/dispatcher",dispatcherRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "UrbanShield Backend Running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});