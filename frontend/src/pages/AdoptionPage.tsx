import { Link } from "react-router-dom";

const featuredCats = [
  {
    id: 1,
    name: "Luna",
    age: "1 año",
    sex: "Hembra",
    description: "Cariñosa, tranquila y acostumbrada a convivir en interiores.",
    image:
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=1200&auto=format&fit=crop",
    contact: "Instagram del refugio",
  },
  {
    id: 2,
    name: "Milo",
    age: "8 meses",
    sex: "Macho",
    description: "Juguetón, sociable y con mucha energía para acompañarte.",
    image:
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=1200&auto=format&fit=crop",
    contact: "Facebook del rescatista",
  },
  {
    id: 3,
    name: "Nina",
    age: "2 años",
    sex: "Hembra",
    description: "Muy noble, ideal para una familia que busca una compañía serena.",
    image:
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1200&auto=format&fit=crop",
    contact: "WhatsApp del refugio",
  },
];

const shelters = [
  {
    id: 1,
    name: "Refugio Felino Cancún",
    zone: "Cancún, Quintana Roo",
    note: "Difusión de adopción responsable y apoyo a rescates locales.",
  },
  {
    id: 2,
    name: "Red de Rescatistas Cancún",
    zone: "Cancún, Quintana Roo",
    note: "Contacto con publicaciones activas y seguimiento directo con rescatistas.",
  },
  {
    id: 3,
    name: "Comunidad de Adopción Responsable",
    zone: "Zona norte de Quintana Roo",
    note: "Orientación para adopción, cuidados iniciales y contacto externo.",
  },
];

const requirements = [
  "Ser mayor de edad.",
  "Aceptar seguimiento responsable del proceso.",
  "Contar con espacio seguro y protegido para el michi.",
  "Comprometerse con vacunación, esterilización y cuidados veterinarios.",
];

export default function AdoptionPage() {
  return (
    <section className="container-michi py-10">
      <div className="max-w-7xl mx-auto grid gap-8">
        <div className="bg-[var(--panel)] rounded-3xl shadow-michi-1 p-8">
          <p className="text-sm text-[var(--muted)] mb-2">Adopción responsable</p>
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--tx)] leading-tight">
            Adopta en Cancún con responsabilidad y amor
          </h1>
          <p className="text-[var(--muted)] mt-4 max-w-3xl">
            MichiWeather no gestiona adopciones directamente. Esta sección funciona
            como un espacio de difusión, orientación y contacto con refugios o
            rescatistas locales, para que el proceso se realice con la fuente
            correspondiente.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              to="/"
              className="px-5 py-3 rounded-full bg-[var(--accent)] text-white hover:opacity-90 transition"
            >
              Volver al clima
            </Link>
            <Link
              to="/contactanos"
              className="px-5 py-3 rounded-full border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition"
            >
              Contacto
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.35fr_.9fr] gap-8">
          <div className="grid gap-6">
            <div className="bg-[var(--panel)] rounded-3xl shadow-michi-1 p-6">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <p className="text-sm text-[var(--muted)]">Michi destacados</p>
                  <h2 className="text-2xl font-semibold text-[var(--tx)]">
                    Perfiles en difusión
                  </h2>
                </div>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {featuredCats.map((cat) => (
                  <article
                    key={cat.id}
                    className="rounded-3xl overflow-hidden border border-black/5 bg-white/70"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-52 object-cover"
                    />
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-semibold text-[var(--tx)]">
                            {cat.name}
                          </h3>
                          <p className="text-sm text-[var(--muted)]">
                            {cat.age} · {cat.sex}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-[var(--muted)] mt-3 leading-6">
                        {cat.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-black/5">
                        <p className="text-sm text-[var(--tx)] font-medium">
                          Contacto
                        </p>
                        <p className="text-sm text-[var(--muted)] mt-1">
                          {cat.contact}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="bg-[var(--panel)] rounded-3xl shadow-michi-1 p-6">
              <p className="text-sm text-[var(--muted)] mb-2">
                Refugios y redes locales
              </p>
              <h2 className="text-2xl font-semibold text-[var(--tx)] mb-5">
                Directorio base en Cancún
              </h2>

              <div className="grid gap-4">
                {shelters.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-black/5 bg-white/70 p-5"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--tx)]">
                          {item.name}
                        </h3>
                        <p className="text-sm text-[var(--muted)]">{item.zone}</p>
                      </div>

                      <button
                        type="button"
                        className="px-4 py-2 rounded-full border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition"
                      >
                        Ver contacto
                      </button>
                    </div>

                    <p className="text-sm text-[var(--muted)] mt-3">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="grid gap-6">
            <div className="bg-[var(--panel)] rounded-3xl shadow-michi-1 p-6">
              <p className="text-sm text-[var(--muted)] mb-2">Proceso recomendado</p>
              <h2 className="text-2xl font-semibold text-[var(--tx)] mb-4">
                Requisitos básicos
              </h2>

              <ul className="grid gap-3">
                {requirements.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl bg-white/70 border border-black/5 p-4 text-sm text-[var(--tx)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[var(--panel)] rounded-3xl shadow-michi-1 p-6">
              <p className="text-sm text-[var(--muted)] mb-2">Importante</p>
              <h2 className="text-2xl font-semibold text-[var(--tx)] mb-4">
                Nota de responsabilidad
              </h2>

              <p className="text-sm leading-6 text-[var(--muted)]">
                Esta sección es informativa. El proceso de adopción, validación,
                seguimiento y entrega del animal debe realizarse directamente con el
                refugio, rescatista o publicación correspondiente.
              </p>

              <div className="mt-5 rounded-2xl bg-white/70 border border-black/5 p-4">
                <p className="text-sm text-[var(--tx)] font-medium">
                  Sugerencia para el siguiente bloque
                </p>
                <p className="text-sm text-[var(--muted)] mt-2">
                  Después podemos conectar esta página con favoritos del usuario
                  logueado y con consejos de cuidados según el clima.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}