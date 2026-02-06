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

export default function WeatherCard({
  location,
  condition,
  temp,
  max,
  min,
  weatherCode,
  selectedCatId = "Michi",
}: WeatherCardProps) {

  const keyFromCode =
    typeof weatherCode === "number"
      ? (function mapCode() {
          if (weatherCode === 800) return "soleado";
          if (weatherCode >= 801 && weatherCode <= 803) return "parcial";
          if (weatherCode === 804) return "nublado";
          if (weatherCode >= 200 && weatherCode <= 232) return "tormenta";
          if (weatherCode >= 300 && weatherCode <= 321) return "llovizna";
          if (weatherCode >= 500 && weatherCode <= 531) return "lluvioso";
          if (weatherCode >= 600 && weatherCode <= 622) return "nieve";
          if (weatherCode >= 701 && weatherCode <= 781) return "niebla";
          return "nublado";
        })()
      : condition.toLowerCase();

  const catPrefixMap: Record<string, string> = {
    Kuro: "Michi",
    Misha: "Misha",
    Aurora: "Aurora",
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
    weatherCardMap["nublado"]["MichiNublado"];

  return (
    <div className="relative flex flex-col items-center w-full max-w-[520px] mx-auto text-center">

      <div className="mb-2 w-full px-4 sm:px-0">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--tx)]">
          {location}
        </h2>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--accent)]">
          {condition}
        </h3>
      </div>

      <div className="relative w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden flex items-center justify-center mx-auto bg-transparent">
        {fondo && (
          <img
            src={fondo}
            alt="fondo clima"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {michi && (
          <img
            src={michi}
            alt="michi"
            className="absolute bottom-[2%] left-[8%] w-[150px] sm:w-[180px] md:w-[200px] lg:w-[250px] object-contain"
          />
        )}
      </div>

      <div className="mt-2 flex items-center justify-center gap-8 px-4 sm:px-10 w-full max-w-[460px] mx-auto">
        <div>
          <h1 className="text-[72px] md:text-[96px] font-extrabold text-[var(--tx)] leading-none">
            {temp}°
          </h1>
        </div>

        <div className="flex flex-col justify-center text-base sm:text-lg md:text-xl text-[var(--muted)]">
          <p>
            Máx: <span className="text-[var(--tx)] font-semibold">{max}°</span>
          </p>
          <p>
            Mín: <span className="text-[var(--tx)] font-semibold">{min}°</span>
          </p>
        </div>
      </div>
    </div>
  );
}
