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

  if (rain >= 60 || condition.includes("lluv")) {
    return "Mantén a tu michi en un lugar seco y revisa que su zona de descanso no tenga humedad.";
  }

  if (temp >= 33) {
    return "Hoy dale prioridad a sombra, agua fresca y un espacio ventilado para descansar.";
  }

  if (temp <= 15) {
    return "Si refresca mucho, procura una cama cómoda y evita corrientes de aire directas.";
  }

  if (wind >= 28) {
    return "Con viento fuerte, mejor descanso interior y menos acceso a zonas riesgosas.";
  }

  if (humidity >= 80) {
    return "Con mucha humedad, ventila el espacio y mantén limpio el arenero y la cama.";
  }

  return "Es un buen día para mantener rutina, hidratación y algo de juego tranquilo.";
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
        const currentParam = decodeURIComponent(params.city).trim().toLowerCase();
        const normalizedCity = cityName.trim().toLowerCase();

        if (currentParam !== normalizedCity) {
          navigate(`/weather/${encodeURIComponent(cityName)}`, { replace: true });
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
      <main className="container-michi flex justify-center items-center min-h-[calc(100vh-160px)]">
        {showLoader && <LoaderCat />}
      </main>
    );
  }

  if (error && !city) {
    return (
      <main className="container-michi min-h-[calc(100vh-160px)] flex items-center justify-center py-10">
        <div className="w-full max-w-[620px] rounded-2xl bg-[var(--panel)] p-6 shadow-michi-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <FiAlertCircle className="text-red-500 text-xl" />
          </div>

          <h2 className="text-2xl font-bold text-[var(--text-strong)]">
            No pudimos cargar el clima
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[var(--text-soft)]">
            {error}
          </p>

          <button
            type="button"
            onClick={() => void loadByName(requestedCity)}
            className="mt-5 inline-flex items-center gap-2 h-10 px-5 rounded-full bg-[var(--accent)] text-white font-semibold shadow-michi-1"
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
      <main className="container-michi min-h-[calc(100vh-160px)] flex items-center justify-center py-10">
        <div className="w-full max-w-[620px] rounded-2xl bg-[var(--panel)] p-6 shadow-michi-1 text-center">
          <h2 className="text-2xl font-bold text-[var(--text-strong)]">
            Busca una ciudad para ver el clima
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[var(--text-soft)]">
            Puedes empezar por Cancún o usar el buscador del menú superior para
            consultar otra ciudad.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container-michi min-h-[calc(100vh-160px)] flex flex-col lg:flex-row items-center lg:items-start justify-center py-10 gap-10 lg:gap-12">
      <div className="w-full lg:w-1/2 min-w-0 flex flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
          {selectedCat ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--panel)] px-4 py-2 text-sm text-[var(--text-soft)] shadow-michi-1">
              <FiHeart className="text-[var(--accent)]" />
              {selectedCat.name} activo
            </div>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--panel)] px-4 py-2 text-sm text-[var(--text-soft)] shadow-michi-1">
                <FiHeart className="text-[var(--accent)]" />
                Modo visita activado
              </div>

              <Link
                to="/auth"
                className="inline-flex items-center h-10 px-5 rounded-full bg-[var(--panel)] text-[var(--text-strong)] font-semibold shadow-michi-1 hover:bg-[var(--accent)]/10 transition"
              >
                Iniciar sesión para personalizar
              </Link>
            </>
          )}
        </div>

        <div className="flex justify-center w-full min-w-0">
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

      <aside className="flex flex-col items-center gap-6 w-full lg:w-1/2 max-w-[520px] min-w-0 lg:mt-16">
        {advice && (
          <div className="w-full rounded-2xl bg-[var(--panel)]/80 p-4 shadow-michi-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
              Consejo del día
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-strong)]">
              {advice}
            </p>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3 w-full">
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              isFavorite
                ? "bg-[var(--accent)] text-white shadow-michi-1"
                : "bg-[var(--panel)] text-[var(--text-strong)] shadow-michi-1 hover:bg-[var(--accent)]/10"
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
                : "bg-[var(--panel)] text-[var(--text-strong)] shadow-michi-1 hover:bg-[var(--accent)]/10"
            }`}
          >
            <FiMapPin />
            {isHomeCity ? "Ciudad principal" : "Marcar principal"}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 w-full">
          <button
            onClick={() => setViewMode("hoy")}
            className={`h-10 min-w-[96px] px-6 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${
              viewMode === "hoy"
                ? "bg-[var(--accent)] text-white shadow-michi-1"
                : "bg-[var(--panel)] text-[var(--text-strong)] hover:bg-[var(--accent)]/20"
            }`}
          >
            Hoy
          </button>

          <button
            onClick={() => setViewMode("semana")}
            className={`h-10 min-w-[96px] px-6 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${
              viewMode === "semana"
                ? "bg-[var(--accent)] text-white shadow-michi-1"
                : "bg-[var(--panel)] text-[var(--text-strong)] hover:bg-[var(--accent)]/20"
            }`}
          >
            Semana
          </button>
        </div>

        <div className="w-full max-w-full rounded-xl bg-[var(--panel)]/55 shadow-michi-1 min-w-0">
          <div className="px-4 pt-4">
            <p className="text-sm font-semibold text-[var(--accent)]">
              {viewMode === "hoy" ? "Pronóstico por horario" : "Pronóstico semanal"}
            </p>
          </div>

          <div className="forecast-scrollbar w-full overflow-x-auto px-4 pt-4 pb-3">
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
