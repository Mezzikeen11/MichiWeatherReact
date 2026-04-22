const { obtenerClima, buscarCiudades } = require("../services/weatherService");

const getClima = async (req, res) => {
  const { ciudad } = req.params;
  if (!ciudad) {
    return res.status(400).json({ error: "Debes indicar la ciudad" });
  }

  try {
    const datos = await obtenerClima(ciudad);
    return res.json(datos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const searchCities = async (req, res) => {
  const { q, limit } = req.query;

  if (!q || String(q).trim().length < 2) {
    return res.json([]);
  }

  try {
    const results = await buscarCiudades(q, limit);
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const batchWeather = async (req, res) => {
  const { ciudades } = req.body;

  if (!Array.isArray(ciudades) || ciudades.length === 0) {
    return res.status(400).json({ error: "Debes enviar un arreglo de ciudades" });
  }

  const resultados = await Promise.allSettled(
    ciudades.map((ciudad) => obtenerClima(ciudad))
  );

  return res.json(
    resultados.map((resultado, index) => ({
      ciudad: ciudades[index],
      data: resultado.status === "fulfilled" ? resultado.value : null,
      error: resultado.status === "rejected" ? resultado.reason?.message || "Error" : null,
    }))
  );
};

module.exports = { getClima, searchCities, batchWeather };
