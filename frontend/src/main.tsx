// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WeatherPage from "./pages/WeatherPage";
import AuthPage from "./pages/AuthPage";
import SelectCatPage from "./pages/SelectCat/SelectCat";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen pt-20 pb-5">
        <Routes>
          <Route path="/" element={<WeatherPage />} />
          <Route path="/perfil" element={<AuthPage />} />
          <Route path="/select-cat" element={<SelectCatPage />} />
          <Route path="/weather/:city" element={<WeatherPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
