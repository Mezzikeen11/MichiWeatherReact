import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../services/authApi";
import bg from "../assets/fondo.png";

type User = {
  id: number;
  nombre: string;
  email: string;
  michi: string | null;
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  // ---------------- VERIFICAR SESIÓN ----------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.id) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          return;
        }

        const userData: User = {
          id: data.id,
          nombre: data.nombre,
          email: data.email,
          michi: data.michi ?? null,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        // 🔀 Redirección automática
        if (!userData.michi) {
          navigate("/select-michi");
        } else {
          navigate("/weather/Cancun");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  }, [navigate]);

  // ---------------- SUBMIT LOGIN / REGISTER ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isLogin) {
        const res = await loginUser(email, password);

        if (!res.token) {
          setMessage(res.message || "Error en login");
          return;
        }

        const userData: User = {
          id: res.id,
          nombre: res.nombre,
          email: res.email,
          michi: res.michi ?? null,
        };

        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        // 🔀 Redirección automática
        if (!userData.michi) {
          navigate("/select-michi");
        } else {
          navigate("/weather/Cancun");
        }
      } else {
        const res = await registerUser(nombre, email, password);
        setMessage(res.message || "Registro completado");

        if (!res.message?.includes("Usuario ya registrado")) {
          setIsLogin(true);
        }
      }
    } catch (error) {
      console.error(error);
      setMessage("Ocurrió un error, intenta de nuevo");
    }
  };

  // ---------------- FORMULARIO ----------------
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center auth-bg"
      style={
        { "--bg-image": `url(${bg})` } as React.CSSProperties & {
          "--bg-image": string;
        }
      }
    >
      <div className="absolute inset-0 bg-black/30" aria-hidden />

      <main className="relative z-10 w-full max-w-xl mx-4">
        <section className="mx-auto bg-white/40 dark:bg-black/40 backdrop-blur-sm border border-white/20 dark:border-black/20 rounded-2xl shadow-michi-1 p-6 sm:p-8 md:p-12">
          <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-gray-900 dark:text-white">
            {isLogin
              ? "Inicia sesión"
              : "Regístrate para recibir el clima en tiempo real"}
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <input
                className="px-3 py-2 rounded-md"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            )}

            <input
              className="px-3 py-2 rounded-md"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="px-3 py-2 rounded-md"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition-colors">
              {isLogin ? "Ingresar" : "Crear cuenta"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
            >
              {isLogin ? "Regístrate" : "Inicia sesión"}
            </button>
          </p>

          {message && (
            <p className="mt-3 text-center text-sm text-red-600">{message}</p>
          )}
        </section>
      </main>
    </div>
  );
}
