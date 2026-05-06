import { WiHumidity, WiStrongWind, WiUmbrella } from "react-icons/wi";

interface StatsProps {
  propLLuvia: number;
  propHumedad: number;
  propViento: number;
}

function getRainLevel(value: number) {
  if (value <= 5) return "Sin lluvia";
  if (value <= 25) return "Baja";
  if (value <= 50) return "Moderada";
  if (value <= 75) return "Alta";
  return "Muy alta";
}

function getHumidityLevel(value: number) {
  if (value <= 25) return "Muy seca";
  if (value <= 40) return "Seca";
  if (value <= 65) return "Ideal";
  if (value <= 80) return "Húmeda";
  return "Muy húmeda";
}

function getWindLevel(value: number) {
  if (value <= 5) return "Calmado";
  if (value <= 15) return "Ligero";
  if (value <= 30) return "Moderado";
  if (value <= 45) return "Fuerte";
  return "Muy fuerte";
}

export default function Stats({
  propLLuvia,
  propHumedad,
  propViento,
}: StatsProps) {
  const stats = [
    {
      label: "Lluvia",
      value: `${propLLuvia}%`,
      level: getRainLevel(propLLuvia),
      icon: WiUmbrella,
    },
    {
      label: "Humedad",
      value: `${propHumedad}%`,
      level: getHumidityLevel(propHumedad),
      icon: WiHumidity,
    },
    {
      label: "Viento",
      value: `${propViento} km/h`,
      level: getWindLevel(propViento),
      icon: WiStrongWind,
    },
  ];

  return (
    <section aria-label="Estadísticas del clima" className="w-full">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.label}
              className="mw-surface-soft rounded-2xl p-4 text-center shadow-michi-1 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mw-surface-float mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-3xl text-[var(--accent)]">
                <Icon aria-hidden />
              </div>

              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[var(--text-soft)]">
                {item.label}
              </p>

              <p className="mt-1 text-xl font-extrabold text-[var(--text-strong)]">
                {item.value}
              </p>

              <span className="mt-2 inline-flex rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold text-[var(--accent)]">
                {item.level}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}