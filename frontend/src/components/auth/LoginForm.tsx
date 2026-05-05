import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import type { FocusField } from "./auth.types";
import { useAuth } from "../../context/AuthContext";

type Props = {
  setFocus: (v: FocusField) => void;
};

export default function LoginForm({ setFocus }: Props) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isDisabled = useMemo(() => {
    return loading || !email.trim() || !password.trim();
  }, [email, password, loading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError("Completa correo y contraseña.");
      return;
    }

    setLoading(true);

    try {
      await login(cleanEmail, cleanPassword);
      navigate("/perfil");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-6" noValidate onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="login-email"
          className="mb-1 block text-sm text-[var(--muted)]"
        >
          Usuario o correo
        </label>

        <input
          id="login-email"
          type="text"
          className="auth-input"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocus("email")}
          onBlur={() => setFocus(null)}
          autoComplete="username"
          required
        />
      </div>

      <div>
        <label
          htmlFor="login-password"
          className="mb-1 block text-sm text-[var(--muted)]"
        >
          Contraseña
        </label>

        <div className="relative">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            className="auth-input pr-12"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocus("password")}
            onBlur={() => setFocus(null)}
            autoComplete="current-password"
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
        {loading ? "Entrando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}