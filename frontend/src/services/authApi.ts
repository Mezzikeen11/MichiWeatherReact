import { API_ROUTES } from "../config/api";

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_ROUTES.auth}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al iniciar sesión");
  }

  return data;
}

export async function registerUser(
  nombre: string,
  email: string,
  password: string
) {
  const res = await fetch(`${API_ROUTES.auth}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al registrarse");
  }

  return data;
}
