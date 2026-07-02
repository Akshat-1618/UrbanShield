const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const http = require("http");
const { Server } = require("socket.io");

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const incidentRoutes = require("./routes/incidentRoutes");
const unitRoutes = require("./routes/unitRoutes");
const dispatcherRoutes = require("./routes/dispatcherRoutes");

connectDB();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

const allowedOrigins = [
  "http://localhost:5173",
  "https://urban-shield-six.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/dispatcher", dispatcherRoutes);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Socket Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket Disconnected");
  });
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "UrbanShield Backend Running"
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});