import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMenu,
  FiMoon,
  FiSun,
  FiX,
  FiSearch,
} from "react-icons/fi";

import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext";
import { useCat } from "../context/CatContext";

const THEME_KEY = "mw-theme";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { selectedCat } = useCat();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;

    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "dark") return true;
    if (stored === "light") return false;

    return document.documentElement.getAttribute("data-theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  }, [dark]);

  const handleSelectCity = (cityName: string) => {
    navigate(`/weather/${encodeURIComponent(cityName)}`);
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const profileTarget = isAuthenticated ? "/perfil" : "/auth";

  const navClass =
    "font-semibold text-sm text-[var(--tx)] hover:text-[var(--accent)] transition";

  return (
    <header className="w-full fixed top-0 left-0 z-40 bg-[var(--panel)] border-b border-[var(--glass)] shadow-sm">
      <div className="container-michi flex items-center justify-between h-[72px] px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="font-extrabold text-xl tracking-wide text-[var(--accent)]">
              MichiWeather
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 ml-5">
            <NavLink to="/" end className={navClass}>
              Inicio
            </NavLink>

            <NavLink to="/mi-michi" className={navClass}>
              Mi Michi
            </NavLink>

            <NavLink to="/cuidados" className={navClass}>
              Cuidados
            </NavLink>

            <NavLink to="/adopcion" className={navClass}>
              Adopción
            </NavLink>

            <NavLink to="/nosotros" className={navClass}>
              Nosotros
            </NavLink>

            <NavLink to="/contacto" className={navClass}>
              Contacto
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <SearchBar onSelectCity={handleSelectCity} />
          </div>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="sm:hidden h-9 w-9 grid place-items-center hover:bg-[var(--accent)]/10 rounded-full transition"
            aria-label="Buscar ciudad"
          >
            <FiSearch className="text-[var(--accent)]" />
          </button>

          <button
            type="button"
            onClick={() => setDark(!dark)}
            className="h-9 w-9 rounded-full grid place-items-center hover:bg-[var(--accent)]/10 transition"
            aria-label="Cambiar tema"
          >
            {dark ? (
              <FiSun className="text-[var(--accent)]" />
            ) : (
              <FiMoon className="text-[var(--accent)]" />
            )}
          </button>

          <Link
            to={profileTarget}
            className="h-9 w-9 grid place-items-center rounded-full overflow-hidden hover:bg-[var(--accent)]/10 transition"
            aria-label={isAuthenticated ? "Ir al perfil" : "Iniciar sesión"}
          >
            {isAuthenticated && selectedCat?.image ? (
              <img
                src={selectedCat.image}
                alt={selectedCat.name}
                className="h-9 w-9 rounded-full object-cover border border-[var(--accent)]/20 shadow-michi-1"
              />
            ) : (
              <FiUser className="text-[var(--accent)]" />
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden h-9 w-9 grid place-items-center rounded-full hover:bg-[var(--accent)]/10 transition"
            aria-label="Abrir menú"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[var(--panel)] border-t border-[var(--glass)] py-6 px-6 space-y-4">
          <NavLink
            to="/"
            end
            onClick={() => setMenuOpen(false)}
            className="block text-base font-medium text-[var(--tx)] hover:text-[var(--accent)]"
          >
            Inicio
          </NavLink>

          <NavLink
            to="/mi-michi"
            onClick={() => setMenuOpen(false)}
            className="block text-base font-medium text-[var(--tx)] hover:text-[var(--accent)]"
          >
            Mi Michi
          </NavLink>

          <NavLink
            to="/cuidados"
            onClick={() => setMenuOpen(false)}
            className="block text-base font-medium text-[var(--tx)] hover:text-[var(--accent)]"
          >
            Cuidados
          </NavLink>

          <NavLink
            to="/adopcion"
            onClick={() => setMenuOpen(false)}
            className="block text-base font-medium text-[var(--tx)] hover:text-[var(--accent)]"
          >
            Adopción
          </NavLink>

          <NavLink
            to="/nosotros"
            onClick={() => setMenuOpen(false)}
            className="block text-base font-medium text-[var(--tx)] hover:text-[var(--accent)]"
          >
            Nosotros
          </NavLink>

          <NavLink
            to="/contacto"
            onClick={() => setMenuOpen(false)}
            className="block text-base font-medium text-[var(--tx)] hover:text-[var(--accent)]"
          >
            Contacto
          </NavLink>

          <NavLink
            to={profileTarget}
            onClick={() => setMenuOpen(false)}
            className="block text-base font-medium text-[var(--tx)] hover:text-[var(--accent)]"
          >
            {isAuthenticated ? "Perfil" : "Iniciar sesión"}
          </NavLink>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center pt-24 px-4">
          <div className="bg-[var(--panel)] rounded-xl p-4 w-[90%] max-w-sm shadow-michi-1">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-[var(--tx)]">
                Buscar ciudad
              </p>

              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="h-8 w-8 grid place-items-center rounded-full hover:bg-[var(--accent)]/10 transition"
                aria-label="Cerrar buscador"
              >
                <FiX className="text-[var(--tx)]" />
              </button>
            </div>

            <SearchBar onSelectCity={handleSelectCity} />
          </div>
        </div>
      )}
    </header>
  );
}