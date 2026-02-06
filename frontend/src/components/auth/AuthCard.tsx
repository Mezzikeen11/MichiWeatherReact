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
    <div className="w-full max-w-md flex flex-col items-center gap-6">

      {/* TÍTULO */}
      <h1 className="text-[var(--tx)] font-semibold text-center">
        {mode === "login"
          ? "Bienvenido de vuelta"
          : "Bienvenidos a MichiWeather"}
      </h1>

      {/* SWITCH */}
      <div className="bg-[var(--panel)] rounded-full p-1 flex gap-1 shadow-michi-1">
        <button
          onClick={() => setMode("login")}
          className={`px-4 py-1 rounded-full text-sm font-medium transition
            ${mode === "login"
              ? "bg-[var(--accent)] text-white"
              : "text-[var(--muted)] hover:text-[var(--dark)]"}
          `}
        >
          Inicio
        </button>

        <button
          onClick={() => setMode("register")}
          className={`px-4 py-1 rounded-full text-sm font-medium transition
            ${mode === "register"
              ? "bg-[var(--accent)] text-white"
              : "text-[var(--muted)] hover:text-[var(--dark)]"}
          `}
        >
          Registro
        </button>
      </div>

      {/* AVATAR */}
      <MichiAvatar focus={focus} />

      {/* CARD */}
      <div
            className="
                w-full
                rounded-2xl
                shadow-michi-1
                px-8 py-8
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
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <LoginForm setFocus={setFocus} />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <RegisterForm setFocus={setFocus} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
