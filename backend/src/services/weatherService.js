const axios = require("axios");
const db = require("../config/db");

const API_KEY = process.env.OPENWEATHER_KEY;
const memoryCache = {};

const axiosInstance = axios.create({
  timeout: 8000,
});

const normalizarCiudad = (ciudad = "") => ciudad.trim().toLowerCase();

const ensureWeatherApiKey = () => {
  if (!API_KEY) {
    throw new Error("OPENWEATHER_KEY no está configurada");
  }
};

const buscarCiudades = async (query, limit = 5) => {
  ensureWeatherApiKey();

  const termino = String(query || "").trim();
  if (!termino) return [];

  const response = await axiosInstance.get(
    "https://api.openweathermap.org/geo/1.0/direct",
    {
      params: {
        q: termino,
        limit: Number(limit) || 5,
        appid: API_KEY,
      },
    }
  );

  return response.data.map((item) => ({
    name: item.name,
    display: `${item.name}${item.state ? `, ${item.state}` : ""}${item.country ? `, ${item.country}` : ""}`,
    lat: item.lat,
    lon: item.lon,
    country: item.country,
    state: item.state,
  }));
};

const obtenerClima = async (ciudad) => {
  ensureWeatherApiKey();

  const ciudadKey = normalizarCiudad(ciudad);
  const ahora = Date.now();

  if (memoryCache[ciudadKey] && ahora - memoryCache[ciudadKey].time < 10 * 60 * 1000) {
    return memoryCache[ciudadKey].data;
  }

  const cached = await db("cache")
    .where("ciudad", ciudadKey)
    .andWhere("expiracion", ">", new Date())
    .first();

  if (cached) {
    const data = typeof cached.datos === "string" ? JSON.parse(cached.datos) : cached.datos;
    memoryCache[ciudadKey] = { data, time: ahora };
    return data;
  }

  try {
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

    const climaResp = await axiosInstance.get(
      "https://api.openweathermap.org/data/3.0/onecall",
      {
        params: {
          lat,
          lon,
          units: "metric",
          exclude: "minutely,alerts",
          lang: "es",
          appid: API_KEY,
        },
      }
    );

    const datos = { ...climaResp.data, name, lat, lon };

    db("consultas")
      .insert({
        ciudad: ciudadKey,
        lat,
        lon,
        respuesta: JSON.stringify(datos),
      })
      .catch(() => {});

    const expiracion = new Date(Date.now() + 10 * 60 * 1000);

    await db("cache")
      .insert({
        ciudad: ciudadKey,
        datos: JSON.stringify(datos),
        expiracion,
      })
      .onConflict("ciudad")
      .merge();

    memoryCache[ciudadKey] = { data: datos, time: ahora };

    return datos;
  } catch (error) {
    console.error("❌ Clima error:", error.message);
    throw new Error(error.message === "Ciudad no encontrada" ? error.message : "Clima no disponible");
  }
};

module.exports = { obtenerClima, buscarCiudades };
