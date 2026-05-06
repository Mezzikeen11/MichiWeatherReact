import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiHeart,
  FiInfo,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiSend,
  FiUser,
} from "react-icons/fi";
import ContactCards from "../components/Contactos";

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactForm, string>>;

type HourItem = {
  day: string;
  time: string;
  closed?: boolean;
};

const MAX_MESSAGE_LENGTH = 500;

const hours: HourItem[] = [
  { day: "Lunes", time: "11:00 AM – 9:00 PM" },
  { day: "Martes", time: "11:00 AM – 9:00 PM" },
  { day: "Miércoles", time: "11:00 AM – 9:00 PM" },
  { day: "Jueves", time: "11:00 AM – 9:00 PM" },
  { day: "Viernes", time: "11:00 AM – 9:00 PM" },
  { day: "Sábado", time: "11:00 AM – 9:00 PM" },
  { day: "Domingo", time: "Cerrado", closed: true },
];

const contactReasons = [
  {
    icon: <FiHeart />,
    title: "Adopción responsable",
    text: "Comparte información, refugios o ideas para fortalecer la sección de adopción.",
  },
  {
    icon: <FiInfo />,
    title: "Dudas del proyecto",
    text: "Pregunta sobre el funcionamiento, alcance, diseño o futuras mejoras de MichiWeather.",
  },
  {
    icon: <FiMessageCircle />,
    title: "Comentarios",
    text: "Tus sugerencias ayudan a mejorar la experiencia, el contenido y la navegación.",
  },
];

export default function Contactanos() {
  const [form, setForm] = useState<ContactForm>({
    email: "",
    name: "",
    message: "",
  });

  const [errors, setErrors] = useState<ContactErrors>({});
  const [showModal, setShowModal] = useState(false);

  const validate = () => {
    const newErrors: ContactErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Por favor escribe tu nombre.";
    }

    if (!form.email.trim()) {
      newErrors.email = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Correo no válido.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Escribe un mensaje.";
    } else if (form.message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `El mensaje no debe superar ${MAX_MESSAGE_LENGTH} caracteres.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setShowModal(true);

    setForm({
      email: "",
      name: "",
      message: "",
    });

    setErrors({});
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name as keyof ContactForm]) {
      setErrors((current) => ({
        ...current,
        [name]: undefined,
      }));
    }
  };

  return (
    <main className="min-h-screen py-10">
      <section className="container-michi">
        <div className="mx-auto grid max-w-7xl gap-8">
          {/* Hero */}
          <section className="mw-card overflow-hidden rounded-3xl">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="mw-surface-float mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--text-soft)]">
                  <FiMail className="text-[var(--accent)]" />
                  Contacto
                </div>

                <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-[var(--text-strong)] sm:text-5xl md:text-6xl">
                  Hablemos de MichiWeather.
                </h1>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--text-soft)] sm:text-base md:text-lg">
                  ¿Tienes dudas, ideas o quieres apoyar la adopción
                  responsable? Escríbenos y ayúdanos a seguir mejorando la
                  experiencia.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="mw-surface-soft rounded-3xl p-4">
                    <p className="text-sm text-[var(--text-soft)]">Enfoque</p>

                    <h2 className="mt-1 text-lg font-extrabold text-[var(--text-strong)]">
                      Clima, michis y cuidado
                    </h2>
                  </div>

                  <div className="mw-surface-soft rounded-3xl p-4">
                    <p className="text-sm text-[var(--text-soft)]">
                      Ubicación base
                    </p>

                    <h2 className="mt-1 inline-flex items-center gap-2 text-lg font-extrabold text-[var(--text-strong)]">
                      <FiMapPin className="text-[var(--accent)]" />
                      Cancún, Q. Roo
                    </h2>
                  </div>
                </div>
              </div>

              <div className="mw-surface-soft flex min-h-[320px] items-center justify-center rounded-none border-0 p-6 lg:border-l lg:border-[var(--line)]">
                <div className="mw-surface-float w-full max-w-[420px] rounded-3xl p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[var(--accent)] text-3xl text-white shadow-michi-1">
                    <FiMessageCircle />
                  </div>

                  <h2 className="mt-5 text-2xl font-extrabold text-[var(--text-strong)]">
                    Tu mensaje sí cuenta.
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
                    Esta sección funciona como canal de contacto para dudas,
                    comentarios, propuestas de mejora o apoyo relacionado con
                    adopción responsable.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Motivos de contacto */}
          <section className="mw-card rounded-3xl p-6 sm:p-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">
                  ¿Cómo podemos ayudarte?
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[var(--text-strong)] sm:text-3xl">
                  Elige el motivo de tu mensaje.
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-[var(--text-soft)]">
                Puedes escribirnos por dudas del proyecto, comentarios de diseño
                o propuestas relacionadas con adopción responsable.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {contactReasons.map((item) => (
                <article
                  key={item.title}
                  className="mw-surface-soft rounded-3xl p-5 shadow-michi-1 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mw-surface-float mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-xl text-[var(--accent)]">
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
          </section>

          {/* Formulario */}
          <section className="mw-card rounded-3xl p-6 sm:p-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">
                  Escríbenos
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[var(--text-strong)] sm:text-3xl">
                  Envía tu mensaje
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-[var(--text-soft)]">
                Completa el formulario y comparte tu duda, sugerencia o
                propuesta para mejorar MichiWeather.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--text-strong)]"
                  >
                    <FiUser className="text-[var(--accent)]" />
                    Nombre
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="mw-input"
                  />

                  {errors.name && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--text-strong)]"
                  >
                    <FiMail className="text-[var(--accent)]" />
                    Correo
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    className="mw-input"
                  />

                  {errors.email && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--text-strong)]"
                >
                  <FiMessageCircle className="text-[var(--accent)]" />
                  Mensaje
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={7}
                  maxLength={MAX_MESSAGE_LENGTH}
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  className="mw-input min-h-[180px] resize-none"
                />

                <div className="mt-2 flex items-center justify-between gap-3 text-xs">
                  <span className="font-medium text-red-500">
                    {errors.message || ""}
                  </span>

                  <span className="text-[var(--text-soft)]">
                    {form.message.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-white shadow-michi-1 transition hover:brightness-105"
              >
                <FiSend />
                Enviar mensaje
              </button>
            </form>
          </section>

          {/* Horarios y seguimiento */}
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="mw-card rounded-3xl p-6 sm:p-8">
              <div className="mb-5">
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">
                  Horarios
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[var(--text-strong)]">
                  Atención
                </h2>
              </div>

              <div className="grid gap-3">
                {hours.map((hour) => (
                  <div
                    key={hour.day}
                    className="mw-surface-soft flex items-center gap-3 rounded-2xl p-4"
                  >
                    <FiClock className="shrink-0 text-[var(--accent)]" />

                    <span className="w-24 text-sm font-semibold text-[var(--text-strong)]">
                      {hour.day}
                    </span>

                    <div className="h-px flex-1 bg-[var(--line)]" />

                    <span
                      className={`text-sm font-semibold ${
                        hour.closed ? "text-red-500" : "text-[var(--text-soft)]"
                      }`}
                    >
                      {hour.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mw-card rounded-3xl p-6 sm:p-8">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">
                Seguimiento
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-[var(--text-strong)]">
                ¿Qué pasa después?
              </h2>

              <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
                El formulario valida los datos y muestra una confirmación visual.
                En una siguiente fase, puede conectarse al backend para enviar
                correos reales o guardar mensajes.
              </p>

              <div className="mt-5 grid gap-3">
                <div className="mw-surface-soft flex gap-3 rounded-2xl p-4">
                  <FiCheckCircle className="mt-1 shrink-0 text-[var(--accent)]" />
                  <p className="text-sm leading-6 text-[var(--text-soft)]">
                    Se revisa si el mensaje es duda, sugerencia o propuesta de
                    colaboración.
                  </p>
                </div>

                <div className="mw-surface-soft flex gap-3 rounded-2xl p-4">
                  <FiCheckCircle className="mt-1 shrink-0 text-[var(--accent)]" />
                  <p className="text-sm leading-6 text-[var(--text-soft)]">
                    La conexión real a correo queda contemplada como mejora
                    futura del backend.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Canales rápidos */}
          <section className="mw-card rounded-3xl p-6 sm:p-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">
                  Canales rápidos
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[var(--text-strong)] sm:text-3xl">
                  Otras formas de contacto
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-[var(--text-soft)]">
                También puedes consultar los canales principales del proyecto.
              </p>
            </div>

            <ContactCards />
          </section>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
          <div className="mw-card w-full max-w-sm rounded-3xl p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-soft)]">
              <FiCheckCircle className="text-4xl text-[var(--accent)]" />
            </div>

            <h3 className="text-xl font-extrabold text-[var(--text-strong)]">
              ¡Mensaje enviado!
            </h3>

            <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
              Tu mensaje fue registrado correctamente. Nos pondremos en contacto
              contigo lo más pronto posible.
            </p>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-white shadow-michi-1 transition hover:brightness-105"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </main>
  );
}