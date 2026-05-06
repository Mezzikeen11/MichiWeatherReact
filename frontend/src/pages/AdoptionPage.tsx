import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiExternalLink,
  FiHeart,
  FiHome,
  FiInfo,
  FiMapPin,
  FiMessageCircle,
  FiShield,
} from "react-icons/fi";

const featuredCats = [
  {
    id: 1,
    name: "Luna",
    age: "1 año",
    sex: "Hembra",
    personality: "Tranquila y cariñosa",
    description:
      "Acostumbrada a convivir en interiores. Ideal para una familia que busca una compañía serena.",
    image:
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=1200&auto=format&fit=crop",
    contact: "Instagram del refugio",
  },
  {
    id: 2,
    name: "Milo",
    age: "8 meses",
    sex: "Macho",
    personality: "Juguetón y sociable",
    description:
      "Tiene mucha energía, disfruta explorar y necesita un hogar con tiempo para juego y adaptación.",
    image:
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=1200&auto=format&fit=crop",
    contact: "Facebook del rescatista",
  },
  {
    id: 3,
    name: "Nina",
    age: "2 años",
    sex: "Hembra",
    personality: "Noble y observadora",
    description:
      "Busca un espacio seguro, estable y una familia paciente para continuar su proceso de confianza.",
    image:
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1200&auto=format&fit=crop",
    contact: "WhatsApp del refugio",
  },
];

const requirements = [
  "Espacio seguro, ventilado y protegido.",
  "Tiempo para adaptación, juego y limpieza.",
  "Compromiso con vacunas, esterilización y veterinario.",
  "Seguimiento responsable con el refugio o rescatista.",
  "Paciencia durante los primeros días en casa.",
];

const shelters = [
  {
    id: 1,
    name: "Refugio Felino Cancún",
    zone: "Cancún, Quintana Roo",
    note: "Difusión de adopciones responsables y apoyo a rescates locales.",
    channel: "Red social / publicación externa",
  },
  {
    id: 2,
    name: "Red de Rescatistas Cancún",
    zone: "Cancún, Quintana Roo",
    note: "Publicaciones activas de michis rescatados y seguimiento directo.",
    channel: "Contacto directo del rescatista",
  },
  {
    id: 3,
    name: "Comunidad de Adopción Responsable",
    zone: "Zona norte de Quintana Roo",
    note: "Orientación sobre adopción, cuidados iniciales y adaptación al hogar.",
    channel: "Grupo o comunidad externa",
  },
];

const quickInfo = [
  {
    icon: <FiHeart />,
    title: "Adopta con calma",
    text: "Conoce su edad, carácter, cuidados y necesidades antes de tomar una decisión.",
  },
  {
    icon: <FiShield />,
    title: "Prepara tu hogar",
    text: "Asegura ventanas, balcones, arenero, alimento, agua y una zona tranquila.",
  },
  {
    icon: <FiExternalLink />,
    title: "Contacta al refugio",
    text: "El seguimiento y validación se realizan directamente con el refugio o rescatista.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Conoce al michi",
    text: "Revisa edad, carácter, necesidades, salud y condiciones de adaptación.",
  },
  {
    number: "02",
    title: "Contacta al refugio",
    text: "Confirma requisitos, entrevista, seguimiento y disponibilidad real.",
  },
  {
    number: "03",
    title: "Prepara tu hogar",
    text: "Define una zona segura con agua, alimento, arenero y descanso.",
  },
  {
    number: "04",
    title: "Acompaña su adaptación",
    text: "Dale tiempo, rutina y paciencia durante sus primeros días en casa.",
  },
];

export default function AdoptionPage() {
  return (
    <section className="container-michi py-10">
      <div className="mx-auto grid max-w-7xl gap-8">
        {/* Hero */}
        <div className="mw-card overflow-hidden rounded-3xl">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mw-surface-float mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--text-soft)]">
                <FiHeart className="text-[var(--accent)]" />
                Adopción responsable
              </div>

              <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-[var(--text-strong)] md:text-5xl">
                Dale una segunda oportunidad a un michi.
              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--text-soft)] sm:text-base">
                Encuentra orientación básica, perfiles en difusión y redes
                locales para iniciar un proceso de adopción responsable en
                Cancún y Quintana Roo.
              </p>

              <div className="mw-surface-soft mt-6 rounded-3xl p-5">
                <div className="flex gap-3">
                  <FiInfo className="mt-1 shrink-0 text-[var(--accent)]" />

                  <p className="text-sm leading-7 text-[var(--text-soft)]">
                    MichiWeather no gestiona adopciones directamente. El
                    contacto, entrevista, seguimiento y entrega corresponden al
                    refugio, rescatista o publicación externa responsable.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#michis"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-white shadow-michi-1 transition hover:brightness-105"
                >
                  Ver michis
                </a>

                <Link
                  to="/contactanos"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] px-5 py-3 font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
                >
                  <FiMessageCircle />
                  Contacto
                </Link>
              </div>
            </div>

            <div className="mw-surface-soft relative min-h-[320px] overflow-hidden rounded-none border-0 lg:border-l lg:border-[var(--line)]">
              <img
                src="https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?q=80&w=1200&auto=format&fit=crop"
                alt="Gato en adopción responsable"
                className="h-full min-h-[320px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/25" />

              <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/25 bg-black/40 p-4 text-white shadow-michi-1 backdrop-blur-md">
                <p className="text-sm font-semibold">
                  Adoptar también es cuidar.
                </p>
                <p className="mt-1 text-sm text-white/85">
                  Tiempo, paciencia, seguridad y compromiso hacen la diferencia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Información rápida */}
        <div className="grid gap-4 md:grid-cols-3">
          {quickInfo.map((item) => (
            <article
              key={item.title}
              className="mw-surface-soft rounded-3xl p-5 shadow-michi-1 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mw-surface-float mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-xl text-[var(--accent)]">
                {item.icon}
              </div>

              <h2 className="font-bold text-[var(--text-strong)]">
                {item.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        {/* Michis destacados */}
        <div id="michis" className="mw-card rounded-3xl p-6 sm:p-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-[var(--text-soft)]">
                Michis destacados
              </p>

              <h2 className="text-2xl font-extrabold text-[var(--text-strong)] sm:text-3xl">
                Buscan un hogar responsable
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-[var(--text-soft)]">
              Perfiles de ejemplo para mostrar cómo podría difundirse la
              adopción dentro de la plataforma.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredCats.map((cat) => (
              <article
                key={cat.id}
                className="mw-surface-soft overflow-hidden rounded-3xl shadow-michi-1 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-56 w-full object-cover"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    {cat.personality}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text-strong)]">
                        {cat.name}
                      </h3>

                      <p className="mt-1 text-sm text-[var(--text-soft)]">
                        {cat.age} · {cat.sex}
                      </p>
                    </div>

                    <FiHeart className="mt-1 shrink-0 text-[var(--accent)]" />
                  </div>

                  <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
                    {cat.description}
                  </p>

                  <div className="mw-surface-float mt-4 rounded-2xl p-4">
                    <p className="text-sm font-semibold text-[var(--text-strong)]">
                      Contacto sugerido
                    </p>

                    <p className="mt-1 text-sm text-[var(--text-soft)]">
                      {cat.contact}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Requisitos + proceso */}
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="mw-card rounded-3xl p-6 sm:p-8">
            <p className="text-sm text-[var(--text-soft)]">
              Antes de adoptar
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-strong)]">
              Requisitos básicos
            </h2>

            <div className="mt-5 grid gap-3">
              {requirements.map((item) => (
                <div
                  key={item}
                  className="mw-surface-soft flex gap-3 rounded-2xl p-4 text-sm leading-6 text-[var(--text-strong)]"
                >
                  <FiCheckCircle className="mt-1 shrink-0 text-[var(--accent)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mw-card rounded-3xl p-6 sm:p-8">
            <p className="text-sm text-[var(--text-soft)]">
              Proceso sugerido
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-strong)]">
              Una adopción responsable empieza con preparación.
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {processSteps.map((step) => (
                <article
                  key={step.number}
                  className="mw-surface-soft rounded-3xl p-5"
                >
                  <span className="text-sm font-extrabold text-[var(--accent)]">
                    {step.number}
                  </span>

                  <h3 className="mt-2 font-bold text-[var(--text-strong)]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Directorio */}
        <div className="mw-card rounded-3xl p-6 sm:p-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-[var(--text-soft)]">
                Redes locales
              </p>

              <h2 className="text-2xl font-extrabold text-[var(--text-strong)] sm:text-3xl">
                Refugios y comunidades
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-[var(--text-soft)]">
              La validación final siempre debe realizarse con la fuente
              responsable de la publicación.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {shelters.map((item) => (
              <article
                key={item.id}
                className="mw-surface-soft rounded-3xl p-5 shadow-michi-1"
              >
                <h3 className="text-lg font-bold text-[var(--text-strong)]">
                  {item.name}
                </h3>

                <p className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--text-soft)]">
                  <FiMapPin className="text-[var(--accent)]" />
                  {item.zone}
                </p>

                <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
                  {item.note}
                </p>

                <div className="mw-surface-float mt-4 rounded-2xl p-4">
                  <p className="text-sm font-semibold text-[var(--text-strong)]">
                    Canal de seguimiento
                  </p>

                  <p className="mt-1 text-sm text-[var(--text-soft)]">
                    {item.channel}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Cierre */}
        <div className="mw-card rounded-3xl p-6 sm:p-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm text-[var(--text-soft)]">
                Adopción responsable
              </p>

              <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-strong)]">
                Cada adopción debe realizarse con seguimiento y validación.
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-soft)]">
                Esta página funciona como apoyo informativo. En una siguiente
                fase, MichiWeather podría integrar refugios reales, formularios
                de interés y favoritos por usuario.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-white shadow-michi-1 transition hover:brightness-105"
            >
              <FiHome />
              Volver al clima
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}