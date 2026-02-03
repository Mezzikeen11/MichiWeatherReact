import { FiMail, FiPhone, FiMapPin } from "react-icons/fi"

export default function ContactCards() {
  const cards = [
    {
      icon: <FiMail />,
      title: "Email",
      value: "Contacto@MichiWeather.com",
      link: "mailto:Contacto@MichiWeather.com",
    },
    {
      icon: <FiPhone />,
      title: "Teléfono",
      value: "+52 998 303 4578",
      link: "tel:+9983034578",
    },
    {
      icon: <FiMapPin />,
      title: "Ubicación",
      value: "Cancún, Q. Roo",
      link: "https://www.google.com/maps/@21.1576511,-86.8829975,3a,75y,172.55h,82.99t/data=!3m7!1e1!3m5!1s8HZ_SnHW9tLSsnDbPtei8g!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D7.006656367288684%26panoid%3D8HZ_SnHW9tLSsnDbPtei8g%26yaw%3D172.54707970601885!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D",
    },
  ]

  return (
    <div className="w-full px-4 sm:px-0 py-6">
      <div className="flex flex-row flex-wrap justify-center items-center gap-6 w-full">
        {cards.map((c, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center w-[180px]"
            >
            {/* CÍRCULO */}
            <div className="w-[110px] h-[110px] rounded-full bg-[var(--panel)] dark:bg-[var(--glass)] flex flex-col items-center justify-center shadow-michi-1">
              <div className="text-3xl text-[var(--accent)] mb-1">
                {c.icon}
              </div>

              <p className="font-semibold text-sm text-[var(--text-main)]">
                {c.title}
              </p>
            </div>

            {/* TEXTO */}
            {c.link ? (
              <a
                href={c.link}
                className="mt-3 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition"
              >
                {c.value}
              </a>
            ) : (
              <p className="mt-3 text-sm text-[var(--text-muted)]">
                {c.value}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
