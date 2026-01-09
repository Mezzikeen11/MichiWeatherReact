
export async function getWeather(city: string) {
  const apiKey = "441745e11d605543eceacd39828b099d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Error obteniendo clima");

  return response.json();
}
