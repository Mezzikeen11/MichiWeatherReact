

const { obtenerClima } = require("../services/weatherService");

const getClima = async (req, res) => {
  const { ciudad } = req.params;
  if (!ciudad) return res.status(400).json({ error: "Debes indicar la ciudad" });

  try {
    const datos = await obtenerClima(ciudad);
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getClima };
