import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import type { FocusField } from "./auth.types";
import { useAuth } from "../../context/AuthContext";

type Props = {
  setFocus: (v: FocusField) => void;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function RegisterForm({ setFocus }: Props) {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isDisabled = useMemo(() => {
    return loading || !nombre.trim() || !email.trim() || !password.trim();
  }, [nombre, email, password, loading]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const cleanNombre = nombre.trim();
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanNombre || !cleanEmail || !cleanPassword) {
      setError("Completa todos los campos.");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setError("Ingresa un correo válido.");
      return;
    }

    if (cleanPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      await register(cleanNombre, cleanEmail, cleanPassword);
      navigate("/mi-michi");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo registrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
      <div className="mb-5">
        <h2 className="text-2xl font-extrabold text-[var(--text-strong)]">
          Crear cuenta
        </h2>

        <p className="mt-2 text-sm text-[var(--text-soft)]">
          Regístrate para personalizar tu experiencia.
        </p>
      </div>

      <div>
        <label
          htmlFor="register-username"
          className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--text-strong)]"
        >
          <FiUser className="text-[var(--accent)]" />
          Nombre
        </label>

        <input
          id="register-username"
          type="text"
          className="mw-input"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          onFocus={() => setFocus("username")}
          onBlur={() => setFocus(null)}
          autoComplete="nickname"
          required
        />
      </div>

      <div>
        <label
          htmlFor="register-email"
          className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--text-strong)]"
        >
          <FiMail className="text-[var(--accent)]" />
          Correo
        </label>

        <input
          id="register-email"
          type="email"
          className="mw-input"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onFocus={() => setFocus("email")}
          onBlur={() => setFocus(null)}
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label
          htmlFor="register-password"
          className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--text-strong)]"
        >
          <FiLock className="text-[var(--accent)]" />
          Contraseña
        </label>

        <div className="relative">
          <input
            id="register-password"
            type={showPassword ? "text" : "password"}
            className="mw-input pr-12"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onFocus={() => setFocus("password")}
            onBlur={() => setFocus(null)}
            autoComplete="new-password"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword((state) => !state)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-[var(--text-soft)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isDisabled}
        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-white shadow-michi-1 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </button>
    </form>
  );
}