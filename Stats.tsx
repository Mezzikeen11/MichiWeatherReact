import { WiUmbrella, WiHumidity, WiStrongWind } from "react-icons/wi"

interface StatsProps {
  propLLuvia: number
  propHumedad: number
  propViento: number
}

export default function Stats({ propLLuvia, propHumedad, propViento }: StatsProps) {
  const stats = [
    { icon: <WiUmbrella />, value: `${propLLuvia}%` },
    { icon: <WiHumidity />, value: `${propHumedad}%` },
    { icon: <WiStrongWind />, value: `${propViento} km/h` },
  ]

  return (
    <div className="w-full px-4 sm:px-0 py-4">
      <div className="flex flex-row flex-wrap justify-center items-center gap-4 w-full overflow-x-auto pb-3 scroll-hidden">
        {stats.map((s, idx) => (
          <div key={idx} className="flex flex-col items-center text-center min-w-[80px] sm:min-w-[110px]">
            <div className="w-[95px] h-[95px] sm:w-[110px] sm:h-[110px] rounded-full bg-[var(--panel)] dark:bg-[var(--glass)] flex flex-col items-center justify-center shadow-michi-1">
              <div className="text-3xl sm:text-4xl text-[var(--dark)] dark:text-[var(--accent)] mb-1">
                {s.icon}
              </div>
              <p className="font-semibold text-sm text-[var(--dark)] dark:text-[var(--white)]">
                {s.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
