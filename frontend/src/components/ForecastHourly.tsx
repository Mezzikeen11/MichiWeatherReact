import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi";

export interface HourlyForecast {
  hour: string;
  temp: number;
  weatherCode?: number;
}

interface ForecastHourlyProps {
  data?: HourlyForecast[];
}

export default function ForecastHourly({ data = [] }: ForecastHourlyProps) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section aria-label="Pronóstico por horas" className="w-full">
      <div className="flex gap-4 min-w-max">
        {data.map((hour, i) => {
          let IconComponent = null;
          if (hour.weatherCode !== undefined) {
            if (hour.weatherCode < 3) IconComponent = WiDaySunny;
            else if (hour.weatherCode < 60) IconComponent = WiCloud;
            else IconComponent = WiRain;
          }

          return (
            <div
              key={i}
              className="min-w-[120px] bg-[var(--panel)]/90 dark:bg-[var(--glass)] rounded-xl p-4 shadow-michi-1 flex flex-col items-center justify-center hover:scale-[1.03] transition"
            >
              <p className="text-sm font-semibold text-[var(--muted)]">{hour.hour}</p>

              {IconComponent ? (
                <IconComponent
                  className="text-[var(--dark)] dark:text-[var(--accent)] text-2xl my-2"
                  aria-hidden
                />
              ) : (
                <div className="w-8 h-8 my-2" />
              )}

              <p className="text-lg font-bold text-[var(--accent)]">{hour.temp}°</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
