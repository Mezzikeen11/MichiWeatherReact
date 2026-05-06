import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import MichiAvatar from "./MichiAvatar";
import type { AuthMode, FocusField } from "./auth.types";

export default function AuthCard() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [focus, setFocus] = useState<FocusField>(null);

  const isLogin = mode === "login";

  return (
    <div className="mw-card mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl lg:grid-cols-[0.9fr_1.1fr]">
      {/* Panel Michi */}
      <section className="mw-surface-soft flex flex-col items-center justify-center gap-5 border-b border-[var(--line)] p-6 text-center lg:border-b-0 lg:border-r lg:p-8">
        <div className="auth-michi-scale">
          <MichiAvatar focus={focus} />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-[var(--text-strong)]">
            {isLogin ? "Bienvenido de vuelta" : "Únete a MichiWeather"}
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[var(--text-soft)]">
            {isLogin
              ? "Inicia sesión para consultar tu perfil, tus favoritos y tu michi."
              : "Crea una cuenta para personalizar tu experiencia con MichiWeather."}
          </p>
        </div>
      </section>

      {/* Panel formulario */}
      <section className="p-5 sm:p-7 lg:p-8">
        <div className="mb-6 flex justify-center">
          <div className="mw-surface-soft flex rounded-full p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
                isLogin
                  ? "bg-[var(--accent)] text-white shadow-michi-1"
                  : "text-[var(--text-soft)] hover:text-[var(--accent)]"
              }`}
            >
              <FiLogIn />
              Login
            </button>

            <button
              type="button"
              onClick={() => setMode("register")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
                !isLogin
                  ? "bg-[var(--accent)] text-white shadow-michi-1"
                  : "text-[var(--text-soft)] hover:text-[var(--accent)]"
              }`}
            >
              <FiUserPlus />
              Registro
            </button>
          </div>
        </div>

        <div className="min-h-[430px]">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
              >
                <LoginForm setFocus={setFocus} />
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
              >
                <RegisterForm setFocus={setFocus} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}