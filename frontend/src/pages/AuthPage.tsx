import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { registerUser, loginUser } from "../services/authApi";
import bg from "../assets/fondo.png";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<{ nombre: string } | null>(null); // info del usuario si ya hay sesión

  const navigate = useNavigate(); 

  // --- Verificar sesión al cargar la página ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.nombre) {
            setUser({ nombre: data.nombre }); // usuario logueado
          } else {
            localStorage.removeItem("token"); // token inválido
          }
        })
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isLogin) {
        const res = await loginUser(email, password);
        if (res.token) {
          localStorage.setItem("token", res.token);
          setUser({ nombre: res.nombre }); // guardar usuario
          setMessage(`Bienvenido ${res.nombre}`);
        } else {
          setMessage(res.message || "Error en login");
        }
      } else {
        const res = await registerUser(nombre, email, password);
        setMessage(res.message || "Registro completado");
        if (!res.message?.includes?.("Usuario ya registrado")) {
          setIsLogin(true);
        }
      }
    } catch (error: unknown) {
      setMessage("Ocurrió un error, intenta de nuevo");
      console.error(error);
    }
  };

  // --- Mostrar contenido diferente si hay sesión iniciada ---
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center auth-bg auth-bg-logged">
        <div className="absolute inset-0 bg-black/30" aria-hidden />
        <main className="relative z-10 w-full max-w-xl mx-4 text-center text-white">
          <h1 className="text-3xl font-semibold mb-4">¡Hola, {user.nombre}!</h1>
          <p className="mb-6">Ya estás logueado. Puedes ir a la página del clima.</p>
          <button
            onClick={() => navigate("/weather/Cancun")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md shadow-md font-semibold transition-colors"
          >
            Ver clima
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setUser(null);
              setMessage("");
            }}
            className="ml-4 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md shadow-md font-semibold transition-colors"
          >
            Cerrar sesión
          </button>
        </main>
      </div>
    );
  }

  // --- Si no hay sesión, mostrar formulario ---
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center auth-bg"
      style={{ "--bg-image": `url(${bg})` } as React.CSSProperties & { "--bg-image": string }}
    >
      <div className="absolute inset-0 bg-black/30" aria-hidden />

      <main className="relative z-10 w-full max-w-xl mx-4">
        <section className="mx-auto bg-white/40 dark:bg-black/40 backdrop-blur-sm border border-white/20 dark:border-black/20 rounded-2xl shadow-michi-1 p-6 sm:p-8 md:p-12">
          <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-gray-900 dark:text-white">
            {isLogin ? "Inicia sesión" : "Regístrate para recibir el clima en tiempo real"}
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <label className="flex items-center gap-3 bg-white/80 rounded-md shadow-inner px-3 py-2">
                <input
                  className="w-full bg-transparent outline-none text-gray-800 text-dark"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </label>
            )}

            <label className="flex items-center gap-3 bg-white/80 rounded-md shadow-inner px-3 py-2">
              <input
                className="w-full bg-transparent outline-none text-gray-800 text-dark"
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="flex items-center gap-3 bg-white/80 rounded-md shadow-inner px-3 py-2">
              <input
                className="w-full bg-transparent outline-none text-gray-800 text-dark"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition-colors">
              {isLogin ? "Ingresar" : "Crear cuenta"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-800 dark:text-gray-200">
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

          {message && <p className="mt-3 text-center text-sm text-red-600">{message}</p>}
        </section>
      </main>
    </div>
  );
}
