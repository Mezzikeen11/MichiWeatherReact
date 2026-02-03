import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FocusField } from "./auth.types";
import { registerUser } from "../../services/authApi";

type Props = {
  setFocus: (v: FocusField) => void;
};

export default function RegisterForm({ setFocus }: Props) {
  const navigate = useNavigate(); // 👈
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await registerUser(nombre, email, password);

      // 🚀 REGISTRO → CAT GALLERY
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
        <label htmlFor="register-email" className="block text-sm text-[var(--muted)] mb-1">
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
          required
        />
      </div>

      <div>
        <label htmlFor="register-username" className="block text-sm text-[var(--muted)] mb-1">
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
          required
        />
      </div>

      <div>
        <label htmlFor="register-password" className="block text-sm text-[var(--muted)] mb-1">
          Contraseña
        </label>
        <input
          id="register-password"
          type="password"
          className="auth-input"
          placeholder="Crea una contraseña"
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
        {loading ? "Registrando..." : "Regístrate"}
      </button>
    </form>
  );
}
