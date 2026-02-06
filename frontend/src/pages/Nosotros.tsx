import { useEffect, useMemo, useRef, useState } from "react"
import banner from "../assets/Nosotros/GATOS.png"
import { Link } from "react-router-dom"

export default function Nosotros() {
  const words = useMemo(() => ["pronósticos.", "compañía.", "hogares."], [])

  const TYPING_MS = 80
  const DELETING_MS = 38
  const AFTER_TYPE_PAUSE_MS = 900
  const AFTER_DELETE_PAUSE_MS = 220
  const CURSOR_BLINK_MS = 520

  const [stepIndex, setStepIndex] = useState(0)
  const [typed, setTyped] = useState("")
  const [mode, setMode] = useState<
    "typing" | "pauseAfterType" | "deleting" | "pauseAfterDelete" | "done"
  >("typing")
  const [cursorOn, setCursorOn] = useState(true)

  const timerRef = useRef<number | null>(null)
  const cursorRef = useRef<number | null>(null)

  const currentWord = words[stepIndex] ?? ""
  const isLastStep = stepIndex === words.length - 1

  useEffect(() => {
    cursorRef.current = window.setInterval(() => {
      setCursorOn((s) => !s)
    }, CURSOR_BLINK_MS)

    return () => {
      if (cursorRef.current) window.clearInterval(cursorRef.current)
    }
  }, [])

  useEffect(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current)

    if (mode === "done") {
      setCursorOn(false)
      return
    }

    if (mode === "typing") {
      timerRef.current = window.setTimeout(() => {
        const next = currentWord.slice(0, typed.length + 1)
        setTyped(next)
        if (next === currentWord) {
          if (isLastStep) setMode("done")
          else setMode("pauseAfterType")
        }
      }, TYPING_MS)
    }

    if (mode === "pauseAfterType") {
      timerRef.current = window.setTimeout(() => setMode("deleting"), AFTER_TYPE_PAUSE_MS)
    }

    if (mode === "deleting") {
      timerRef.current = window.setTimeout(() => {
        const next = currentWord.slice(0, typed.length - 1)
        setTyped(next)
        if (next === "") setMode("pauseAfterDelete")
      }, DELETING_MS)
    }

    if (mode === "pauseAfterDelete") {
      timerRef.current = window.setTimeout(() => {
        setStepIndex((i) => Math.min(i + 1, words.length - 1))
        setMode("typing")
      }, AFTER_DELETE_PAUSE_MS)
    }
  }, [mode, typed, currentWord, isLastStep, words.length])

  return (
    <main className="min-h-screen pt-20">
      {/* HERO */}
      <section className="container-michi px-4 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--tx)]">
          Creamos{" "}
          <span className="text-[var(--accent)]">
            {typed}
            {mode !== "done" && (
              <span className={`inline-block ml-1 ${cursorOn ? "opacity-100" : "opacity-0"}`}>
                |
              </span>
            )}
          </span>
        </h1>

        <p className="mt-5 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[var(--tx)]/80 leading-relaxed">
          MichiWeather combina tecnología climática con impacto social,
          facilitando información útil mientras promovemos la adopción responsable.
        </p>

        <div className="mt-8 sm:mt-10 mb-16 sm:mb-20 flex justify-center">
          <img
            src={banner}
            alt="MichiWeather"
            className="w-full max-w-5xl h-56 sm:h-72 md:h-96 rounded-3xl shadow-michi-1 object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="container-michi px-4 pb-20 space-y-16 sm:space-y-24">

        {/* BLOQUE */}
        {[
          {
            label: "NOSOTROS",
            title: "Quiénes somos",
            text:
              "Somos un equipo que cree que la tecnología debe ser clara, accesible y tener propósito. MichiWeather nace para ofrecer pronósticos confiables y, al mismo tiempo, apoyar causas que importan."
          },
          {
            label: "META",
            title: "Nuestra meta",
            text:
              "Simplificar la consulta del clima y convertir cada visita en una oportunidad para generar impacto positivo."
          },
          {
            label: "ALIADOS",
            title: "Colaboradores",
            text:
              "Organizaciones y marcas que comparten nuestra visión de bienestar, tecnología y adopción responsable."
          }
        ].map((b) => (
          <div key={b.label} className="relative text-center px-2">
            <span className="hidden sm:block absolute inset-x-0 -top-14 text-7xl md:text-8xl font-extrabold tracking-widest text-[var(--tx)]/5 select-none">
              {b.label}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--tx)]">
              {b.title}
            </h2>

            <p className="mt-4 sm:mt-6 max-w-3xl mx-auto text-sm sm:text-base text-[var(--tx)]/75 leading-relaxed">
              {b.text}
            </p>

            {b.label === "META" && (
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {["Claridad", "Rapidez", "Impacto social"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1 rounded-full text-xs font-semibold bg-[var(--accent)]/10 text-[var(--accent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {b.label === "ALIADOS" && (
              <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
                {["MichiRescate A.C.", "Clínica Vet Purrfect", "MeteoData Labs"].map((c) => (
                  <div
                    key={c}
                    className="h-12 w-44 sm:w-48 rounded-xl bg-[var(--panel)] shadow-michi-1 grid place-items-center"
                  >
                    <span className="font-semibold text-[var(--tx)]/70 text-sm sm:text-base">
                      {c}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* CTA */}
        <div className="text-center px-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--tx)]">
            Hablemos
          </h2>

          <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base text-[var(--tx)]/75">
            Si quieres colaborar, apoyar el proyecto o sumar valor,
            estamos a un clic de distancia.
          </p>

          <Link to="/contactanos">
            <button className="mt-6 px-8 py-3 rounded-full bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition">
              Contáctanos
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
