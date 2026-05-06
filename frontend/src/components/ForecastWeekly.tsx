import type { IconType } from "react-icons";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiNightClear,
  WiSnow,
  WiFog,
  WiThunderstorm,
} from "react-icons/wi";

export interface ForecastDay {
  day: string;
  icon?: string;
  weatherCode?: number;
  max: number;
  min: number;
}

interface ForecastWeeklyProps {
  data?: ForecastDay[];
}

const iconMap: Record<string, IconType> = {
  sol: WiDaySunny,
  soleado: WiDaySunny,
  nublado: WiCloud,
  parcial: WiCloud,
  lluvia: WiRain,
  lluvioso: WiRain,
  llovizna: WiRain,
  tormenta: WiThunderstorm,
  nieve: WiSnow,
  niebla: WiFog,
  noche: WiNightClear,
};

function getIconByWeatherCode(code?: number): IconType {
  if (code === undefined) return WiCloud;

  if (code >= 200 && code <= 232) return WiThunderstorm;
  if (code >= 300 && code <= 321) return WiRain;
  if (code >= 500 && code <= 531) return WiRain;
  if (code >= 600 && code <= 622) return WiSnow;
  if (code >= 701 && code <= 781) return WiFog;
  if (code === 800) return WiDaySunny;
  if (code >= 801 && code <= 804) return WiCloud;

  return WiCloud;
}

function getTempLabel(temp: number) {
  if (temp <= 5) return "Helado";
  if (temp <= 10) return "Muy frío";
  if (temp <= 15) return "Frío";
  if (temp <= 20) return "Fresco";
  if (temp <= 25) return "Templado";
  if (temp <= 29) return "Cálido";
  if (temp <= 33) return "Caluroso";
  if (temp <= 37) return "Muy caluroso";
  return "Extremo";
}

export default function ForecastWeekly({ data = [] }: ForecastWeeklyProps) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section aria-label="Pronóstico semanal" className="w-full">
      <div className="flex min-w-max gap-3">
        {data.map((day, index) => {
          const IconComponent = day.icon
            ? iconMap[day.icon] || WiCloud
            : getIconByWeatherCode(day.weatherCode);

          return (
            <article
              key={`${day.day}-${index}`}
              className="mw-surface-soft min-w-[112px] rounded-2xl p-3 text-center shadow-michi-1 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--text-soft)]">
                {day.day}
              </p>

              <IconComponent
                className="mx-auto my-2 text-4xl text-[var(--accent)]"
                aria-hidden
              />

              <div className="flex items-center justify-center gap-2">
                <span className="text-xl font-extrabold text-[var(--text-strong)]">
                  {day.max}°
                </span>

                <span className="text-sm font-semibold text-[var(--text-soft)]">
                  / {day.min}°
                </span>
              </div>

              <p className="mt-1 text-[11px] font-semibold text-[var(--text-soft)]">
                {getTempLabel(day.max)}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}