

export async function registerUser(nombre: string, email: string, password: string) {
  const response = await fetch("https://michiweather-backend.onrender.com/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password }),
  });
  return response.json();
}

export async function loginUser(email: string, password: string) {
  const response = await fetch("https://michiweather-backend.onrender.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}
