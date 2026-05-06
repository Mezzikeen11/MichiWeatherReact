import { weatherCardMap } from "../utils/weatherCardMap";

interface WeatherCardProps {
  location: string;
  condition: string;
  temp: number;
  max: number;
  min: number;
  weatherCode?: number;
  selectedCatId?: string;
}

function inferWeatherKey(condition: string, weatherCode?: number) {
  if (typeof weatherCode === "number") {
    if (weatherCode === 800) return "soleado";
    if (weatherCode >= 801 && weatherCode <= 803) return "parcial";
    if (weatherCode === 804) return "nublado";
    if (weatherCode >= 200 && weatherCode <= 232) return "tormenta";
    if (weatherCode >= 300 && weatherCode <= 321) return "llovizna";
    if (weatherCode >= 500 && weatherCode <= 531) return "lluvioso";
    if (weatherCode >= 600 && weatherCode <= 622) return "nieve";
    if (weatherCode >= 701 && weatherCode <= 781) return "niebla";
    return "nublado";
  }

  const normalized = condition.trim().toLowerCase();

  if (normalized.includes("sol")) return "soleado";
  if (normalized.includes("parcial")) return "parcial";
  if (normalized.includes("nub")) return "nublado";
  if (normalized.includes("torment")) return "tormenta";
  if (normalized.includes("lloviz")) return "llovizna";
  if (normalized.includes("lluv")) return "lluvioso";
  if (normalized.includes("niev")) return "nieve";

  if (
    normalized.includes("niebla") ||
    normalized.includes("bruma") ||
    normalized.includes("neblina")
  ) {
    return "niebla";
  }

  return "nublado";
}

export default function WeatherCard({
  location,
  condition,
  temp,
  max,
  min,
  weatherCode,
  selectedCatId = "Michi",
}: WeatherCardProps) {
  const keyFromCode = inferWeatherKey(condition, weatherCode);

  const catPrefixMap: Record<string, string> = {
    Kuro: "Michi",
    Misha: "Misha",
    Aurora: "Aurora",
    Michi: "Michi",
  };

  const suffixMap: Record<string, string> = {
    soleado: "Sol",
    parcial: "Parcial",
    nublado: "Nublado",
    lluvioso: "Lluvia",
    llovizna: "Parcial",
    tormenta: "Nublado",
    nieve: "Nublado",
    niebla: "Nublado",
  };

  const prefix =
    catPrefixMap[selectedCatId ?? "Michi"] ?? selectedCatId ?? "Michi";

  const suffix = suffixMap[keyFromCode] ?? "Nublado";
  const catKey = `${prefix}${suffix}`;

  const { fondo, michi } =
    weatherCardMap[keyFromCode]?.[catKey] ??
    weatherCardMap["nublado"]?.["MichiNublado"] ??
    {};

  return (
    <div className="relative mx-auto flex w-full max-w-[540px] min-w-0 flex-col items-center text-center">
      <div className="mb-2 w-full px-4 sm:px-0">
        <h2 className="text-4xl font-extrabold leading-tight text-[var(--text-strong)] sm:text-5xl md:text-6xl">
          {location}
        </h2>

        <h3 className="mt-2 text-2xl font-semibold text-[var(--accent)] sm:text-3xl md:text-4xl">
          {condition}
        </h3>
      </div>

      <div className="mw-surface-soft relative mx-auto flex h-[250px] w-[250px] items-center justify-center overflow-hidden rounded-full bg-transparent shadow-michi-1 sm:h-[340px] sm:w-[340px] md:h-[420px] md:w-[420px]">
        {fondo ? (
          <img
            src={fondo}
            alt={`Fondo del clima: ${condition}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[var(--accent-soft)]" />
        )}

        {michi ? (
          <img
            src={michi}
            alt={`Michi para clima ${condition}`}
            className="absolute bottom-[2%] left-[8%] w-[150px] object-contain sm:w-[185px] md:w-[235px] lg:w-[250px]"
          />
        ) : (
          <div className="z-10 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-bold text-[var(--accent)]">
            MichiWeather
          </div>
        )}

        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/5 via-transparent to-white/5" />
      </div>

      <div className="mt-3 flex w-full max-w-[460px] flex-wrap items-center justify-center gap-6 px-4 sm:px-10">
        <div>
          <h1 className="text-[76px] font-extrabold leading-none text-[var(--text-strong)] md:text-[96px]">
            {temp}°
          </h1>
        </div>

        <div className="flex flex-col justify-center text-base text-[var(--text-soft)] sm:text-lg md:text-xl">
          <p>
            Máx:{" "}
            <span className="font-semibold text-[var(--text-strong)]">
              {max}°
            </span>
          </p>

          <p>
            Mín:{" "}
            <span className="font-semibold text-[var(--text-strong)]">
              {min}°
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}