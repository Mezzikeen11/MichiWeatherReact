// src/components/ForecastHourly.tsx
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiFog,
  WiThunderstorm,
} from "react-icons/wi";

export interface HourlyForecast {
  hour: string;
  temp: number;
  weatherCode?: number;
}

interface ForecastHourlyProps {
  data?: HourlyForecast[];
}

// Decide qué ícono usar según OpenWeather
function getIconByWeatherCode(code?: number) {
  if (code === undefined) return null;

  // Tormenta
  if (code >= 200 && code <= 232) return WiThunderstorm;

  // Llovizna
  if (code >= 300 && code <= 321) return WiRain;

  // Lluvia
  if (code >= 500 && code <= 531) return WiRain;

  // Nieve
  if (code >= 600 && code <= 622) return WiSnow;

  // Niebla / atmósfera
  if (code >= 701 && code <= 781) return WiFog;

  // Cielo despejado
  if (code === 800) return WiDaySunny;

  // Nubes
  if (code >= 801 && code <= 804) return WiCloud;

  // Fallback
  return WiCloud;
}

export default function ForecastHourly({ data = [] }: ForecastHourlyProps) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section aria-label="Pronóstico por horas" className="w-full">
      <div className="flex gap-4 min-w-max">
        {data.map((hour, i) => {
          const IconComponent = getIconByWeatherCode(hour.weatherCode);

          return (
            <div
              key={i}
              className="min-w-[120px] bg-[var(--panel)]/90 dark:bg-[var(--glass)] rounded-xl p-4 shadow-michi-1 flex flex-col items-center justify-center hover:scale-[1.03] transition"
            >
              <p className="text-sm font-semibold text-[var(--muted)]">
                {hour.hour}
              </p>

              {IconComponent ? (
                <IconComponent
                  className="text-[var(--dark)] dark:text-[var(--accent)] text-3xl my-2"
                  aria-hidden
                />
              ) : (
                <div className="w-8 h-8 my-2" />
              )}

              <p className="text-lg font-bold text-[var(--accent)]">
                {hour.temp}°
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
