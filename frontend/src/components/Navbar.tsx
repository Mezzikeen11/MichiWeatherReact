import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMenu, FiMoon, FiSun, FiX, FiSearch } from "react-icons/fi";
import SearchBar from "./SearchBar";
import { recommendedLocations } from "../utils/recommendedLocations";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [locOpen, setLocOpen] = useState(false);
  const [mobileLocOpen, setMobileLocOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const locTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.getAttribute("data-theme") === "dark";
  });

  // 🔹 Selección desde SearchBar
  const handleSelectCity = (cityName: string) => {
    navigate(`/weather/${encodeURIComponent(cityName)}`);
    setMenuOpen(false);
    setSearchOpen(false);
  };

  // 🔹 Selección desde ubicaciones recomendadas
  const handleSelectRecommended = (locQuery: string) => {
    navigate(`/weather/${encodeURIComponent(locQuery)}`);
    setLocOpen(false);
    setMobileLocOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="w-full fixed top-0 left-0 z-40 bg-[var(--panel)] dark:bg-[var(--panel)] shadow-md transition-colors duration-300">
      <div className="container-michi flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="font-extrabold text-xl tracking-wide text-[var(--accent)] dark:text-[var(--white)]">
              MichiWeather
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 ml-6">
            <Link
              to="/"
              className="font-semibold text-sm text-[var(--dark)] dark:text-[var(--white)] hover:text-[var(--accent)] transition"
            >
              Inicio
            </Link>

            {/* Ubicaciones - CON HOVER Y DELAY */}
            <div 
              className="relative"
              onMouseEnter={() => {
                if (locTimeout.current) clearTimeout(locTimeout.current);
                setLocOpen(true);
              }}
              onMouseLeave={() => {
                locTimeout.current = setTimeout(() => {
                  setLocOpen(false);
                }, 200);
              }}
            >
              <button className="font-semibold text-sm text-[var(--dark)] dark:text-[var(--white)] hover:text-[var(--accent)] transition">
                Ubicaciones
              </button>

              {locOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-[var(--panel)] shadow-michi-1 rounded-xl p-2 z-50">
                  <p className="px-3 py-1 text-xs text-[var(--accent)] font-semibold">
                    Recomendadas
                  </p>

                  <div className="flex flex-col">
                    {recommendedLocations.map((loc, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectRecommended(loc.name)}
                        className="text-left px-3 py-2 text-sm hover:bg-[var(--accent)]/10 rounded-lg transition"
                      >
                        {loc.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/adoptalos"
              className="font-semibold text-sm text-[var(--dark)] dark:text-[var(--white)] hover:text-[var(--accent)] transition"
            >
              Adoptalos
            </Link>

          </nav>
        </div>

        {/* DERECHA */}
        <div className="flex items-center gap-3">
          {/* 🔍 SearchBar SOLO en desktop */}
          <div className="hidden sm:block">
            <SearchBar onSelectCity={handleSelectCity} />
          </div>

          {/* 🔍 LUPA SOLO EN MÓVIL */}
          <button
            onClick={() => setSearchOpen(true)}
            className="sm:hidden h-9 w-9 grid place-items-center hover:bg-[var(--accent)]/10 rounded-full"
            aria-label="Buscar ciudad"
          >
            <FiSearch className="text-[var(--accent)]" />
          </button>

          {/* 🌙 Tema */}
          <button
            onClick={() => {
              setDark((s) => !s);
              document.documentElement.setAttribute(
                "data-theme",
                !dark ? "dark" : "light"
              );
            }}
            title="Cambiar tema"
            aria-label="Cambiar tema"
            className="h-9 w-9 rounded-full grid place-items-center hover:shadow-michi-1 transition bg-transparent"
          >
            {dark ? (
              <FiSun className="text-[var(--accent)]" />
            ) : (
              <FiMoon className="text-[var(--accent)]" />
            )}
          </button>

          {/* 👤 Perfil */}
          <Link
            to="/perfil"
            title="Perfil"
            className="h-9 w-9 rounded-full grid place-items-center hover:shadow-michi-1 transition bg-transparent"
          >
            <FiUser className="text-[var(--accent)]" />
          </Link>

          {/* ☰ Hamburguesa */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="h-9 w-9 inline-flex items-center justify-center lg:hidden hover:bg-[var(--accent)]/10 transition rounded"
            aria-label="Abrir menú"
          >
            {menuOpen ? (
              <FiX className="text-[var(--dark)] dark:text-[var(--white)]" />
            ) : (
              <FiMenu className="text-[var(--dark)] dark:text-[var(--white)]" />
            )}
          </button>
        </div>
      </div>

      {/* 📱 MENÚ MOBILE */}
      {menuOpen && (
        <div className="lg:hidden bg-[var(--panel)] dark:bg-[var(--panel)] border-t border-[var(--glass)] py-4 px-6 space-y-3 animate-fade-in">
          <Link
            to="/"
            className="block font-medium hover:text-[var(--accent)] transition"
          >
            Inicio
          </Link>

          {/* Ubicaciones MOBILE - CON CLICK */}
          <button
            onClick={() => setMobileLocOpen(!mobileLocOpen)}
            className="block font-medium hover:text-[var(--accent)] transition text-left w-full"
          >
            Ubicaciones
          </button>

          {mobileLocOpen && (
            <div className="pl-4">
              {recommendedLocations.map((loc, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectRecommended(loc.name)}
                  className="block py-2 text-sm hover:text-[var(--accent)] transition"
                >
                  {loc.name}
                </button>
              ))}
            </div>
          )}

          <Link
            to="/adoptalos"
            className="block font-medium hover:text-[var(--accent)] transition"
          >
            
            Adoptalos
          </Link>
        </div>
      )}

      {/* 🔍 MODAL DE BÚSQUEDA EN MÓVIL */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-24">
          <div className="bg-[var(--panel)] rounded-xl p-4 w-[90%] max-w-sm shadow-michi-1">
            <SearchBar onSelectCity={handleSelectCity} />
          </div>
        </div>
      )}
    </header>
  );
}