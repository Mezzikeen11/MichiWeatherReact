const axios = require("axios");
const db = require("../config/db");

const API_KEY = process.env.OPENWEATHER_KEY;

// Cache en memoria (mucho más rápido)
const memoryCache = {};

const axiosInstance = axios.create({
  timeout: 8000, // 8 segundos
});

const normalizarCiudad = (ciudad) =>
  ciudad.trim().toLowerCase();

const obtenerClima = async (ciudad) => {
  const ciudadKey = normalizarCiudad(ciudad);
  const ahora = Date.now();

  // 1️⃣ Cache en memoria
  if (
    memoryCache[ciudadKey] &&
    ahora - memoryCache[ciudadKey].time < 10 * 60 * 1000
  ) {
    return memoryCache[ciudadKey].data;
  }

  // 2️⃣ Cache en DB
  const cached = await db("cache")
    .where("ciudad", ciudadKey)
    .andWhere("expiracion", ">", new Date())
    .first();

  if (cached) {
    const data = JSON.parse(cached.datos);
    memoryCache[ciudadKey] = { data, time: ahora };
    return data;
  }

  try {
    // 3️⃣ Geocoding
    const geoResp = await axiosInstance.get(
      "https://api.openweathermap.org/geo/1.0/direct",
      {
        params: {
          q: ciudadKey,
          limit: 1,
          appid: API_KEY,
        },
      }
    );

    if (!geoResp.data.length) {
      throw new Error("Ciudad no encontrada");
    }

    const { lat, lon, name } = geoResp.data[0];

    // 4️⃣ Clima
    const climaResp = await axiosInstance.get(
      "https://api.openweathermap.org/data/3.0/onecall",
      {
        params: {
          lat,
          lon,
          units: "metric",
          exclude: "minutely,alerts",
          appid: API_KEY,
        },
      }
    );

    const datos = { ...climaResp.data, name, lat, lon };

    // 5️⃣ Guardar consulta (NO crítica)
    db("consultas").insert({
      ciudad: ciudadKey,
      lat,
      lon,
      respuesta: JSON.stringify(datos),
    }).catch(() => {});

    // 6️⃣ Cache DB
    const expiracion = new Date(Date.now() + 10 * 60 * 1000);

    await db("cache")
      .insert({
        ciudad: ciudadKey,
        datos: JSON.stringify(datos),
        expiracion,
      })
      .onConflict("ciudad")
      .merge();

    // 7️⃣ Cache memoria
    memoryCache[ciudadKey] = { data: datos, time: ahora };

    return datos;

  } catch (error) {
    console.error("❌ Clima error:", error.message);
    throw new Error("Clima no disponible");
  }
};

module.exports = { obtenerClima };
