const axios = require("axios");
const db = require("../config/db");

const API_KEY = process.env.OPENWEATHER_KEY;

const obtenerClima = async (ciudad) => {
  try {
    // Revisar caché
    const cached = await db("cache")
      .where("ciudad", ciudad)
      .andWhere("expiracion", ">", new Date())
      .first();

    if (cached) return JSON.parse(cached.datos);

    // Obtener coordenadas de la ciudad
    const geoResp = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=1&appid=${API_KEY}`
    );

    if (!geoResp.data || geoResp.data.length === 0) {
      throw new Error("Ciudad no encontrada");
    }

    const { lat, lon, name } = geoResp.data[0];

    // Llamar a One Call API
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`
    );

    // Combinar datos con nombre y coordenadas
    const datos = { ...response.data, name, lat, lon };

    // Guardar en consultas
    await db("consultas").insert({
      ciudad,
      lat,
      lon,
      respuesta: JSON.stringify(datos),
    });

    // Calcular expiración de cache
    const expiracion = new Date();
    expiracion.setMinutes(expiracion.getMinutes() + 10);

    // Insertar o actualizar cache
    const existeCache = await db("cache").where("ciudad", ciudad).first();
    if (existeCache) {
      await db("cache")
        .where("ciudad", ciudad)
        .update({
          datos: JSON.stringify(datos),
          expiracion,
        });
    } else {
      await db("cache").insert({
        ciudad,
        datos: JSON.stringify(datos),
        expiracion,
      });
    }

    // Retornar **exactamente** el JSON de One Call
    return datos;

  } catch (error) {
    console.error("Error obteniendo clima:", error.message);
    throw new Error("No se pudo obtener la información del clima");
  }
};

module.exports = { obtenerClima };
