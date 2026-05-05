import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import "./globals.css";

import { AuthProvider } from "./context/AuthContext";
import { CatProvider } from "./context/CatContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import WeatherPage from "./pages/WeatherPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import AdoptionPage from "./pages/AdoptionPage";
import SelectCatPage from "./pages/SelectCat/SelectCat";
import Contactanos from "./pages/Contactanos";
import Nosotros from "./pages/Nosotros";
import CarePage from "./pages/CarePage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CatProvider>
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 pt-20 pb-5">
              <Routes>
                <Route path="/" element={<WeatherPage />} />
                <Route path="/weather/:city" element={<WeatherPage />} />

                <Route path="/auth" element={<AuthPage />} />

                <Route
                  path="/perfil"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/mi-michi"
                  element={
                    <ProtectedRoute>
                      <SelectCatPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/select-cat"
                  element={<Navigate to="/mi-michi" replace />}
                />

                <Route path="/cuidados" element={<CarePage />} />

                <Route path="/adopcion" element={<AdoptionPage />} />
                <Route
                  path="/adoptalos"
                  element={<Navigate to="/adopcion" replace />}
                />

                <Route path="/nosotros" element={<Nosotros />} />

                <Route path="/contacto" element={<Contactanos />} />
                <Route
                  path="/contactanos"
                  element={<Navigate to="/contacto" replace />}
                />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </CatProvider>
    </AuthProvider>
  </StrictMode>
);