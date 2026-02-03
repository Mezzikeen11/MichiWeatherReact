import { useState } from "react";
import ContactCards from "../components/Contactos";

export default function Contactanos() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    message: "",
  });

  const [errors, setErrors]: any = useState({});
  const [showModal, setShowModal] = useState(false)

  const hours = [
    { day: "Lunes", time: "11:00 AM – 9:00 PM" },
    { day: "Martes", time: "11:00 AM – 9:00 PM" },
    { day: "Miércoles", time: "11:00 AM – 9:00 PM" },
    { day: "Jueves", time: "11:00 AM – 9:00 PM" },
    { day: "Viernes", time: "11:00 AM – 9:00 PM" },
    { day: "Sábado", time: "11:00 AM – 9:00 PM" },
    { day: "Domingo", time: "Cerrado", closed: true },
  ]


  const MAX_MESSAGE_LENGTH = 500;

  const validate = () => {
    const newErrors: any = {};

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

  const handleSubmit = (e: any) => {
    console.log("a");
  e.preventDefault()
  if (validate()) {
    setShowModal(true)

    // Opcional: limpiar formulario
    setForm({
      email: "",
      name: "",
      message: "",
    })
  }
}


  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen px-4 py-20">
      {/* TÍTULO */}
      <section className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-6xl font-black text-[var(--tx)] mb-4 tracking-tight" style={{ fontFamily: 'inherit' }}>
          Contáctanos
        </h1>
        <div className="h-1.5 w-24 bg-[var(--accent)] mx-auto rounded-full mb-4" />
        <p className="text-xl text-[var(--)] dark:text-gray-400 font-medium" style={{ fontFamily: 'inherit' }}>
           ¿Tienes dudas, ideas o quieres apoyar la adopción de michis?
        </p>

      </section>

      {/* FORMULARIO */}
      <section className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 bg-[var(--panel)] rounded-3xl p-8 shadow-michi-1"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                className="w-full rounded-xl px-4 py-3 bg-white dark:bg-black/20 outline-none border border-transparent focus:border-[var(--accent)]"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* NOMBRE */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                className="w-full rounded-xl px-4 py-3 bg-white dark:bg-black/20 outline-none border border-transparent focus:border-[var(--accent)]"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>
          </div>

          {/* MENSAJE */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Mensaje
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Cuéntanos en qué podemos ayudarte…"
              className="w-full rounded-xl px-4 py-3 bg-white dark:bg-black/20 outline-none border border-transparent focus:border-[var(--accent)] resize-none"
            />
            <div className="flex justify-between mt-1 text-xs">
              <span className="text-red-500">{errors.message}</span>
              <span className="text-[var(--dark)]/50 dark:text-[var(--white)]/50">
                {form.message.length}/{MAX_MESSAGE_LENGTH}
              </span>
            </div>
          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            className="mt-1 w-full rounded-full bg-[var(--accent)] py-3 font-semibold text-white hover:opacity-90 transition"
          >
            Enviar mensaje
          </button>
        </form>
      </section>

      {/* INFO EXTRA */}
      <section className="mt-8">
        <ContactCards />
      </section>

      <section className="w-full max-w-md mx-auto mt-16 px-4">
      {/* TÍTULO */}
      <div className="bg-[var(--panel)] rounded-2xl p-6 shadow-michi-1">
      <h3 className="text-lg font-bold text-[var(--text-main)] mb-6 text-center">
        Horarios de atención
      </h3>

      {/* LISTA */}
      <div className="flex flex-col gap-4">
        {hours.map((h, idx) => (
          <div key={idx} className="flex items-center gap-3">
            {/* DÍA */}
            <span className="w-24 text-sm font-medium text-[var(--text-main)]">
              {h.day}
            </span>

            {/* LÍNEA */}
            <div className="flex-1 h-px bg-[var(--text-muted)]/30" />

            {/* HORARIO */}
            <span
              className={`text-sm font-medium ${
                h.closed
                  ? "text-red-500"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {h.time}
            </span>
          </div>
        ))}
      </div>
      </div>
    </section>

      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
    <div className="bg-[var(--panel)] rounded-3xl p-8 max-w-sm w-full text-center shadow-michi-1 animate-fade-in">
      
      {/* ICONO */}
      <div className="w-16 h-16 mx-auto rounded-full bg-[var(--accent)]/15 flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-[var(--accent)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* TEXTO */}
      <h3 className="text-lg font-bold text-[var(--text-main)]">
        ¡Mensaje enviado!
      </h3>

      <p className="mt-2 text-sm text-[var(--text-muted)]">
        Tu mensaje ha sido enviado con éxito.  
        Nos pondremos en contacto contigo lo más pronto posible.
      </p>

      {/* BOTÓN */}
      <button
        onClick={() => setShowModal(false)}
        className="mt-6 w-full rounded-full bg-[var(--accent)] py-2.5 font-semibold text-white hover:opacity-90 transition"
      >
        Entendido
      </button>
    </div>
  </div>
)}


    </main>
  );
}
