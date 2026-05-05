import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import {
  FiClock,
  FiMapPin,
  FiSearch,
  FiStar,
} from "react-icons/fi";
import { searchCities } from "../services/weatherApi";

type CityResult = {
  name: string;
  display?: string;
  country?: string;
  state?: string;
  lat: number;
  lon: number;
};

type StoredCityDetail = CityResult & {
  savedAt: string;
};

type SearchBarProps = {
  onSelectCity: (city: string) => void;
  autoFocus?: boolean;
};

const HISTORY_KEY = "mw-search-history";
const HISTORY_DETAIL_KEY = "mw-search-history-detailed";
const FAVORITES_KEY = "mw-favorite-cities";
const FAVORITES_DETAIL_KEY = "mw-favorite-cities-detailed";

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

function getCityLabel(city: CityResult | StoredCityDetail) {
  return city.display || city.name;
}

function sameCity(a: CityResult | StoredCityDetail, b: CityResult | StoredCityDetail) {
  if (typeof a.lat === "number" && typeof b.lat === "number") {
    return a.lat === b.lat && a.lon === b.lon;
  }

  return getCityLabel(a).trim().toLowerCase() === getCityLabel(b).trim().toLowerCase();
}

function saveDetailedHistory(city: CityResult) {
  const now = new Date().toISOString();
  const simpleLabel = getCityLabel(city);

  const currentSimple = readJsonArray<string>(HISTORY_KEY);
  const currentDetailed = readJsonArray<StoredCityDetail>(HISTORY_DETAIL_KEY);

  const updatedSimple = [
    simpleLabel,
    ...currentSimple.filter(
      (item) => item.trim().toLowerCase() !== simpleLabel.trim().toLowerCase()
    ),
  ].slice(0, 10);

  const detailedEntry: StoredCityDetail = {
    ...city,
    savedAt: now,
  };

  const updatedDetailed = [
    detailedEntry,
    ...currentDetailed.filter((item) => !sameCity(item, city)),
  ].slice(0, 10);

  writeJsonArray(HISTORY_KEY, updatedSimple);
  writeJsonArray(HISTORY_DETAIL_KEY, updatedDetailed);
}

function toggleDetailedFavorite(city: CityResult) {
  const simpleLabel = getCityLabel(city);

  const currentSimple = readJsonArray<string>(FAVORITES_KEY);
  const currentDetailed = readJsonArray<StoredCityDetail>(FAVORITES_DETAIL_KEY);

  const exists = currentDetailed.some((item) => sameCity(item, city));

  if (exists) {
    const updatedSimple = currentSimple.filter(
      (item) => item.trim().toLowerCase() !== simpleLabel.trim().toLowerCase()
    );
    const updatedDetailed = currentDetailed.filter((item) => !sameCity(item, city));

    writeJsonArray(FAVORITES_KEY, updatedSimple);
    writeJsonArray(FAVORITES_DETAIL_KEY, updatedDetailed);
    return false;
  }

  const favoriteEntry: StoredCityDetail = {
    ...city,
    savedAt: new Date().toISOString(),
  };

  const updatedSimple = [simpleLabel, ...currentSimple].filter(
    (item, index, arr) =>
      arr.findIndex((x) => x.trim().toLowerCase() === item.trim().toLowerCase()) === index
  ).slice(0, 12);

  const updatedDetailed = [
    favoriteEntry,
    ...currentDetailed.filter((item) => !sameCity(item, city)),
  ].slice(0, 12);

  writeJsonArray(FAVORITES_KEY, updatedSimple);
  writeJsonArray(FAVORITES_DETAIL_KEY, updatedDetailed);
  return true;
}

export default function SearchBar({
  onSelectCity,
  autoFocus = false,
}: SearchBarProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CityResult[]>([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [favoriteCities, setFavoriteCities] = useState<StoredCityDetail[]>([]);
  const [recentHistory, setRecentHistory] = useState<StoredCityDetail[]>([]);

  function refreshStoredData() {
    setFavoriteCities(readJsonArray<StoredCityDetail>(FAVORITES_DETAIL_KEY));
    setRecentHistory(readJsonArray<StoredCityDetail>(HISTORY_DETAIL_KEY));
  }

  useEffect(() => {
    refreshStoredData();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(async () => {
      const value = query.trim();

      if (value.length < 2) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await searchCities(value);
        setResults(res || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 220);

    return () => window.clearTimeout(timeout);
  }, [query]);

  const showQuickAccess = query.trim().length < 2;

  const emptyMessage = useMemo(() => {
    if (query.trim().length < 2) {
      return "Escribe al menos 2 letras para buscar.";
    }
    if (loading) return "Buscando ciudades...";
    return "No encontramos coincidencias.";
  }, [loading, query]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setShow(true);
  }

  function handleSelect(city: CityResult | StoredCityDetail) {
    const cityQuery = getCityLabel(city);
    const normalizedCity: CityResult = {
      name: city.name,
      display: city.display,
      country: city.country,
      state: city.state,
      lat: city.lat,
      lon: city.lon,
    };

    saveDetailedHistory(normalizedCity);
    refreshStoredData();

    setQuery(cityQuery);
    setResults([]);
    setShow(false);
    onSelectCity(cityQuery);
  }

  function handleToggleFavorite(
    event: React.MouseEvent<HTMLButtonElement>,
    city: CityResult | StoredCityDetail
  ) {
    event.stopPropagation();

    const normalizedCity: CityResult = {
      name: city.name,
      display: city.display,
      country: city.country,
      state: city.state,
      lat: city.lat,
      lon: city.lon,
    };

    toggleDetailedFavorite(normalizedCity);
    refreshStoredData();
  }

  function isFavorite(city: CityResult | StoredCityDetail) {
    return favoriteCities.some((item) => sameCity(item, city));
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-[420px]">
      <div className="flex items-center gap-2 rounded-full bg-[var(--white)]/70 px-3 py-2 shadow-michi-1 backdrop-blur-sm">
        <FiSearch className="shrink-0 text-[var(--accent)]" />

        <input
          autoFocus={autoFocus}
          value={query}
          onChange={handleChange}
          onFocus={() => {
            setShow(true);
            refreshStoredData();
          }}
          placeholder="Buscar ciudad..."
          className="w-full rounded-full bg-transparent text-sm text-[var(--text-strong)] outline-none placeholder:text-[var(--text-soft)]"
          aria-label="Buscar ciudad"
        />
      </div>

      {show && (
        <div className="absolute left-0 right-0 z-50 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-michi-1">
          {showQuickAccess ? (
            <div className="p-2">
              {favoriteCities.length > 0 && (
                <div className="mb-3">
                  <p className="px-2 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                    Favoritas
                  </p>

                  <div className="space-y-1">
                    {favoriteCities.slice(0, 4).map((city, index) => (
                      <div
                        key={`${city.lat}-${city.lon}-${index}`}
                        className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-[var(--accent)]/10"
                      >
                        <button
                          type="button"
                          onClick={() => handleSelect(city)}
                          className="flex min-w-0 flex-1 items-start gap-3 py-2 text-left"
                        >
                          <span className="mt-0.5 rounded-full bg-[var(--accent)]/10 p-2 text-[var(--accent)]">
                            <FiStar />
                          </span>

                          <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold text-[var(--text-strong)]">
                              {getCityLabel(city)}
                            </span>
                            <span className="block truncate text-xs text-[var(--text-soft)]">
                              {[city.state, city.country].filter(Boolean).join(", ")}
                            </span>
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={(event) => handleToggleFavorite(event, city)}
                          className="rounded-full p-2 text-[var(--accent)] transition hover:bg-[var(--accent)]/10"
                          aria-label="Quitar de favoritas"
                        >
                          <FiStar />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {recentHistory.length > 0 && (
                <div>
                  <p className="px-2 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                    Búsquedas recientes
                  </p>

                  <div className="space-y-1">
                    {recentHistory.slice(0, 5).map((city, index) => (
                      <div
                        key={`${city.lat}-${city.lon}-${index}`}
                        className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-[var(--accent)]/10"
                      >
                        <button
                          type="button"
                          onClick={() => handleSelect(city)}
                          className="flex min-w-0 flex-1 items-start gap-3 py-2 text-left"
                        >
                          <span className="mt-0.5 rounded-full bg-[var(--accent)]/10 p-2 text-[var(--accent)]">
                            <FiClock />
                          </span>

                          <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold text-[var(--text-strong)]">
                              {getCityLabel(city)}
                            </span>
                            <span className="block truncate text-xs text-[var(--text-soft)]">
                              {[city.state, city.country].filter(Boolean).join(", ")}
                            </span>
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={(event) => handleToggleFavorite(event, city)}
                          className={`rounded-full p-2 transition ${
                            isFavorite(city)
                              ? "text-[var(--accent)]"
                              : "text-[var(--text-soft)] hover:text-[var(--accent)]"
                          }`}
                          aria-label="Guardar en favoritas"
                        >
                          <FiStar />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {favoriteCities.length === 0 && recentHistory.length === 0 && (
                <div className="px-4 py-4 text-sm text-[var(--text-soft)]">
                  {emptyMessage}
                </div>
              )}
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((city, index) => (
                <div
                  key={`${city.lat}-${city.lon}-${index}`}
                  className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-[var(--accent)]/10"
                >
                  <button
                    type="button"
                    onClick={() => handleSelect(city)}
                    className="flex min-w-0 flex-1 items-start gap-3 py-2 text-left"
                  >
                    <span className="mt-0.5 rounded-full bg-[var(--accent)]/10 p-2 text-[var(--accent)]">
                      <FiMapPin />
                    </span>

                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-[var(--text-strong)]">
                        {city.name}
                      </span>
                      <span className="block truncate text-xs text-[var(--text-soft)]">
                        {city.display ||
                          `${city.name}${city.country ? `, ${city.country}` : ""}`}
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={(event) => handleToggleFavorite(event, city)}
                    className={`rounded-full p-2 transition ${
                      isFavorite(city)
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-soft)] hover:text-[var(--accent)]"
                    }`}
                    aria-label="Guardar en favoritas"
                  >
                    <FiStar />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-4 text-sm text-[var(--text-soft)]">
              {emptyMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}