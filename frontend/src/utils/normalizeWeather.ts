// src/utils/normalizeWeather.ts

// Convierte el main del API → tu clave interna (sol, nublado, lluvia…)
function mapMainToIconKey(main: string, code: number): string {
  main = main.toLowerCase();

  if (code === 800) return "sol"; // día despejado
  if (main.includes("clear")) return "sol";

  if (code >= 801 && code <= 803) return "parcial";
  if (main.includes("cloud")) return "nublado";

  if (main.includes("thunderstorm")) return "tormenta";

  if (main.includes("drizzle")) return "llovizna";

  if (main.includes("rain")) return "lluvia";

  if (main.includes("snow")) return "nieve";

  if (main.includes("fog") || main.includes("mist") || main.includes("smoke"))
    return "niebla";

  // fallback seguro
  return "nublado";
}

// Convierte el clima principal → nombre bonito para WeatherCard
function mapToConditionKey(code: number, main: string): string {
  if (code === 800) return "soleado";
  if (code >= 801 && code <= 803) return "parcialmente nublado";
  if (code === 804) return "nublado";
  if (code >= 200 && code <= 232) return "tormenta";
  if (code >= 300 && code <= 321) return "llovizna";
  if (code >= 500 && code <= 531) return "lluvioso";
  if (code >= 600 && code <= 622) return "nieve";
  if (code >= 701 && code <= 781) return "niebla";

  main = main.toLowerCase();
  if (main.includes("rain")) return "lluvioso";
  if (main.includes("snow")) return "nieve";
  if (main.includes("cloud")) return "nublado";

  return "nublado";
}

function capitalize(s: string) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function normalizeWeather({ raw, cityName }: { raw: any; cityName: string }) {
  const current = raw.current ?? {};
  const hourlyRaw = raw.hourly ?? [];
  const dailyRaw = raw.daily ?? [];

  const weatherCode = current.weather?.[0]?.id ?? 800;
  const weatherMain = (current.weather?.[0]?.main || "Clear").toString().toLowerCase();

  const conditionKey = mapToConditionKey(weatherCode, weatherMain);

  // CONVERSIÓN NUEVA CORREGIDA
  const hourly = hourlyRaw.slice(0, 6).map((h: any) => ({
    label: new Date(h.dt * 1000).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    icon: mapMainToIconKey(h.weather?.[0]?.main ?? "Clouds", h.weather?.[0]?.id ?? 803),
    temp: Math.round(h.temp),
  }));

  const weekly = dailyRaw.slice(0, 7).map((d: any) => ({
    day: new Date(d.dt * 1000)
      .toLocaleDateString("es-MX", { weekday: "short" })
      .replace(".", ""),
    icon: mapMainToIconKey(d.weather?.[0]?.main ?? "Clouds", d.weather?.[0]?.id ?? 803),
    max: Math.round(d.temp.max),
    min: Math.round(d.temp.min),
  }));

  return {
    id: cityName.toLowerCase(),
    name: cityName,
    location: cityName,
    condition: capitalize(conditionKey),
    temp: Math.round(current.temp ?? 0),
    max: Math.round(dailyRaw[0]?.temp?.max ?? current.temp ?? 0),
    min: Math.round(dailyRaw[0]?.temp?.min ?? current.temp ?? 0),
    weatherCode,
    stats: {
      probLluvia: Math.round((dailyRaw[0]?.pop ?? 0) * 100),
      humedad: current.humidity ?? 0,
      viento: Math.round((current.wind_speed ?? 0) * 3.6),
    },
    hourly,
    weekly,
  };
}
