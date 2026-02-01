require("dotenv").config();

const express = require("express");
const cors = require("cors");
const weatherRoutes = require("./routes/weatherRoutes");
const authRoutes = require("./routes/authRoutes");
const db = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Health check REAL (despierta backend + DB)
 */
app.get("/health", async (req, res) => {
  try {
    await db.raw("SELECT 1");
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, db: "down" });
  }
});

// Rutas API
app.use("/api/weather", weatherRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
