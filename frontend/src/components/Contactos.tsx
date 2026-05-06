import type { ReactNode } from "react";
import { FiExternalLink, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

type ContactCard = {
  icon: ReactNode;
  title: string;
  value: string;
  description: string;
  link: string;
  external?: boolean;
};

const cards: ContactCard[] = [
  {
    icon: <FiMail />,
    title: "Correo",
    value: "Contacto@MichiWeather.com",
    description: "Para dudas generales, propuestas o seguimiento del proyecto.",
    link: "mailto:Contacto@MichiWeather.com",
  },
  {
    icon: <FiPhone />,
    title: "Teléfono",
    value: "+52 998 303 4578",
    description: "Canal de atención para contacto rápido o aclaraciones.",
    link: "tel:+529983034578",
  },
  {
    icon: <FiMapPin />,
    title: "Ubicación",
    value: "Cancún, Quintana Roo",
    description: "Proyecto con ubicación base en la zona norte de Quintana Roo.",
    link: "https://www.google.com/maps/@21.1576511,-86.8829975,3a,75y,172.55h,82.99t/data=!3m7!1e1!3m5!1s8HZ_SnHW9tLSsnDbPtei8g!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D7.006656367288684%26panoid%3D8HZ_SnHW9tLSsnDbPtei8g%26yaw%3D172.54707970601885!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D",
    external: true,
  },
];

export default function ContactCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <a
          key={card.title}
          href={card.link}
          target={card.external ? "_blank" : undefined}
          rel={card.external ? "noreferrer" : undefined}
          className="mw-surface-soft group rounded-3xl p-5 shadow-michi-1 transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="mw-surface-float flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl text-[var(--accent)] transition group-hover:scale-105">
              {card.icon}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">
                    {card.title}
                  </p>

                  <h3 className="mt-1 truncate text-lg font-extrabold text-[var(--text-strong)]">
                    {card.value}
                  </h3>
                </div>

                <FiExternalLink className="mt-1 shrink-0 text-[var(--text-soft)] transition group-hover:text-[var(--accent)]" />
              </div>

              <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
                {card.description}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}