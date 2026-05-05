import { Link } from "react-router-dom";
import { FiHome, FiMapPin, FiStar } from "react-icons/fi";

export type FavoriteCityItem = {
  name: string;
  display?: string;
  country?: string;
  state?: string;
  lat: number;
  lon: number;
  savedAt?: string;
};

type FavoriteCitiesProps = {
  cities: FavoriteCityItem[];
  homeCity?: string;
};

function getCityLabel(city: FavoriteCityItem) {
  return city.display || city.name;
}

export default function FavoriteCities({
  cities,
  homeCity = "",
}: FavoriteCitiesProps) {
  if (!cities.length) {
    return (
      <div className="rounded-2xl bg-[var(--panel2)] p-4">
        <p className="text-[var(--text-soft)]">
          Aún no tienes ciudades favoritas guardadas.
        </p>
        <p className="mt-2 text-sm text-[var(--text-soft)]">
          Puedes guardarlas desde el buscador o desde la página del clima.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {cities.map((city, index) => {
        const label = getCityLabel(city);
        const isHome =
          homeCity.trim().toLowerCase() === label.trim().toLowerCase();

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
                  {[city.state, city.country].filter(Boolean).join(", ") ||
                    "Ubicación guardada"}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--panel)] px-3 py-1 text-xs text-[var(--text-soft)]">
                    <FiStar className="text-[var(--accent)]" />
                    Favorita
                  </span>

                  {isHome && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--panel)] px-3 py-1 text-xs text-[var(--text-soft)]">
                      <FiHome className="text-[var(--accent)]" />
                      Ciudad principal
                    </span>
                  )}

                  {!isHome && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--panel)] px-3 py-1 text-xs text-[var(--text-soft)]">
                      <FiMapPin className="text-[var(--accent)]" />
                      Consulta rápida
                    </span>
                  )}
                </div>
              </div>

              <FiStar className="mt-1 shrink-0 text-[var(--accent)]" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}