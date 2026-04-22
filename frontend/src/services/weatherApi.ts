import { API_ROUTES } from "../config/api";

const geoCache = new Map<string, any>();
const weatherCache = new Map<string, any>();

export async function searchCities(query: string, limit = 5) {
  if (!query || query.trim().length < 2) return [];

  const key = `${query.toLowerCase()}_${limit}`;
  if (geoCache.has(key)) return geoCache.get(key);

  const url = `${API_ROUTES.weather}/search?q=${encodeURIComponent(query)}&limit=${limit}`;
  const res = await fetch(url);

  if (!res.ok) return [];

  const data = await res.json();
  geoCache.set(key, data);
  return data;
}

export async function getWeatherByCityName(cityName: string) {
  const key = cityName.trim().toLowerCase();
  if (weatherCache.has(key)) return weatherCache.get(key);

  const url = `${API_ROUTES.weather}/${encodeURIComponent(cityName)}`;
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Weather API error ${res.status}: ${text}`);
  }

  const raw = await res.json();
  const response = {
    raw,
    cityName: raw.name || cityName,
    lat: raw.lat,
    lon: raw.lon,
  };

  weatherCache.set(key, response);
  return response;
}
