const baseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();

export const API_BASE_URL = (baseUrl && baseUrl.length > 0
  ? baseUrl
  : "http://localhost:10000").replace(/\/$/, "");

export const API_ROUTES = {
  auth: `${API_BASE_URL}/api/auth`,
  weather: `${API_BASE_URL}/api/weather`,
};
