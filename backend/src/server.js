require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const weatherRoutes = require("./routes/weatherRoutes");
const authRoutes = require("./routes/authRoutes");
const db = require("./config/db");

const app = express();

const exactOrigins = [
  process.env.CORS_ORIGIN,
  "https://michiweatherreact.pages.dev",
  "http://localhost:5173",
  "http://localhost:4173",
].filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (exactOrigins.includes(origin)) return true;

  return /^https:\/\/[a-z0-9-]+\.michiweatherreact\.pages\.dev$/.test(origin);
};

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origen no permitido por CORS: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get("/health", async (_req, res) => {
  try {
    await db.raw("SELECT 1");
    return res.status(200).json({ ok: true });
  } catch (_err) {
    return res.status(500).json({ ok: false, db: "down" });
  }
});

app.use("/api/weather", weatherRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});