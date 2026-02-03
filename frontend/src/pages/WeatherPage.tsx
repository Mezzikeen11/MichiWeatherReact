import { useEffect, useState } from "react";
import LoaderCat from "../components/Loader/LoaderCat";
import { useParams, useNavigate } from "react-router-dom";
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

export default function WeatherPage() {
  const { selectedCat } = useCat();
  const params = useParams<{ city?: string }>();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<"hoy" | "semana">("hoy");
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  async function loadByName(name: string) {
  try {
    if (loading) return;
    setLoading(true);
    setShowLoader(true); // 🐱 mostrar LoaderCat

    const { raw, cityName } = await getWeatherByCityName(name);
    const norm = normalizeWeather({ raw, cityName });

    // Aseguramos que el loader se muestre al menos 5 segundos
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setCity(norm);
    navigate(`/weather/${encodeURIComponent(cityName)}`, { replace: true });
  } catch (err) {
    console.error(err);
    alert("No se pudo cargar la ciudad.");
  } finally {
    setLoading(false);
    setShowLoader(false); // 🐾 ocultar LoaderCat
  }
}


  useEffect(() => {
    // ✅ IMPORTANTE: no cortar hooks antes, redirigir aquí
    if (!selectedCat) {
      navigate("/select-cat", { replace: true });
      return;
    }

    // Si hay gato, cargamos ciudad
    if (params.city) {
      loadByName(decodeURIComponent(params.city));
    } else {
      loadByName("Cancún, MX");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.city, selectedCat]);

  // Mientras se redirige (evita flicker)
  if (!selectedCat) return null;

 if (loading || !city) {
  return (
    <main className="container-michi flex justify-center items-center min-h-[calc(100vh-160px)]">
      {showLoader && <LoaderCat />}
    </main>
  );
}

  return (
    <main className="container-michi min-h-[calc(100vh-160px)] flex flex-col lg:flex-row items-center justify-center py-10 gap-12">
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <div className="mb-2 w-full px-4 sm:px-0">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--dark)] dark:text-[var(--white)]"></h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--accent)]"></h3>
        </div>

        {/* 🐾 Michi seleccionado */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={selectedCat.image}
            alt={selectedCat.name}
            className="w-16 h-16 rounded-full"
          />
          <span className="font-semibold text-lg">
            {selectedCat.name} te da el clima 🐾
          </span>
        </div>

        <div className="flex justify-center w-full">
          <WeatherCard
            location={city.location}
            condition={city.condition}
            temp={city.temp}
            max={city.max}
            min={city.min}
            weatherCode={city.weatherCode}
            selectedCatId={selectedCat?.id} // <-- aquí le pasamos el gato seleccionado
          />
        </div>
      </div>

      <aside className="flex flex-col items-center gap-8 w-full lg:w-1/2 max-w-[520px]">
        <div className="flex gap-4">
          <button
            onClick={() => setViewMode("hoy")}
            className={`h-10 px-6 rounded-full font-semibold transition-all duration-300 ${
              viewMode === "hoy"
                ? "bg-[var(--accent)] text-white shadow-michi-1"
                : "bg-[var(--panel)] text-[var(--dark)] dark:text-[var(--white)] hover:bg-[var(--accent)]/20"
            }`}
          >
            Hoy
          </button>

          <button
            onClick={() => setViewMode("semana")}
            className={`h-10 px-6 rounded-full font-semibold transition-all duration-300 ${
              viewMode === "semana"
                ? "bg-[var(--accent)] text-white shadow-michi-1"
                : "bg-[var(--panel)] text-[var(--dark)] dark:text-[var(--white)] hover:bg-[var(--accent)]/20"
            }`}
          >
            Semana
          </button>
        </div>

        <div className="w-full overflow-x-auto p-4 rounded-xl bg-[var(--panel)]/50 dark:bg-[var(--glass)] shadow-michi-1 scroll-hidden">
          {viewMode === "hoy" ? (
            <ForecastHourly data={city.hourly ?? []} />
          ) : (
            <ForecastWeekly data={city.weekly ?? []} />
          )}
        </div>

        <Stats
          propLLuvia={city.stats?.probLluvia ?? 0}
          propHumedad={city.stats?.humedad ?? 0}
          propViento={city.stats?.viento ?? 0}
        />
      </aside>
    </main>
  );
}
