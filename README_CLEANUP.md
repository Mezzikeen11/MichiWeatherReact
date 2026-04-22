# Limpieza aplicada

## Cambios principales
- Se eliminó el hardcodeo de la URL del backend en el frontend.
- Se eliminó la dependencia de `OpenWeather` en el navegador.
- La búsqueda de ciudades ahora pasa por el backend (`/api/weather/search`).
- Se corrigió la ruta `batch`, que estaba rota por una función inexistente.
- Se quitó el fallback inseguro de `JWT_SECRET`.
- La conexión a PostgreSQL ahora soporta `DATABASE_URL`, ideal para Render.
- Se retiraron archivos sensibles y basura del proyecto (`.git`, `.env`, `node_modules`, `dist`, temporales y duplicados).

## Variables de entorno
### Backend
Usa `backend/.env.example` como plantilla.

### Frontend
Usa `frontend/.env.example` como plantilla.
