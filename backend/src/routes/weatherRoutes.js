const express = require("express");
const {
  getClima,
  searchCities,
  batchWeather,
} = require("../controllers/weatherController");

const router = express.Router();

router.get("/search", searchCities);
router.post("/batch", batchWeather);
router.get("/:ciudad", getClima);

module.exports = router;
