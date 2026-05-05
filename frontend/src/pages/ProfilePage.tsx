import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiClock,
  FiHeart,
  FiLogOut,
  FiMail,
  FiMapPin,
  FiUser,
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";
import { useCat } from "../context/CatContext";
import FavoriteCities, {
  type FavoriteCityItem,
} from "../components/FavoriteCities";

type StoredCityDetail = {
  name: string;
  display?: string;
  country?: string;
  state?: string;
  lat: number;
  lon: number;
  savedAt?: string;
};

type ProfileStorageData = {
  homeCity: string;
  favorites: FavoriteCityItem[];
  history: StoredCityDetail[];
};

const HOME_CITY_KEY = "mw-home-city";
const FAVORITES_KEY = "mw-favorite-cities";
const FAVORITES_DETAIL_KEY = "mw-favorite-cities-detailed";
const HISTORY_KEY = "mw-search-history";
const HISTORY_DETAIL_KEY = "mw-search-history-detailed";

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

function formatDate(value?: string) {
  if (!value) return "Sin fecha";

  try {
    return new Intl.DateTimeFormat("es-MX", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "Sin fecha";
  }
}

function normalizeSimpleCity(item: string): StoredCityDetail {
  return {
    name: item,
    display: item,
    country: undefined,
    state: undefined,
    lat: 0,
    lon: 0,
    savedAt: undefined,
  };
}

function getCityLabel(city: StoredCityDetail) {
  return (city.display || city.name || "").trim();
}

function mergeCities(
  detailedCities: StoredCityDetail[],
  simpleCities: string[]
): StoredCityDetail[] {
  const citiesMap = new Map<string, StoredCityDetail>();

  detailedCities.forEach((city) => {
    const label = getCityLabel(city);
    const key = label.toLowerCase();

    if (!key) return;

    citiesMap.set(key, city);
  });

  simpleCities.forEach((cityName) => {
    const normalized = normalizeSimpleCity(cityName);
    const label = getCityLabel(normalized);
    const key = label.toLowerCase();

    if (!key) return;

    if (!citiesMap.has(key)) {
      citiesMap.set(key, normalized);
    }
  });

  return Array.from(citiesMap.values());
}

function readProfileStorageData(): ProfileStorageData {
  const homeCity = localStorage.getItem(HOME_CITY_KEY) || "";

  const favoriteCitiesDetailed =
    readJsonArray<StoredCityDetail>(FAVORITES_DETAIL_KEY);
  const favoriteCitiesSimple = readJsonArray<string>(FAVORITES_KEY);

  const searchHistoryDetailed =
    readJsonArray<StoredCityDetail>(HISTORY_DETAIL_KEY);
  const searchHistorySimple = readJsonArray<string>(HISTORY_KEY);

  const favorites = mergeCities(
    favoriteCitiesDetailed,
    favoriteCitiesSimple
  ) as FavoriteCityItem[];

  const history = mergeCities(searchHistoryDetailed, searchHistorySimple);

  return {
    homeCity,
    favorites,
    history,
  };
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { selectedCat } = useCat();

  const [profileData, setProfileData] = useState<ProfileStorageData>(() =>
    readProfileStorageData()
  );

  const refreshProfileData = useCallback(() => {
    setProfileData(readProfileStorageData());
  }, []);

  useEffect(() => {
    refreshProfileData();

    window.addEventListener("focus", refreshProfileData);
    window.addEventListener("storage", refreshProfileData);

    return () => {
      window.removeEventListener("focus", refreshProfileData);
      window.removeEventListener("storage", refreshProfileData);
    };
  }, [refreshProfileData]);

  const userInitial = user?.nombre?.trim()?.charAt(0)?.toUpperCase() || "M";

  return (
    <section className="container-michi py-10">
      <div className="mx-auto grid max-w-5xl gap-6">
        <div className="rounded-3xl bg-[var(--panel)] p-6 shadow-michi-1 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent)] text-3xl font-extrabold text-white shadow-michi-1">
                {userInitial}
              </div>

              <div>
                <p className="mb-1 text-sm text-[var(--text-soft)]">
                  Mi perfil
                </p>

                <h1 className="text-3xl font-bold text-[var(--text-strong)]">
                  {user?.nombre || "Usuario"}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[var(--text-soft)]">
                  <span className="inline-flex items-center gap-2">
                    <FiMail className="text-[var(--accent)]" />
                    {user?.email || "Sin correo"}
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--panel2)] px-3 py-1 shadow-michi-1">
                    <FiUser className="text-[var(--accent)]" />
                    Sesión activa
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/mi-michi"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 font-semibold text-white shadow-michi-1 transition hover:brightness-105"
              >
                <FiHeart />
                Cambiar michi
              </Link>

              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] px-4 py-2 font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
              >
                <FiLogOut />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-[var(--panel)] p-6 shadow-michi-1">
            <p className="mb-3 text-sm text-[var(--text-soft)]">
              Michi preferido
            </p>

            {selectedCat ? (
              <div className="flex items-center gap-4">
                <img
                  src={selectedCat.image}
                  alt={selectedCat.name}
                  className="h-20 w-20 rounded-2xl object-cover shadow-michi-1"
                />

                <div>
                  <h2 className="text-xl font-semibold text-[var(--text-strong)]">
                    {selectedCat.name}
                  </h2>

                  <p className="mt-1 text-sm text-[var(--text-soft)]">
                    Este michi personaliza tu experiencia en la app.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-[var(--text-soft)]">
                  Aún no has seleccionado un michi.
                </p>

                <Link
                  to="/mi-michi"
                  className="inline-flex rounded-full bg-[var(--accent)] px-4 py-2 font-semibold text-white shadow-michi-1 transition hover:brightness-105"
                >
                  Elegir michi
                </Link>
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-[var(--panel)] p-6 shadow-michi-1">
            <p className="mb-3 text-sm text-[var(--text-soft)]">
              Ciudad principal
            </p>

            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-full bg-[var(--panel2)] p-2 shadow-michi-1">
                <FiMapPin className="text-[var(--accent)]" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[var(--text-strong)]">
                  {profileData.homeCity || "Aún no definida"}
                </h2>

                <p className="mt-1 text-sm text-[var(--text-soft)]">
                  Tu ciudad principal para futuras consultas rápidas.
                </p>

                {!profileData.homeCity && (
                  <Link
                    to="/"
                    className="mt-3 inline-flex rounded-full bg-[var(--panel2)] px-4 py-2 text-sm font-semibold text-[var(--text-strong)] shadow-michi-1 transition hover:bg-[var(--accent)]/10"
                  >
                    Buscar ciudad
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[var(--panel)] p-6 shadow-michi-1">
            <p className="mb-3 text-sm text-[var(--text-soft)]">
              Resumen rápido
            </p>

            <div className="grid gap-3">
              <div className="flex items-center justify-between rounded-2xl bg-[var(--panel2)] px-4 py-3">
                <span className="inline-flex items-center gap-2 text-[var(--text-soft)]">
                  <FiHeart className="text-[var(--accent)]" />
                  Personalización
                </span>

                <strong className="text-[var(--text-strong)]">
                  {selectedCat ? "Activa" : "Pendiente"}
                </strong>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-[var(--panel2)] px-4 py-3">
                <span className="inline-flex items-center gap-2 text-[var(--text-soft)]">
                  <FiMapPin className="text-[var(--accent)]" />
                  Favoritas
                </span>

                <strong className="text-[var(--text-strong)]">
                  {profileData.favorites.length}
                </strong>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-[var(--panel2)] px-4 py-3">
                <span className="inline-flex items-center gap-2 text-[var(--text-soft)]">
                  <FiClock className="text-[var(--accent)]" />
                  Historial
                </span>

                <strong className="text-[var(--text-strong)]">
                  {profileData.history.length}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-[var(--panel)] p-6 shadow-michi-1">
            <div className="mb-4">
              <p className="text-sm text-[var(--text-soft)]">
                Ciudades favoritas
              </p>

              <h2 className="text-2xl font-bold text-[var(--text-strong)]">
                Tus ubicaciones guardadas
              </h2>
            </div>

            <FavoriteCities
              cities={profileData.favorites}
              homeCity={profileData.homeCity}
            />
          </div>

          <div className="rounded-3xl bg-[var(--panel)] p-6 shadow-michi-1">
            <div className="mb-4">
              <p className="text-sm text-[var(--text-soft)]">
                Historial reciente
              </p>

              <h2 className="text-2xl font-bold text-[var(--text-strong)]">
                Últimas búsquedas
              </h2>
            </div>

            {profileData.history.length > 0 ? (
              <div className="grid gap-3">
                {profileData.history.slice(0, 8).map((item, index) => {
                  const label = item.display || item.name;

                  return (
                    <Link
                      key={`${label}-${index}`}
                      to={`/weather/${encodeURIComponent(label)}`}
                      className="block rounded-2xl bg-[var(--panel2)] px-4 py-3 shadow-michi-1 transition hover:bg-[var(--accent)]/10"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-[var(--text-strong)]">
                            {label}
                          </p>

                          <p className="mt-1 truncate text-sm text-[var(--text-soft)]">
                            {[item.state, item.country]
                              .filter(Boolean)
                              .join(", ") || "Consulta guardada"}
                          </p>
                        </div>

                        <span className="shrink-0 text-xs text-[var(--text-soft)]">
                          {formatDate(item.savedAt)}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl bg-[var(--panel2)] p-4">
                <p className="text-[var(--text-soft)]">
                  Todavía no hay historial disponible.
                </p>

                <p className="mt-2 text-sm text-[var(--text-soft)]">
                  Tus consultas recientes aparecerán aquí automáticamente.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl bg-[var(--panel)] p-6 shadow-michi-1">
          <p className="mb-2 text-sm text-[var(--text-soft)]">
            Acciones rápidas
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center rounded-full bg-[var(--panel2)] px-4 py-2 font-medium text-[var(--text-strong)] shadow-michi-1 transition hover:bg-[var(--accent)]/10"
            >
              Ir al clima
            </Link>

            <Link
              to="/mi-michi"
              className="inline-flex items-center rounded-full bg-[var(--panel2)] px-4 py-2 font-medium text-[var(--text-strong)] shadow-michi-1 transition hover:bg-[var(--accent)]/10"
            >
              Elegir otro michi
            </Link>

            <Link
              to="/cuidados"
              className="inline-flex items-center rounded-full bg-[var(--panel2)] px-4 py-2 font-medium text-[var(--text-strong)] shadow-michi-1 transition hover:bg-[var(--accent)]/10"
            >
              Ver cuidados
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}