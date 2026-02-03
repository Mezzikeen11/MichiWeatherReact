import { useEffect, useMemo, useRef, useState } from "react";
import banner from "../assets/Nosotros/GATOS.png";
import { Link } from "react-router-dom";

export default function Nosotros() {
  const words = useMemo(() => ["pronósticos…", "compañía…", "hogares."], []);

  const TYPING_MS = 82;             
  const DELETING_MS = 40;          
  const AFTER_TYPE_PAUSE_MS = 1050;
  const AFTER_DELETE_PAUSE_MS = 260;
  const JITTER_MS = 18;            
  const CURSOR_BLINK_MS = 520;     

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
      setCursorOn((s) => !s);
    }, CURSOR_BLINK_MS);

    return () => {
      if (cursorRef.current) window.clearInterval(cursorRef.current);
    };
  }, []);

  useEffect(() => {
    const clear = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
    clear();

    if (mode === "done") {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
      if (cursorRef.current) window.clearInterval(cursorRef.current);
      setCursorOn(false);
      return;
    }

    const jitter = () => Math.floor(Math.random() * JITTER_MS);

    if (mode === "typing") {
      timerRef.current = window.setTimeout(() => {
        const next = currentWord.slice(0, typed.length + 1);
        setTyped(next);

        if (next === currentWord) {
          if (isLastStep) setMode("done");
          else setMode("pauseAfterType");
        }
      }, TYPING_MS + jitter());
    }

    if (mode === "pauseAfterType") {
      timerRef.current = window.setTimeout(() => {
        setMode("deleting");
      }, AFTER_TYPE_PAUSE_MS);
    }

    if (mode === "deleting") {
      timerRef.current = window.setTimeout(() => {
        const next = currentWord.slice(0, Math.max(0, typed.length - 1));
        setTyped(next);

        if (next === "") setMode("pauseAfterDelete");
      }, DELETING_MS + jitter());
    }

    if (mode === "pauseAfterDelete") {
      timerRef.current = window.setTimeout(() => {
        setStepIndex((i) => Math.min(i + 1, words.length - 1));
        setMode("typing");
      }, AFTER_DELETE_PAUSE_MS);
    }

    return clear;
  }, [
    mode,
    typed,
    currentWord,
    isLastStep,
    words.length,
    TYPING_MS,
    DELETING_MS,
    AFTER_TYPE_PAUSE_MS,
    AFTER_DELETE_PAUSE_MS,
    JITTER_MS,
    CURSOR_BLINK_MS,
  ]);

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="w-full flex flex-col items-center justify-center text-center pt-14 pb-20 px-4">
        <div className="max-w-4xl">
          <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--dark)] dark:text-[var(--white)]">
            Creamos{" "}
            <span className="text-[var(--accent)]">
              {typed}
              {/* Cursor solo mientras anima */}
              {mode !== "done" && (
                <span
                  className={`inline-block w-[10px] translate-y-[2px] ${
                    cursorOn ? "opacity-100" : "opacity-0"
                  }`}
                >
                  |
                </span>
              )}
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-[var(--dark)]/80 dark:text-[var(--white)]/80 leading-relaxed">
            Un proyecto que te ayuda a consultar el clima rápido y, al mismo tiempo,
            impulsa la adopción responsable de gatitos.
          </p>


            <div className="mt-8 mb-16 flex justify-center">
        <img
         src={banner}
          alt="MichiWeather: clima y adopción de gatitos"
          className="w-full max-w-4xl h-64 sm:h-80 md:h-96 rounded-3xl shadow-michi-1 object-cover"
           loading="lazy"
         />
        </div>


            {/* CONTENIDO (estilo tipo Oreville, sin cards) */}
<section className="container-michi px-4 pb-12">
  {/* QUÉ ES */}
  <div className="relative text-center pt-20 pb-14">
    {/* Texto gigante tenue de fondo */}
    <div className="pointer-events-none select-none absolute inset-0 flex items-start justify-center">
      <span className="mt-6 text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-widest bg-gradient-to-b from-black/15 to-transparent dark:from-white/15 dark:to-transparent bg-clip-text text-transparent">
        NOSOTROS
      </span>
    </div>

    <h2 className="relative text-4xl sm:text-5xl font-extrabold text-[var(--dark)] dark:text-[var(--white)]">
      Nosotros
    </h2>

    <p className="relative mt-2 text-lg sm:text-xl text-[var(--dark)]/80 dark:text-[var(--white)]/80">
      Clima útil. Adopción responsable.
    </p>

    <p className="relative mt-6 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-[var(--dark)]/70 dark:text-[var(--white)]/70">
      MichiWeather es un proyecto que combina pronóstico del clima con una sección de adopción de gatitos.
      Queremos que consultar el clima sea rápido y claro, y al mismo tiempo apoyar a más michis a encontrar
      un hogar seguro.
    </p>
  </div>

  {/* NUESTRA META */}
  <div className="relative text-center py-14">
    <div className="pointer-events-none select-none absolute inset-0 flex items-start justify-center">
      <span className="mt-2 text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-widest bg-gradient-to-b from-black/15 to-transparent dark:from-white/15 dark:to-transparent bg-clip-text text-transparent">
        NUESTRA META
      </span>
    </div>

    <h2 className="relative text-4xl sm:text-5xl font-extrabold text-[var(--dark)] dark:text-[var(--white)]">
      Nuestra meta
    </h2>

    <p className="relative mt-2 text-lg sm:text-xl text-[var(--dark)]/80 dark:text-[var(--white)]/80">
      Tecnología útil, con un poquito de corazón.
    </p>

    <p className="relative mt-6 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-[var(--dark)]/70 dark:text-[var(--white)]/70">
      Hacer que la información del clima sea fácil de entender y accesible, mientras impulsamos la adopción
      responsable. Buscamos crear una experiencia amable, rápida y con propósito.
    </p>

    <div className="relative mt-6 flex flex-wrap gap-3 justify-center">
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent)]/10 text-[var(--accent)]">
        Claridad
      </span>
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent)]/10 text-[var(--accent)]">
        Rapidez
      </span>
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent)]/10 text-[var(--accent)]">
        Adopción responsable
      </span>
    </div>
  </div>

  {/* COLABORADORES */}
  <div className="relative text-center py-14">
    <div className="pointer-events-none select-none absolute inset-0 flex items-start justify-center">
      <span className="mt-2 text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-widest bg-gradient-to-b from-black/15 to-transparent dark:from-white/15 dark:to-transparent bg-clip-text text-transparent">
        COLABORADORES
      </span>
    </div>

    <h2 className="relative text-4xl sm:text-5xl font-extrabold text-[var(--dark)] dark:text-[var(--white)]">
      Colaboradores
    </h2>

    <p className="relative mt-2 text-lg sm:text-xl text-[var(--dark)]/80 dark:text-[var(--white)]/80">
      Aliados que apoyan nuestra misión.
    </p>

    <p className="relative mt-6 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-[var(--dark)]/70 dark:text-[var(--white)]/70">
      Estas organizaciones y marcas contribuyen a promover la adopción responsable y el bienestar de los michis.
    </p>

    {/* Logos (pon imágenes reales cuando quieras) */}
    <div className="relative mt-10 flex flex-wrap items-center justify-center gap-10">
      <div className="h-10 sm:h-12 w-40 sm:w-48 rounded-xl bg-[var(--panel)] shadow-michi-1 grid place-items-center">
        <span className="font-bold text-[var(--dark)]/70 dark:text-[var(--white)]/70">MichiRescate A.C.</span>
      </div>

      <div className="h-10 sm:h-12 w-40 sm:w-48 rounded-xl bg-[var(--panel)] shadow-michi-1 grid place-items-center">
        <span className="font-bold text-[var(--dark)]/70 dark:text-[var(--white)]/70">Clínica Vet Purrfect</span>
      </div>

      <div className="h-10 sm:h-12 w-40 sm:w-48 rounded-xl bg-[var(--panel)] shadow-michi-1 grid place-items-center">
        <span className="font-bold text-[var(--dark)]/70 dark:text-[var(--white)]/70">MeteoData Labs</span>
      </div>
    </div>
  </div>

  {/* CONTACTO */}
  <div className="relative text-center py-14">
    <div className="pointer-events-none select-none absolute inset-0 flex items-start justify-center">
      <span className="mt-2 text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-widest bg-gradient-to-b from-black/15 to-transparent dark:from-white/15 dark:to-transparent bg-clip-text text-transparent">
        CONTACTANOS
      </span>
    </div>

    <h2 className="relative text-4xl sm:text-5xl font-extrabold text-[var(--dark)] dark:text-[var(--white)]">
      Contáctanos
    </h2>

    <p className="relative mt-2 text-lg sm:text-xl text-[var(--dark)]/80 dark:text-[var(--white)]/80">
      Nos encantaría saber de ti.
    </p>

    <p className="relative mt-6 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-[var(--dark)]/70 dark:text-[var(--white)]/70">
      ¿Te interesa formar parte del proyecto, colaborar con el equipo o apoyar a más michis a conseguir un hogar?
      Escríbenos y con gusto te respondemos.
    </p>
    <Link to="/contactanos">
          <button
            type="button"
            className="mt-5 w-50 rounded-full bg-[var(--accent)] py-3 font-semibold text-white hover:opacity-90 transition"
          >
            Contáctanos
          </button>
    </Link>
    
  </div>
</section>

        </div>
      </section>
    </main>
  );
}