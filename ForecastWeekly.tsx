// src/components/ForecastWeekly.tsx
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

// Tipo del pronóstico diario
export interface ForecastDay {
  day: string;
  icon?: string;
  max: number;
  min: number;
}

// Props
interface ForecastWeeklyProps {
  data?: ForecastDay[];
}

// Mapeo de nombres → React Icons
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

export default function ForecastWeekly({ data = [] }: ForecastWeeklyProps) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section aria-label="Pronóstico semanal" className="w-full">
      <div className="flex gap-4 min-w-max">
        {data.map((d, i) => {
          const IconComponent = d.icon ? iconMap[d.icon] : null;

          return (
            <div
              key={i}
              className="min-w-[120px] bg-[var(--panel)]/90 dark:bg-[var(--glass)] rounded-xl p-4 shadow-michi-1 flex flex-col items-center justify-center hover:scale-[1.03] transition"
            >
              <p className="text-sm font-semibold text-[var(--muted)]">
                {d.day}
              </p>

              {IconComponent ? (
                <IconComponent
                  className="text-[var(--dark)] dark:text-[var(--accent)] text-3xl my-2"
                  aria-hidden
                />
              ) : (
                <div className="w-8 h-8 my-2" />
              )}

              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-[var(--accent)]">
                  {d.max}°
                </span>
                <span className="text-sm text-[var(--muted)]">
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
