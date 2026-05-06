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

export default function ForecastHourly({ data = [] }: ForecastHourlyProps) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section aria-label="Pronóstico por horas" className="w-full">
      <div className="flex min-w-max gap-3">
        {data.map((hour, index) => {
          const IconComponent = getIconByWeatherCode(hour.weatherCode);

          return (
            <article
              key={`${hour.hour}-${index}`}
              className="mw-surface-soft min-w-[96px] rounded-2xl p-3 text-center shadow-michi-1 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--text-soft)]">
                {hour.hour}
              </p>

              <IconComponent
                className="mx-auto my-2 text-4xl text-[var(--accent)]"
                aria-hidden
              />

              <p className="text-xl font-extrabold text-[var(--text-strong)]">
                {hour.temp}°
              </p>

              <p className="mt-1 text-[11px] font-semibold text-[var(--text-soft)]">
                {getTempLabel(hour.temp)}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}