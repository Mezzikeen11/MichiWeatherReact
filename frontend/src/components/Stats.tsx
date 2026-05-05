import { WiHumidity, WiStrongWind, WiUmbrella } from "react-icons/wi";

interface StatsProps {
  propLLuvia: number;
  propHumedad: number;
  propViento: number;
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
      icon: WiUmbrella,
    },
    {
      label: "Humedad",
      value: `${propHumedad}%`,
      icon: WiHumidity,
    },
    {
      label: "Viento",
      value: `${propViento} km/h`,
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
              className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-4 py-4 shadow-michi-1"
            >
              <div className="flex flex-col items-center text-center">
                <Icon className="text-4xl text-[var(--accent)]" aria-hidden />
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-soft)]">
                  {item.label}
                </p>
                <p className="mt-1 text-xl font-extrabold text-[var(--text-strong)]">
                  {item.value}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}