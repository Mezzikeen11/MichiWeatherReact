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

  // Seleccionar ciudad desde buscador
  const handleSelectCity = (cityName: string) => {
    navigate(`/weather/${encodeURIComponent(cityName)}`);
    setMenuOpen(false);
    setSearchOpen(false);
  };

  // Seleccionar recomendada
  const handleSelectRecommended = (locQuery: string) => {
    navigate(`/weather/${encodeURIComponent(locQuery)}`);
    setLocOpen(false);
    setMobileLocOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="w-full fixed top-0 left-0 z-40 bg-[var(--panel)] shadow-md">
      <div className="container-michi flex items-center justify-between h-16 px-4">

        {/* LOGO */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="font-extrabold text-xl tracking-wide text-[var(--accent)]">
              MichiWeather
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8 ml-6">

            {/* CLIMA */}
            <Link
              to="/"
              className="font-semibold text-sm text-[var(--tx)] hover:text-[var(--accent)] transition"
            >
              Clima
            </Link>

            {/* UBICACIONES */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (locTimeout.current) clearTimeout(locTimeout.current);
                setLocOpen(true);
              }}
              onMouseLeave={() => {
                locTimeout.current = setTimeout(() => setLocOpen(false), 200);
              }}
            >
              <button className="font-semibold text-sm text-[var(--tx)] hover:text-[var(--accent)] transition">
                Ubicaciones
              </button>

              {locOpen && (
                <div className="absolute left-0 mt-2 w-52 bg-[var(--panel)] shadow-michi-1 rounded-xl p-2 z-50">
                  <p className="px-3 py-1 text-xs text-[var(--accent)] font-semibold">
                    Recomendadas
                  </p>

                  {recommendedLocations.map((loc, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectRecommended(loc.name)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--accent)]/10 rounded-lg transition"
                    >
                      {loc.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/adoptalos" className="font-semibold text-sm text-[var(--tx)]">
              Adoptalos
            </Link>

            <Link to="/nosotros" className="font-semibold text-sm text-[var(--tx)]">
              Nosotros
            </Link>

            <Link to="/contactanos" className="font-semibold text-sm text-[var(--tx)]">
              Contáctanos
            </Link>
          </nav>
        </div>

        {/* DERECHA */}
        <div className="flex items-center gap-3">

          {/* SEARCH DESKTOP */}
          <div className="hidden sm:block">
            <SearchBar onSelectCity={handleSelectCity} />
          </div>

          {/* SEARCH MOBILE */}
          <button
            onClick={() => setSearchOpen(true)}
            className="sm:hidden h-9 w-9 grid place-items-center hover:bg-[var(--accent)]/10 rounded-full"
          >
            <FiSearch className="text-[var(--accent)]" />
          </button>

          {/* TEMA */}
          <button
            onClick={() => {
              setDark(!dark);
              document.documentElement.setAttribute(
                "data-theme",
                !dark ? "dark" : "light"
              );
            }}
            className="h-9 w-9 rounded-full grid place-items-center hover:shadow-michi-1"
          >
            {dark ? <FiSun className="text-[var(--accent)]" /> : <FiMoon className="text-[var(--accent)]" />}
          </button>

          {/* PERFIL */}
          <Link to="/perfil" className="h-9 w-9 grid place-items-center">
            <FiUser className="text-[var(--accent)]" />
          </Link>

          {/* HAMBURGUESA */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden h-9 w-9 grid place-items-center"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden bg-[var(--panel)] border-t border-[var(--glass)] py-6 px-6 space-y-4">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-base font-medium text-[var(--tx)] hover:text-[var(--accent)]"
          >
            Clima
          </Link>

          <button
            onClick={() => setMobileLocOpen(!mobileLocOpen)}
            className="block text-base font-medium text-left w-full hover:text-[var(--accent)]"
          >
            Ubicaciones
          </button>

          {mobileLocOpen && (
            <div className="pl-4 space-y-2">
              {recommendedLocations.map((loc, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectRecommended(loc.name)}
                  className="block text-sm hover:text-[var(--accent)]"
                >
                  {loc.name}
                </button>
              ))}
            </div>
          )}

          <Link to="/adoptalos" onClick={() => setMenuOpen(false)} className="block text-base font-medium">
            Adóptalos
          </Link>

          <Link to="/nosotros" onClick={() => setMenuOpen(false)} className="block text-base font-medium">
            Nosotros
          </Link>

          <Link to="/contactanos" onClick={() => setMenuOpen(false)} className="block text-base font-medium">
            Contáctanos
          </Link>
        </div>
      )}

      {/* SEARCH MODAL MOBILE */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center pt-24">
          <div className="bg-[var(--panel)] rounded-xl p-4 w-[90%] max-w-sm">
            <SearchBar onSelectCity={handleSelectCity} />
          </div>
        </div>
      )}
    </header>
  );
}
