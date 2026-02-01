const express = require("express");
const { getClima } = require("../controllers/weatherController");
const router = express.Router();

router.get("/:ciudad", getClima);

// Para múltiples ubicaciones
router.post("/batch", async (req, res) => {
  const { ciudades } = req.body;

  const resultados = await Promise.allSettled(
    ciudades.map(c => getClimaInterno(c))
  );

  res.json(
    resultados.map((r, i) => ({
      ciudad: ciudades[i],
      data: r.status === "fulfilled" ? r.value : null,
    }))
  );
});

module.exports = router;
