import { Link } from "react-router-dom";
import {
  FiDroplet,
  FiHeart,
  FiHome,
  FiMapPin,
  FiSun,
  FiWind,
} from "react-icons/fi";
import { useCat } from "../context/CatContext";
import CareTipCard from "../components/CareTipCard";

export default function CarePage() {
  const { selectedCat } = useCat();
  const homeCity = localStorage.getItem("mw-home-city") || "";

  const activeCat = selectedCat ?? {
    name: "Michi",
    image: "",
  };

  return (
    <section className="container-michi py-10">
      <div className="mx-auto grid max-w-6xl gap-6">
        {/* Header */}
        <div className="rounded-3xl bg-[var(--panel)] p-6 shadow-michi-1 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm text-[var(--text-soft)]">Cuidados</p>

              <h1 className="mt-2 text-3xl font-bold text-[var(--text-strong)] sm:text-4xl">
                Cuida mejor a tu michi según el entorno.
              </h1>

              <p className="mt-3 text-sm leading-7 text-[var(--text-soft)] sm:text-base">
                Esta sección reúne recomendaciones prácticas para que el clima
                no se quede solo en una temperatura: aquí lo traducimos a
                bienestar, descanso, hidratación y rutina diaria para tu michi.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--panel2)] px-4 py-2 text-sm text-[var(--text-soft)] shadow-michi-1">
                  <FiHeart className="text-[var(--accent)]" />
                  {selectedCat ? `${activeCat.name} activo` : "Modo visita"}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--panel2)] px-4 py-2 text-sm text-[var(--text-soft)] shadow-michi-1">
                  <FiMapPin className="text-[var(--accent)]" />
                  {homeCity || "Sin ciudad principal"}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 sm:items-end">
              {selectedCat && activeCat.image ? (
                <div className="flex items-center gap-3 rounded-2xl bg-[var(--panel2)] px-4 py-3 shadow-michi-1">
                  <img
                    src={activeCat.image}
                    alt={activeCat.name}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                  <div>
                    <p className="text-sm text-[var(--text-soft)]">
                      Michi seleccionado
                    </p>
                    <p className="font-semibold text-[var(--text-strong)]">
                      {activeCat.name}
                    </p>
                  </div>
                </div>
              ) : null}

              <Link
                to="/"
                className="inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-2.5 font-semibold text-white shadow-michi-1 transition hover:brightness-105"
              >
                Volver al clima
              </Link>
            </div>
          </div>
        </div>

        {/* Intro corta */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-[var(--panel)] p-5 shadow-michi-1">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[var(--panel2)] p-3 text-[var(--accent)] shadow-michi-1">
                <FiSun />
              </div>
              <div>
                <p className="text-sm text-[var(--text-soft)]">Prioridad</p>
                <h2 className="font-semibold text-[var(--text-strong)]">
                  Hidratación y sombra
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[var(--panel)] p-5 shadow-michi-1">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[var(--panel2)] p-3 text-[var(--accent)] shadow-michi-1">
                <FiDroplet />
              </div>
              <div>
                <p className="text-sm text-[var(--text-soft)]">Prioridad</p>
                <h2 className="font-semibold text-[var(--text-strong)]">
                  Espacios secos y limpios
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[var(--panel)] p-5 shadow-michi-1">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[var(--panel2)] p-3 text-[var(--accent)] shadow-michi-1">
                <FiHome />
              </div>
              <div>
                <p className="text-sm text-[var(--text-soft)]">Prioridad</p>
                <h2 className="font-semibold text-[var(--text-strong)]">
                  Rutina estable y descanso
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="grid gap-6 lg:grid-cols-2">
          <CareTipCard
            icon={<FiSun />}
            title="Días calurosos"
            subtitle="Cuando sube la temperatura, el objetivo es evitar estrés térmico."
            tips={[
              "Cambia el agua con más frecuencia y mantén al menos un punto fresco dentro de casa.",
              "Evita que tu michi descanse sobre superficies demasiado calientes o sin ventilación.",
              "Prefiere momentos de juego más tranquilos durante las horas de más sol.",
            ]}
          />

          <CareTipCard
            icon={<FiDroplet />}
            title="Lluvia y humedad"
            subtitle="La humedad cambia el confort del espacio aunque no haga tanto frío."
            tips={[
              "Revisa que su cama o cobija no acumulen humedad ni mal olor.",
              "Mantén ventilado el espacio y limpia con más frecuencia el arenero.",
              "Si se moja, seca bien patas y pelaje antes de que descanse.",
            ]}
          />

          <CareTipCard
            icon={<FiWind />}
            title="Viento y cambios bruscos"
            subtitle="El ambiente puede sentirse más incómodo aunque la temperatura no sea extrema."
            tips={[
              "Reduce accesos a zonas expuestas como balcones o espacios con corrientes fuertes.",
              "Ubica su zona de descanso en un punto más estable y protegido.",
              "Si el clima cambia mucho en el día, observa si busca más abrigo o aislamiento.",
            ]}
          />

          <CareTipCard
            icon={<FiHeart />}
            title="Rutina básica diaria"
            subtitle="Más allá del clima, hay hábitos que sostienen su bienestar."
            tips={[
              "Mantén horarios relativamente estables para comida, agua y limpieza.",
              "Observa cambios en apetito, energía o descanso cuando el clima se pone extremo.",
              "Usa el clima como contexto para ajustar el entorno, no para alterar toda su rutina.",
            ]}
          />
        </div>

        {/* Próximo paso */}
        <div className="rounded-3xl bg-[var(--panel)] p-6 shadow-michi-1">
          <p className="text-sm text-[var(--text-soft)]">Siguiente evolución</p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--text-strong)]">
            Más adelante esta sección podrá usar tu ciudad principal y el clima actual.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-soft)] sm:text-base">
            La idea es que estos cuidados dejen de ser solo generales y se
            adapten mejor a tu contexto: calor, lluvia, humedad o viento según
            la ciudad que consultas más y tu michi favorito.
          </p>
        </div>
      </div>
    </section>
  );
}