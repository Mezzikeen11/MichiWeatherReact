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

export default function ForecastWeekly({ data = [] }: ForecastWeeklyProps) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section aria-label="Pronóstico semanal" className="w-full">
      <div className="flex gap-3 min-w-max">
        {data.map((d, i) => {
          const IconComponent = d.icon
            ? iconMap[d.icon] || WiCloud
            : getIconByWeatherCode(d.weatherCode);

          return (
            <div
              key={`${d.day}-${i}`}
              className="min-w-[94px] bg-[var(--panel)]/95 rounded-xl p-3 shadow-michi-1 flex flex-col items-center justify-center transition hover:scale-[1.02]"
            >
              <p className="text-xs font-semibold text-[var(--text-soft)]">
                {d.day}
              </p>

              <IconComponent
                className="text-[var(--accent)] text-4xl my-1"
                aria-hidden
              />

              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-[var(--text-strong)]">
                  {d.max}°
                </span>
                <span className="text-sm text-[var(--text-soft)]">
                  {d.min}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}