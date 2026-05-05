import { API_ROUTES } from "../config/api";

export type AuthUser = {
  id: number;
  nombre: string;
  email: string;
};

export type LoginResponse = AuthUser & {
  token: string;
  message?: string;
};

async function parseJsonSafe(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_ROUTES.auth}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await parseJsonSafe(res);

  if (!res.ok) {
    throw new Error(data.message || "Error al iniciar sesión");
  }

  return data as LoginResponse;
}

export async function registerUser(nombre: string, email: string, password: string) {
  const res = await fetch(`${API_ROUTES.auth}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password }),
  });

  const data = await parseJsonSafe(res);

  if (!res.ok) {
    throw new Error(data.message || "Error al registrarse");
  }

  return data;
}

export async function getCurrentUser(token: string): Promise<AuthUser> {
  const res = await fetch(`${API_ROUTES.auth}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await parseJsonSafe(res);

  if (!res.ok) {
    throw new Error(data.message || "No se pudo obtener el usuario actual");
  }

  return data as AuthUser;
}