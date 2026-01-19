require("dotenv").config();

const express = require("express");
const cors = require("cors");
const weatherRoutes = require("./routes/weatherRoutes");
const authRoutes = require("./routes/authRoutes");
const setupDB = require("./setupDB"); 

const app = express();
app.use(cors());
app.use(express.json());

// Crear tablas al arrancar
setupDB();

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Backend funcionando!");
});

// Rutas API
app.use("/api/weather", weatherRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en puerto ${PORT}`)
);
