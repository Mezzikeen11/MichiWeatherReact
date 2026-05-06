import { Link } from "react-router-dom";
import {
  FiAlertTriangle,
  FiDroplet,
  FiHeart,
  FiHome,
  FiMapPin,
  FiShield,
  FiSun,
  FiThermometer,
  FiWind,
} from "react-icons/fi";
import { useCat } from "../context/CatContext";
import CareTipCard from "../components/CareTipCard";

const priorityCards = [
  {
    icon: <FiSun />,
    title: "Calor",
    text: "Ajusta hidratación, sombra y horarios de juego cuando la temperatura sube.",
  },
  {
    icon: <FiDroplet />,
    title: "Lluvia y humedad",
    text: "Mantén cama, arenero y zonas de descanso secos, limpios y ventilados.",
  },
  {
    icon: <FiShield />,
    title: "Seguridad",
    text: "Revisa ventanas, balcones y espacios expuestos ante viento o tormenta.",
  },
];

export default function CarePage() {
  const { selectedCat } = useCat();
  const homeCity = localStorage.getItem("mw-home-city") || "";

  const activeCat = selectedCat ?? {
    name: "Michi",
    image: "",
  };

  const weatherLink = homeCity
    ? `/weather/${encodeURIComponent(homeCity)}`
    : "/";

  return (
    <section className="container-michi py-10">
      <div className="mx-auto grid max-w-6xl gap-6">
        {/* Header */}
        <div className="mw-card overflow-hidden rounded-3xl">
          <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mw-surface-float mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--text-soft)]">
                <FiHeart className="text-[var(--accent)]" />
                Guía de cuidados
              </div>

              <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-[var(--text-strong)] sm:text-4xl lg:text-5xl">
                Cuidados prácticos para tu michi según el clima.
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-soft)] sm:text-base">
                Esta sección convierte condiciones del clima en recomendaciones
                útiles para el bienestar del gato: hidratación, descanso,
                seguridad en casa, ventilación y limpieza.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="mw-surface-soft rounded-3xl p-4 shadow-michi-1">
                  <p className="text-sm text-[var(--text-soft)]">
                    Michi activo
                  </p>

                  <h2 className="mt-1 text-xl font-extrabold text-[var(--text-strong)]">
                    {selectedCat ? activeCat.name : "Sin michi seleccionado"}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                    La selección se administra desde la sección “Mi Michi”.
                  </p>
                </div>

                <div className="mw-surface-soft rounded-3xl p-4 shadow-michi-1">
                  <p className="text-sm text-[var(--text-soft)]">
                    Ciudad principal
                  </p>

                  <h2 className="mt-1 text-xl font-extrabold text-[var(--text-strong)]">
                    {homeCity || "Sin ciudad principal"}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                    Sirve como referencia para consultar el clima y ajustar los
                    cuidados.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={weatherLink}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-white shadow-michi-1 transition hover:brightness-105"
                >
                  <FiHome />
                  Ver clima actual
                </Link>

                <Link
                  to="/perfil"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] px-5 py-3 font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
                >
                  <FiMapPin />
                  Revisar perfil
                </Link>
              </div>
            </div>

            <div className="mw-surface-soft flex min-h-[300px] items-center justify-center rounded-none border-0 p-6 lg:border-l lg:border-[var(--line)]">
              {selectedCat && activeCat.image ? (
                <div className="mw-surface-float w-full max-w-[300px] rounded-3xl p-4 text-center">
                  <img
                    src={activeCat.image}
                    alt={activeCat.name}
                    className="mx-auto h-48 w-full rounded-3xl object-cover"
                  />

                  <p className="mt-4 text-sm text-[var(--text-soft)]">
                    Recomendaciones para
                  </p>

                  <h2 className="text-2xl font-extrabold text-[var(--text-strong)]">
                    {activeCat.name}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                    Usa el clima como referencia para ajustar su entorno diario.
                  </p>
                </div>
              ) : (
                <div className="mw-surface-float rounded-3xl p-6 text-center">
                  <FiHeart className="mx-auto text-4xl text-[var(--accent)]" />

                  <h2 className="mt-3 text-xl font-bold text-[var(--text-strong)]">
                    Personalización pendiente
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                    Puedes elegir un michi desde la sección “Mi Michi”, pero los
                    consejos generales siguen disponibles.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enfoque */}
        <div className="mw-card rounded-3xl p-6 sm:p-8">
          <div className="mb-5">
            <p className="text-sm text-[var(--text-soft)]">
              Enfoque de la guía
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-strong)]">
              Del dato climático al cuidado práctico
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-soft)] sm:text-base">
              MichiWeather no solo consulta el clima: interpreta calor, lluvia,
              viento, humedad o frío para sugerir ajustes simples en el espacio
              del gato.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {priorityCards.map((item) => (
              <article
                key={item.title}
                className="mw-surface-soft rounded-3xl p-5 shadow-michi-1 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mw-surface-float mb-4 w-fit rounded-2xl p-3 text-[var(--accent)]">
                  {item.icon}
                </div>

                <h3 className="font-bold text-[var(--text-strong)]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="grid gap-6 lg:grid-cols-2">
          <CareTipCard
            icon={<FiSun />}
            badge="Calor"
            title="Días calurosos"
            subtitle="Cuando sube la temperatura, el objetivo es evitar estrés térmico."
            tips={[
              "Cambia el agua con más frecuencia y coloca al menos dos puntos de hidratación.",
              "Evita que tu michi descanse sobre superficies calientes, sin ventilación o con sol directo.",
              "Prefiere sesiones de juego cortas durante las horas de más calor.",
              "Observa jadeo, letargo o búsqueda excesiva de zonas frías; pueden ser señales de incomodidad.",
            ]}
          />

          <CareTipCard
            icon={<FiDroplet />}
            badge="Lluvia"
            title="Lluvia y humedad"
            subtitle="La humedad puede afectar el confort aunque la temperatura no sea extrema."
            tips={[
              "Revisa que cama, cobija y rascador no acumulen humedad ni mal olor.",
              "Mantén ventilado el espacio y limpia el arenero con mayor frecuencia.",
              "Si tu michi se moja, seca bien patas y pelaje antes de que descanse.",
              "Evita corrientes frías directas después de lluvia intensa.",
            ]}
          />

          <CareTipCard
            icon={<FiWind />}
            badge="Viento"
            title="Viento y cambios bruscos"
            subtitle="El ambiente puede sentirse más incómodo cuando hay corrientes fuertes."
            tips={[
              "Reduce accesos a balcones, ventanas abiertas o zonas con objetos que puedan caer.",
              "Ubica su zona de descanso en un punto estable, protegido y sin corrientes directas.",
              "Si el clima cambia mucho durante el día, observa si busca más abrigo o aislamiento.",
              "Asegura mosquiteros y ventanas antes de dejarlo solo cerca de zonas expuestas.",
            ]}
          />

          <CareTipCard
            icon={<FiThermometer />}
            badge="Frío"
            title="Frío o noches frescas"
            subtitle="Aunque el clima no sea extremo, algunos michis buscan refugio térmico."
            tips={[
              "Coloca una cobija limpia en una zona sin corrientes de aire.",
              "Evita cambios bruscos entre aire acondicionado, exterior y espacios cerrados.",
              "Observa si duerme más, se enrolla demasiado o evita moverse por frío.",
              "No uses fuentes de calor sin supervisión; prioriza abrigo seguro y seco.",
            ]}
          />

          <CareTipCard
            icon={<FiAlertTriangle />}
            badge="Alerta"
            title="Señales a observar"
            subtitle="El clima puede intensificar molestias o revelar cambios de comportamiento."
            tips={[
              "Presta atención si deja de comer, toma muy poca agua o se esconde más de lo normal.",
              "Revisa respiración, energía y descanso cuando hay calor, humedad o tormenta.",
              "Si notas síntomas persistentes, consulta a un veterinario en lugar de automedicar.",
            ]}
          />

          <CareTipCard
            icon={<FiHeart />}
            badge="Rutina"
            title="Rutina básica diaria"
            subtitle="Más allá del clima, hay hábitos que sostienen su bienestar."
            tips={[
              "Mantén horarios relativamente estables para comida, agua y limpieza.",
              "Usa el clima como contexto para ajustar el entorno, no para alterar toda su rutina.",
              "Combina descanso, juego, higiene y observación diaria para detectar cambios a tiempo.",
            ]}
          />
        </div>

        {/* Cierre */}
        <div className="mw-card rounded-3xl p-6 sm:p-8">
          <p className="text-sm text-[var(--text-soft)]">
            Siguiente evolución
          </p>

          <h2 className="mt-2 max-w-4xl text-2xl font-extrabold text-[var(--text-strong)]">
            En una siguiente fase, los consejos podrían generarse
            dinámicamente con base en el clima real de la ciudad consultada.
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-soft)] sm:text-base">
            La mejora futura sería conectar esta guía con temperatura, humedad,
            viento y probabilidad de lluvia para entregar recomendaciones más
            personalizadas por usuario y por ciudad.
          </p>
        </div>
      </div>
    </section>
  );
}