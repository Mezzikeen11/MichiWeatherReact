import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiAlertCircle,
  FiHeart,
  FiMapPin,
  FiRefreshCw,
  FiStar,
} from "react-icons/fi";

import LoaderCat from "../components/Loader/LoaderCat";
import WeatherCard from "../components/WeatherCard";
import ForecastHourly from "../components/ForecastHourly";
import ForecastWeekly from "../components/ForecastWeekly";
import Stats from "../components/Stats";

import { getWeatherByCityName } from "../services/weatherApi";
import { normalizeWeather } from "../utils/normalizeWeather";
import { useCat } from "../context/CatContext";

type City = {
  id: string;
  name: string;
  location: string;
  condition: string;
  temp: number;
  max: number;
  min: number;
  weatherCode?: number;
  stats: { probLluvia: number; humedad: number; viento: number };
  hourly: Array<{ hour: string; temp: number; weatherCode: number }>;
  weekly: Array<{ day: string; max: number; min: number; weatherCode?: number }>;
};

type StoredCityDetail = {
  name: string;
  display?: string;
  country?: string;
  state?: string;
  lat: number;
  lon: number;
  savedAt?: string;
};

const DEFAULT_CITY = "Cancún, MX";

const HISTORY_KEY = "mw-search-history";
const HISTORY_DETAIL_KEY = "mw-search-history-detailed";
const FAVORITES_KEY = "mw-favorite-cities";
const FAVORITES_DETAIL_KEY = "mw-favorite-cities-detailed";
const HOME_CITY_KEY = "mw-home-city";

function readJsonArray<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeJsonArray<T>(key: string, value: T[]) {
  localStorage.setItem(key, JSON.stringify(value));
}

function makeDetailedCityEntry(city: City): StoredCityDetail {
  return {
    name: city.name || city.location,
    display: city.location,
    country: undefined,
    state: undefined,
    lat: 0,
    lon: 0,
    savedAt: new Date().toISOString(),
  };
}

function addToHistory(city: City) {
  const label = city.location.trim();

  const currentSimple = readJsonArray<string>(HISTORY_KEY);
  const currentDetailed = readJsonArray<StoredCityDetail>(HISTORY_DETAIL_KEY);

  const updatedSimple = [
    label,
    ...currentSimple.filter(
      (item) => item.trim().toLowerCase() !== label.toLowerCase()
    ),
  ].slice(0, 10);

  const detailedEntry = makeDetailedCityEntry(city);

  const updatedDetailed = [
    detailedEntry,
    ...currentDetailed.filter(
      (item) =>
        (item.display || item.name).trim().toLowerCase() !==
        label.toLowerCase()
    ),
  ].slice(0, 10);

  writeJsonArray(HISTORY_KEY, updatedSimple);
  writeJsonArray(HISTORY_DETAIL_KEY, updatedDetailed);
}

function getWeatherAdvice(city: City) {
  const temp = city.temp;
  const humidity = city.stats?.humedad ?? 0;
  const rain = city.stats?.probLluvia ?? 0;
  const wind = city.stats?.viento ?? 0;
  const condition = city.condition.toLowerCase();

  const hasStorm =
    condition.includes("torment") ||
    (city.weatherCode !== undefined &&
      city.weatherCode >= 200 &&
      city.weatherCode <= 232);

  const hasRain =
    rain >= 55 ||
    condition.includes("lluv") ||
    condition.includes("chubasco") ||
    (city.weatherCode !== undefined &&
      city.weatherCode >= 500 &&
      city.weatherCode <= 531);

  const hasDrizzle =
    condition.includes("lloviz") ||
    (city.weatherCode !== undefined &&
      city.weatherCode >= 300 &&
      city.weatherCode <= 321);

  if (hasStorm) {
    return "Hay señales de tormenta. Mantén a tu michi dentro de casa, lejos de ventanas abiertas y con una zona tranquila para refugiarse.";
  }

  if (hasRain) {
    return "Con lluvia, revisa que su cama, arenero y zona de descanso se mantengan secos y sin acumulación de humedad.";
  }

  if (hasDrizzle) {
    return "Puede haber llovizna. Ten listo un espacio seco y evita que tu michi permanezca en zonas frías o mojadas.";
  }

  if (temp >= 38) {
    return "El calor es extremo. Mantén a tu michi en un espacio fresco, con agua limpia disponible y evita actividad intensa durante el día.";
  }

  if (temp >= 34) {
    return "Hace mucho calor. Prioriza agua fresca, sombra, ventilación y evita juegos intensos durante las horas más pesadas.";
  }

  if (temp >= 30) {
    return "Día caluroso. Cambia el agua con frecuencia y procura que tu michi tenga un lugar fresco para descansar.";
  }

  if (temp >= 26) {
    return "El clima está cálido. Mantén buena ventilación y revisa que tu michi tenga acceso constante a agua.";
  }

  if (temp <= 5) {
    return "El ambiente está helado. Procura una zona muy abrigada, seca y sin corrientes de aire para tu michi.";
  }

  if (temp <= 10) {
    return "Hace mucho frío. Prepara una cama cálida y evita que tu michi permanezca cerca de ventanas o pisos fríos.";
  }

  if (temp <= 15) {
    return "El ambiente está frío. Prepara una cama abrigada y evita corrientes de aire directas.";
  }

  if (temp <= 20) {
    return "Puede sentirse fresco. Observa si tu michi busca más abrigo o zonas cerradas para descansar.";
  }

  if (wind >= 46) {
    return "El viento está muy fuerte. Evita balcones, ventanas abiertas y objetos que puedan caer o asustar a tu michi.";
  }

  if (wind >= 31) {
    return "El viento está fuerte. Revisa ventanas, balcones y objetos que puedan caer o generar ruido excesivo.";
  }

  if (wind >= 16) {
    return "Hay viento moderado. Conviene mantener a tu michi lejos de corrientes directas y zonas expuestas.";
  }

  if (humidity >= 81) {
    return "La humedad es muy alta. Ventila el espacio, limpia el arenero con más frecuencia y revisa que su cama esté seca.";
  }

  if (humidity >= 66) {
    return "El ambiente está húmedo. Mantén ventilada su zona de descanso y revisa que no se acumule olor o humedad.";
  }

  if (humidity <= 25) {
    return "El ambiente está muy seco. Mantén agua disponible y observa si tu michi busca zonas más frescas o cómodas.";
  }

  if (humidity <= 40) {
    return "El ambiente está seco. Asegura buena hidratación y evita que pase demasiado tiempo en zonas calientes o encerradas.";
  }

  return "El clima está estable. Mantén su rutina normal con agua limpia, descanso cómodo y un momento de juego tranquilo.";
}

export default function WeatherPage() {
  const { selectedCat } = useCat();
  const params = useParams<{ city?: string }>();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<"hoy" | "semana">("hoy");
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  const [homeCity, setHomeCity] = useState<string>("");

  const activeCat = selectedCat ?? {
    id: "Michi",
    name: "Michi",
    image: "",
  };

  const requestedCity = params.city
    ? decodeURIComponent(params.city)
    : DEFAULT_CITY;

  async function loadByName(name: string) {
    try {
      setLoading(true);
      setShowLoader(true);
      setError(null);

      const { raw, cityName } = await getWeatherByCityName(name);
      const norm = normalizeWeather({ raw, cityName });

      setCity(norm);

      if (params.city) {
        const currentParam = decodeURIComponent(params.city)
          .trim()
          .toLowerCase();

        const normalizedCity = cityName.trim().toLowerCase();

        if (currentParam !== normalizedCity) {
          navigate(`/weather/${encodeURIComponent(cityName)}`, {
            replace: true,
          });
        }
      }
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error ? err.message : "No se pudo cargar la ciudad."
      );
    } finally {
      setLoading(false);
      setShowLoader(false);
    }
  }

  useEffect(() => {
    void loadByName(requestedCity);
  }, [params.city]);

  useEffect(() => {
    setFavoriteCities(readJsonArray<string>(FAVORITES_KEY));
    setHomeCity(localStorage.getItem(HOME_CITY_KEY) || "");
  }, [city?.location]);

  useEffect(() => {
    if (!city) return;
    addToHistory(city);
  }, [city?.location]);

  const advice = useMemo(() => {
    if (!city) return null;
    return getWeatherAdvice(city);
  }, [city]);

  const isFavorite = useMemo(() => {
    if (!city?.location) return false;

    return favoriteCities.some(
      (item) => item.trim().toLowerCase() === city.location.trim().toLowerCase()
    );
  }, [favoriteCities, city?.location]);

  const isHomeCity = useMemo(() => {
    if (!city?.location) return false;

    return homeCity.trim().toLowerCase() === city.location.trim().toLowerCase();
  }, [homeCity, city?.location]);

  function handleToggleFavorite() {
    if (!city?.location) return;

    const currentCity = city.location.trim();

    const currentFavoritesSimple = readJsonArray<string>(FAVORITES_KEY);
    const currentFavoritesDetailed =
      readJsonArray<StoredCityDetail>(FAVORITES_DETAIL_KEY);

    const exists = currentFavoritesSimple.some(
      (item) => item.trim().toLowerCase() === currentCity.toLowerCase()
    );

    const updatedSimple = exists
      ? currentFavoritesSimple.filter(
          (item) => item.trim().toLowerCase() !== currentCity.toLowerCase()
        )
      : [currentCity, ...currentFavoritesSimple].slice(0, 12);

    const detailedEntry = makeDetailedCityEntry(city);

    const updatedDetailed = exists
      ? currentFavoritesDetailed.filter(
          (item) =>
            (item.display || item.name).trim().toLowerCase() !==
            currentCity.toLowerCase()
        )
      : [
          detailedEntry,
          ...currentFavoritesDetailed.filter(
            (item) =>
              (item.display || item.name).trim().toLowerCase() !==
              currentCity.toLowerCase()
          ),
        ].slice(0, 12);

    writeJsonArray(FAVORITES_KEY, updatedSimple);
    writeJsonArray(FAVORITES_DETAIL_KEY, updatedDetailed);
    setFavoriteCities(updatedSimple);
  }

  function handleSetHomeCity() {
    if (!city?.location) return;

    localStorage.setItem(HOME_CITY_KEY, city.location);
    setHomeCity(city.location);
  }

  if (loading && !city) {
    return (
      <main className="container-michi flex min-h-[calc(100vh-160px)] items-center justify-center">
        {showLoader && <LoaderCat />}
      </main>
    );
  }

  if (error && !city) {
    return (
      <main className="container-michi flex min-h-[calc(100vh-160px)] items-center justify-center py-10">
        <div className="mw-card w-full max-w-[620px] rounded-3xl p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <FiAlertCircle className="text-xl text-red-500" />
          </div>

          <h2 className="text-2xl font-bold text-[var(--text-strong)]">
            No pudimos cargar el clima
          </h2>

          <p className="mt-3 text-sm text-[var(--text-soft)] sm:text-base">
            {error}
          </p>

          <button
            type="button"
            onClick={() => void loadByName(requestedCity)}
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-[var(--accent)] px-5 font-semibold text-white shadow-michi-1"
          >
            <FiRefreshCw />
            Reintentar
          </button>
        </div>
      </main>
    );
  }

  if (!city) {
    return (
      <main className="container-michi flex min-h-[calc(100vh-160px)] items-center justify-center py-10">
        <div className="mw-card w-full max-w-[620px] rounded-3xl p-6 text-center">
          <h2 className="text-2xl font-bold text-[var(--text-strong)]">
            Busca una ciudad para ver el clima
          </h2>

          <p className="mt-3 text-sm text-[var(--text-soft)] sm:text-base">
            Puedes empezar por Cancún o usar el buscador del menú superior para
            consultar otra ciudad.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container-michi flex min-h-[calc(100vh-160px)] flex-col items-center justify-center gap-10 py-10 lg:flex-row lg:items-start lg:gap-12">
      <div className="flex w-full min-w-0 flex-col items-center lg:w-1/2">
        <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
          {selectedCat ? (
            <div className="mw-surface-soft inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-[var(--text-soft)] shadow-michi-1">
              <FiHeart className="text-[var(--accent)]" />
              {selectedCat.name} activo
            </div>
          ) : (
            <>
              <div className="mw-surface-soft inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-[var(--text-soft)] shadow-michi-1">
                <FiHeart className="text-[var(--accent)]" />
                Modo visita activado
              </div>

              <Link
                to="/auth"
                className="mw-surface-soft inline-flex h-10 items-center rounded-full px-5 font-semibold text-[var(--text-strong)] shadow-michi-1 transition hover:bg-[var(--accent-soft)]"
              >
                Iniciar sesión para personalizar
              </Link>
            </>
          )}
        </div>

        <div className="flex w-full min-w-0 justify-center">
          <WeatherCard
            location={city.location}
            condition={city.condition}
            temp={city.temp}
            max={city.max}
            min={city.min}
            weatherCode={city.weatherCode}
            selectedCatId={activeCat.id}
          />
        </div>
      </div>

      <aside className="flex w-full min-w-0 max-w-[520px] flex-col items-center gap-6 lg:mt-16 lg:w-1/2">
        {advice && (
          <div className="mw-card w-full rounded-3xl p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
              Consejo del día
            </p>

            <p className="mt-2 text-sm leading-6 text-[var(--text-strong)]">
              {advice}
            </p>
          </div>
        )}

        <div className="flex w-full flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              isFavorite
                ? "bg-[var(--accent)] text-white shadow-michi-1"
                : "mw-surface-soft text-[var(--text-strong)] shadow-michi-1 hover:bg-[var(--accent-soft)]"
            }`}
          >
            <FiStar />
            {isFavorite ? "Favorita" : "Guardar favorita"}
          </button>

          <button
            type="button"
            onClick={handleSetHomeCity}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              isHomeCity
                ? "bg-[var(--accent)] text-white shadow-michi-1"
                : "mw-surface-soft text-[var(--text-strong)] shadow-michi-1 hover:bg-[var(--accent-soft)]"
            }`}
          >
            <FiMapPin />
            {isHomeCity ? "Ciudad principal" : "Marcar principal"}
          </button>
        </div>

        <div className="flex w-full flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setViewMode("hoy")}
            className={`h-10 min-w-[96px] whitespace-nowrap rounded-full px-6 font-semibold transition-all duration-300 ${
              viewMode === "hoy"
                ? "bg-[var(--accent)] text-white shadow-michi-1"
                : "mw-surface-soft text-[var(--text-strong)] hover:bg-[var(--accent-soft)]"
            }`}
          >
            Hoy
          </button>

          <button
            type="button"
            onClick={() => setViewMode("semana")}
            className={`h-10 min-w-[96px] whitespace-nowrap rounded-full px-6 font-semibold transition-all duration-300 ${
              viewMode === "semana"
                ? "bg-[var(--accent)] text-white shadow-michi-1"
                : "mw-surface-soft text-[var(--text-strong)] hover:bg-[var(--accent-soft)]"
            }`}
          >
            Semana
          </button>
        </div>

        <div className="mw-card w-full max-w-full min-w-0 rounded-3xl p-1">
          <div className="px-4 pt-4">
            <p className="text-sm font-semibold text-[var(--accent)]">
              {viewMode === "hoy"
                ? "Pronóstico por horario"
                : "Pronóstico semanal"}
            </p>
          </div>

          <div className="forecast-scrollbar w-full overflow-x-auto px-4 pb-3 pt-4">
            {viewMode === "hoy" ? (
              <ForecastHourly data={city.hourly ?? []} />
            ) : (
              <ForecastWeekly data={city.weekly ?? []} />
            )}
          </div>
        </div>

        <Stats
          propLLuvia={city.stats?.probLluvia ?? 0}
          propHumedad={city.stats?.humedad ?? 0}
          propViento={city.stats?.viento ?? 0}
        />

        {error && (
          <div className="w-full rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700">
            Se mostró la última ciudad cargada correctamente, pero hubo un
            problema al actualizar: {error}
          </div>
        )}
      </aside>
    </main>
  );
}