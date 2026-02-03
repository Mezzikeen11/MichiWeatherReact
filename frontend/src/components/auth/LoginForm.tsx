import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FocusField } from "./auth.types";
import { loginUser } from "../../services/authApi";

type Props = {
  setFocus: (v: FocusField) => void;
};

export default function LoginForm({ setFocus }: Props) {
  const navigate = useNavigate(); // 👈
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await loginUser(email, password);

      localStorage.setItem("token", res.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.id,
          nombre: res.nombre,
          email: res.email,
        })
      );

      // 🚀 REDIRECCIÓN DIRECTA A CAT GALLERY
      navigate("/select-cat");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-6" noValidate onSubmit={handleSubmit}>
      <div>
        <label htmlFor="login-email" className="block text-sm text-[var(--muted)] mb-1">
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
          required
        />
      </div>

      <div>
        <label htmlFor="login-password" className="block text-sm text-[var(--muted)] mb-1">
          Contraseña
        </label>
        <input
          id="login-password"
          type="password"
          className="auth-input"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFocus("password")}
          onBlur={() => setFocus(null)}
          required
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[var(--accent)] text-white py-2 rounded-full text-sm transition disabled:opacity-60"
      >
        {loading ? "Entrando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
