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

function getIconByWeatherCode(code?: number) {
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

export default function ForecastHourly({ data = [] }: ForecastHourlyProps) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section aria-label="Pronóstico por horas" className="w-full">
      <div className="flex gap-3 min-w-max">
        {data.map((hour, i) => {
          const IconComponent = getIconByWeatherCode(hour.weatherCode);

          return (
            <div
              key={`${hour.hour}-${i}`}
              className="min-w-[88px] bg-[var(--panel)]/95 rounded-xl p-3 shadow-michi-1 flex flex-col items-center justify-center transition hover:scale-[1.02]"
            >
              <p className="text-xs font-semibold text-[var(--text-soft)]">
                {hour.hour}
              </p>

              <IconComponent
                className="text-[var(--accent)] text-4xl my-1"
                aria-hidden
              />

              <p className="text-lg font-bold text-[var(--text-strong)]">
                {hour.temp}°
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}