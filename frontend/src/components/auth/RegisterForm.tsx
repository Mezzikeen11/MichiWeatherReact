import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
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
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const passwordMismatch =
    confirmPassword.trim().length > 0 && password !== confirmPassword;

  const isDisabled = useMemo(() => {
    return (
      loading ||
      !nombre.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      passwordMismatch
    );
  }, [nombre, email, password, confirmPassword, passwordMismatch, loading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const cleanNombre = nombre.trim();
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    const cleanConfirmPassword = confirmPassword.trim();

    if (!cleanNombre || !cleanEmail || !cleanPassword || !cleanConfirmPassword) {
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

    if (cleanPassword !== cleanConfirmPassword) {
      setError("Las contraseñas no coinciden.");
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
    <form className="space-y-6" noValidate onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="register-email"
          className="mb-1 block text-sm text-[var(--muted)]"
        >
          Correo electrónico
        </label>

        <input
          id="register-email"
          type="email"
          className="auth-input"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocus("email")}
          onBlur={() => setFocus(null)}
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label
          htmlFor="register-username"
          className="mb-1 block text-sm text-[var(--muted)]"
        >
          Nombre de usuario
        </label>

        <input
          id="register-username"
          type="text"
          className="auth-input"
          placeholder="Nombre de usuario"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onFocus={() => setFocus("username")}
          onBlur={() => setFocus(null)}
          autoComplete="nickname"
          required
        />
      </div>

      <div>
        <label
          htmlFor="register-password"
          className="mb-1 block text-sm text-[var(--muted)]"
        >
          Contraseña
        </label>

        <div className="relative">
          <input
            id="register-password"
            type={showPassword ? "text" : "password"}
            className="auth-input pr-12"
            placeholder="Crea una contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocus("password")}
            onBlur={() => setFocus(null)}
            autoComplete="new-password"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-2 text-[var(--muted)] transition hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="register-confirm-password"
          className="mb-1 block text-sm text-[var(--muted)]"
        >
          Confirmar contraseña
        </label>

        <div className="relative">
          <input
            id="register-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            className="auth-input pr-12"
            placeholder="Repite tu contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={() => setFocus("password")}
            onBlur={() => setFocus(null)}
            autoComplete="new-password"
            required
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-2 text-[var(--muted)] transition hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
            aria-label={
              showConfirmPassword
                ? "Ocultar confirmación de contraseña"
                : "Mostrar confirmación de contraseña"
            }
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {passwordMismatch && (
          <p className="mt-2 text-sm text-red-600">
            Las contraseñas no coinciden.
          </p>
        )}
      </div>

      {error && (
        <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isDisabled}
        className="w-full rounded-full bg-[var(--accent)] py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Registrando..." : "Regístrate"}
      </button>
    </form>
  );
}