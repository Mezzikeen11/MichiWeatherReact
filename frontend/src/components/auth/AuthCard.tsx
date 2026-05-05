import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import MichiAvatar from "./MichiAvatar";
import type { AuthMode, FocusField } from "./auth.types";

export default function AuthCard() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [focus, setFocus] = useState<FocusField>(null);

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-5">
      <div className="text-center">
        <h1 className="text-[var(--tx)] font-bold text-2xl sm:text-3xl">
          {mode === "login" ? "Bienvenido de vuelta" : "Bienvenido a MichiWeather"}
        </h1>

        <p className="mt-2 text-sm sm:text-base text-[var(--muted)]">
          {mode === "login"
            ? "Inicia sesión y continúa con tu michi favorito."
            : "Crea tu cuenta y personaliza tu experiencia felina."}
        </p>
      </div>

      <div className="bg-[var(--panel)] rounded-full p-1 flex gap-1 shadow-michi-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            mode === "login"
              ? "bg-[var(--accent)] text-white"
              : "text-[var(--muted)] hover:text-[var(--dark)]"
          }`}
        >
          Inicio
        </button>

        <button
          type="button"
          onClick={() => setMode("register")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            mode === "register"
              ? "bg-[var(--accent)] text-white"
              : "text-[var(--muted)] hover:text-[var(--dark)]"
          }`}
        >
          Registro
        </button>
      </div>

      <div className="relative z-10 flex justify-center">
        <div className="absolute inset-0 rounded-full bg-[var(--accent)]/10 blur-2xl scale-110" />
        <div className="relative auth-michi-scale">
          <MichiAvatar focus={focus} />
        </div>
      </div>

      <div
        className="
          w-full
          rounded-[28px]
          shadow-michi-1
          px-6 sm:px-8
          py-7 sm:py-8
          overflow-hidden
          bg-[var(--glass)]
          backdrop-blur-md
          border border-black/5 dark:border-white/10
        "
      >
        <AnimatePresence mode="wait">
          {mode === "login" ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 32 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <LoginForm setFocus={setFocus} />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <RegisterForm setFocus={setFocus} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}