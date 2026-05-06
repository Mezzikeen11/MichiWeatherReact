import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCloud,
  FiHeart,
  FiMail,
  FiMapPin,
  FiShield,
  FiZap,
} from "react-icons/fi";
import banner from "../assets/Nosotros/GATOS.png";

const TYPING_MS = 80;
const DELETING_MS = 38;
const AFTER_TYPE_PAUSE_MS = 900;
const AFTER_DELETE_PAUSE_MS = 220;
const CURSOR_BLINK_MS = 520;

const valueCards = [
  {
    icon: <FiCloud />,
    title: "Pronóstico claro",
    text: "Mostramos el clima de forma sencilla para que el usuario entienda rápido qué está pasando en su ciudad.",
  },
  {
    icon: <FiHeart />,
    title: "Cuidado para michis",
    text: "Transformamos el clima en recomendaciones prácticas para proteger el bienestar diario de los gatos.",
  },
  {
    icon: <FiShield />,
    title: "Adopción responsable",
    text: "Promovemos orientación y difusión consciente, sin reemplazar el trabajo de refugios o rescatistas.",
  },
];

const projectPillars = [
  {
    label: "Experiencia",
    title: "Una app cercana",
    text: "El usuario no solo consulta datos: interactúa con una interfaz visual, amable y personalizada.",
  },
  {
    label: "Tecnología",
    title: "Frontend y backend conectados",
    text: "MichiWeather integra React, servicios de clima, autenticación y persistencia para una experiencia completa.",
  },
  {
    label: "Propósito",
    title: "Clima con impacto",
    text: "La aplicación conecta información meteorológica con cuidado animal y adopción responsable.",
  },
];

const ecosystemItems = [
  "Consulta meteorológica en tiempo real",
  "Personalización mediante un michi elegido",
  "Consejos de cuidado según el clima",
  "Orientación sobre adopción responsable",
];

const futureItems = [
  "Guardar preferencias completas del usuario en PostgreSQL.",
  "Generar consejos personalizados según temperatura, humedad, viento y lluvia.",
  "Integrar refugios reales y formularios de interés.",
  "Agregar panel administrativo para gestionar contenido de adopción.",
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">
          {eyebrow}
        </p>

        <h2 className="mt-2 text-2xl font-extrabold text-[var(--text-strong)] sm:text-3xl">
          {title}
        </h2>
      </div>

      {description && (
        <p className="max-w-xl text-sm leading-7 text-[var(--text-soft)] sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export default function Nosotros() {
  const words = useMemo(() => ["pronósticos.", "compañía.", "hogares."], []);

  const [stepIndex, setStepIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [mode, setMode] = useState<
    "typing" | "pauseAfterType" | "deleting" | "pauseAfterDelete" | "done"
  >("typing");
  const [cursorOn, setCursorOn] = useState(true);

  const timerRef = useRef<number | null>(null);
  const cursorRef = useRef<number | null>(null);

  const currentWord = words[stepIndex] ?? "";
  const isLastStep = stepIndex === words.length - 1;

  useEffect(() => {
    cursorRef.current = window.setInterval(() => {
      setCursorOn((state) => !state);
    }, CURSOR_BLINK_MS);

    return () => {
      if (cursorRef.current) {
        window.clearInterval(cursorRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    if (mode === "done") {
      setCursorOn(false);
      return;
    }

    if (mode === "typing") {
      timerRef.current = window.setTimeout(() => {
        const next = currentWord.slice(0, typed.length + 1);
        setTyped(next);

        if (next === currentWord) {
          if (isLastStep) {
            setMode("done");
          } else {
            setMode("pauseAfterType");
          }
        }
      }, TYPING_MS);
    }

    if (mode === "pauseAfterType") {
      timerRef.current = window.setTimeout(() => {
        setMode("deleting");
      }, AFTER_TYPE_PAUSE_MS);
    }

    if (mode === "deleting") {
      timerRef.current = window.setTimeout(() => {
        const next = currentWord.slice(0, typed.length - 1);
        setTyped(next);

        if (next === "") {
          setMode("pauseAfterDelete");
        }
      }, DELETING_MS);
    }

    if (mode === "pauseAfterDelete") {
      timerRef.current = window.setTimeout(() => {
        setStepIndex((index) => Math.min(index + 1, words.length - 1));
        setMode("typing");
      }, AFTER_DELETE_PAUSE_MS);
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [mode, typed, currentWord, isLastStep, words.length]);

  return (
    <main className="min-h-screen py-10">
      <section className="container-michi">
        <div className="mx-auto grid max-w-7xl gap-8">
          {/* Hero */}
          <div className="mw-card overflow-hidden rounded-3xl">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="mw-surface-float mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--text-soft)]">
                  <FiZap className="text-[var(--accent)]" />
                  Sobre MichiWeather
                </div>

                <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-[var(--text-strong)] sm:text-5xl md:text-6xl">
                  Creamos{" "}
                  <span className="text-[var(--accent)]">
                    {typed}
                    {mode !== "done" && (
                      <span
                        className={`ml-1 inline-block ${
                          cursorOn ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        |
                      </span>
                    )}
                  </span>
                </h1>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--text-soft)] sm:text-base md:text-lg">
                  MichiWeather nació para que consultar el clima no fuera una
                  acción fría, sino una experiencia útil, visual y conectada con
                  el cuidado de los michis.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="mw-surface-soft rounded-3xl p-4">
                    <p className="text-sm text-[var(--text-soft)]">
                      Enfoque
                    </p>
                    <h2 className="mt-1 text-lg font-extrabold text-[var(--text-strong)]">
                      Clima útil
                    </h2>
                  </div>

                  <div className="mw-surface-soft rounded-3xl p-4">
                    <p className="text-sm text-[var(--text-soft)]">
                      Identidad
                    </p>
                    <h2 className="mt-1 text-lg font-extrabold text-[var(--text-strong)]">
                      Michis
                    </h2>
                  </div>

                  <div className="mw-surface-soft rounded-3xl p-4">
                    <p className="text-sm text-[var(--text-soft)]">
                      Propósito
                    </p>
                    <h2 className="mt-1 text-lg font-extrabold text-[var(--text-strong)]">
                      Cuidado
                    </h2>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-white shadow-michi-1 transition hover:brightness-105"
                  >
                    Ver clima
                    <FiArrowRight />
                  </Link>

                  <Link
                    to="/contactanos"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] px-5 py-3 font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
                  >
                    <FiMail />
                    Contacto
                  </Link>
                </div>
              </div>

              <div className="mw-surface-soft relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-none border-0 p-6 lg:border-l lg:border-[var(--line)]">
                <div className="mw-surface-float w-full max-w-[520px] overflow-hidden rounded-3xl p-3">
                  <img
                    src={banner}
                    alt="MichiWeather"
                    className="h-64 w-full rounded-3xl object-cover sm:h-80 lg:h-96"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Lo que hace diferente */}
          <section className="mw-card rounded-3xl p-6 sm:p-8">
            <SectionHeading
              eyebrow="Lo que hace diferente a MichiWeather"
              title="No solo mostramos el clima: lo convertimos en una experiencia."
              description="La aplicación combina información meteorológica, personalización visual y recomendaciones pensadas para usuarios que conviven con michis."
            />

            <div className="grid gap-4 md:grid-cols-3">
              {valueCards.map((card) => (
                <article
                  key={card.title}
                  className="mw-surface-soft rounded-3xl p-5 shadow-michi-1 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mw-surface-float mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-xl text-[var(--accent)]">
                    {card.icon}
                  </div>

                  <h3 className="font-bold text-[var(--text-strong)]">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                    {card.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Quiénes somos */}
          <section className="mw-card rounded-3xl p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">
                  ¿Quiénes somos?
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[var(--text-strong)] sm:text-3xl">
                  Somos un proyecto que une clima, diseño y bienestar animal.
                </h2>
              </div>

              <div className="grid gap-4">
                <p className="text-sm leading-7 text-[var(--text-soft)] sm:text-base">
                  MichiWeather surge como una aplicación web que busca hacer más
                  cercana la consulta meteorológica. En lugar de limitarse a
                  mostrar temperatura o lluvia, la app interpreta el clima desde
                  una experiencia visual personalizada con un michi elegido por
                  el usuario.
                </p>

                <div className="mw-surface-soft rounded-3xl p-5">
                  <p className="text-sm leading-7 text-[var(--text-soft)]">
                    El proyecto integra clima, perfil, favoritos, historial,
                    recomendaciones de cuidado y adopción responsable para
                    construir una plataforma más completa y defendible.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Clima, michis y propósito */}
          <section className="mw-card rounded-3xl p-6 sm:p-8">
            <SectionHeading
              eyebrow="Clima, michis y propósito"
              title="Tres pilares que sostienen la experiencia."
              description="Cada parte del proyecto cumple una función dentro de la app: informar, personalizar y aportar valor social."
            />

            <div className="grid gap-4 md:grid-cols-3">
              {projectPillars.map((pillar) => (
                <article
                  key={pillar.label}
                  className="mw-surface-soft rounded-3xl p-5 shadow-michi-1"
                >
                  <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">
                    {pillar.label}
                  </span>

                  <h3 className="mt-3 font-bold text-[var(--text-strong)]">
                    {pillar.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                    {pillar.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Más que app del clima */}
          <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="mw-card rounded-3xl p-6 sm:p-8">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">
                Más que una app del clima
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-[var(--text-strong)]">
                La información se vuelve más útil cuando tiene contexto.
              </h2>

              <p className="mt-3 text-sm leading-7 text-[var(--text-soft)] sm:text-base">
                Muchas aplicaciones muestran datos meteorológicos, pero no
                siempre ayudan al usuario a interpretarlos. MichiWeather busca
                convertir esos datos en decisiones simples: cuidar mejor el
                entorno, anticipar cambios de clima y proteger a su michi.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {["Claridad", "Personalización", "Cuidado", "Propósito"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="mw-surface-float rounded-full px-4 py-2 text-sm font-semibold text-[var(--accent)]"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="mw-card rounded-3xl p-6 sm:p-8">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">
                Lo que conecta MichiWeather
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-[var(--text-strong)]">
                Una experiencia construida por módulos.
              </h2>

              <div className="mt-5 grid gap-3">
                {ecosystemItems.map((item) => (
                  <div
                    key={item}
                    className="mw-surface-soft flex items-center gap-3 rounded-2xl p-4"
                  >
                    <FiMapPin className="shrink-0 text-[var(--accent)]" />
                    <span className="text-sm font-semibold text-[var(--text-strong)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Hacia dónde vamos */}
          <section className="mw-card rounded-3xl p-6 sm:p-8">
            <SectionHeading
              eyebrow="Hacia dónde vamos"
              title="MichiWeather puede crecer hacia una experiencia más personalizada."
              description="Estas mejoras futuras ayudan a explicar que el proyecto tiene una base funcional y una ruta clara de evolución."
            />

            <div className="grid gap-3 md:grid-cols-2">
              {futureItems.map((item) => (
                <div
                  key={item}
                  className="mw-surface-soft flex gap-3 rounded-2xl p-4 text-sm leading-6 text-[var(--text-strong)]"
                >
                  <FiArrowRight className="mt-1 shrink-0 text-[var(--accent)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Cierre */}
          <section className="mw-card rounded-3xl p-6 sm:p-8">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">
                  ¿Quieres conocer más del proyecto?
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[var(--text-strong)] sm:text-3xl">
                  Podemos explicar la arquitectura, el flujo de usuario y las
                  mejoras futuras.
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-soft)]">
                  MichiWeather integra frontend, backend, autenticación,
                  consulta de clima, personalización con michi, perfil de
                  usuario, cuidados y adopción responsable.
                </p>
              </div>

              <Link
                to="/contactanos"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-white shadow-michi-1 transition hover:brightness-105"
              >
                <FiMail />
                Contáctanos
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}