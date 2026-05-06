import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiMoon,
  FiSearch,
  FiSun,
  FiUser,
  FiX,
} from "react-icons/fi";

import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext";
import { useCat } from "../context/CatContext";

const THEME_KEY = "mw-theme";

const navItems = [
  { to: "/", label: "Inicio", end: true },
  { to: "/mi-michi", label: "Mi Michi" },
  { to: "/cuidados", label: "Cuidados" },
  { to: "/adopcion", label: "Adopción" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
];

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

  const navClass = ({ isActive }: { isActive: boolean }) =>
    [
      "rounded-full px-3 py-2 text-sm font-semibold transition",
      isActive
        ? "bg-[var(--accent-soft)] text-[var(--accent)]"
        : "text-[var(--tx)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]",
    ].join(" ");

  const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
    [
      "block rounded-2xl px-4 py-3 text-base font-semibold transition",
      isActive
        ? "bg-[var(--accent)] text-white shadow-michi-1"
        : "text-[var(--tx)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]",
    ].join(" ");

  return (
    <header className="fixed left-0 top-0 z-40 w-full border-b border-[var(--glass)] bg-[var(--panel)] shadow-sm backdrop-blur-xl">
      <div className="container-michi flex h-[72px] items-center justify-between px-4">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex shrink-0 items-center gap-3"
            aria-label="Ir al inicio de MichiWeather"
          >
            <span className="text-xl font-extrabold tracking-wide text-[var(--accent)]">
              MichiWeather
            </span>
          </Link>

          <nav className="ml-5 hidden items-center gap-3 xl:gap-5 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <SearchBar onSelectCity={handleSelectCity} />
          </div>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-full text-[var(--accent)] transition hover:bg-[var(--accent-soft)] sm:hidden"
            aria-label="Buscar ciudad"
          >
            <FiSearch />
          </button>

          <button
            type="button"
            onClick={() => setDark((state) => !state)}
            className="grid h-9 w-9 place-items-center rounded-full text-[var(--accent)] transition hover:bg-[var(--accent-soft)]"
            aria-label="Cambiar tema"
          >
            {dark ? <FiSun /> : <FiMoon />}
          </button>

          <Link
            to={profileTarget}
            onClick={() => setMenuOpen(false)}
            className="grid h-9 w-9 place-items-center overflow-hidden rounded-full text-[var(--accent)] transition hover:bg-[var(--accent-soft)]"
            aria-label={isAuthenticated ? "Ir al perfil" : "Iniciar sesión"}
          >
            {isAuthenticated && selectedCat?.image ? (
              <img
                src={selectedCat.image}
                alt={selectedCat.name}
                className="h-9 w-9 rounded-full border border-[var(--accent)]/20 object-cover shadow-michi-1"
              />
            ) : (
              <FiUser />
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((state) => !state)}
            className="grid h-9 w-9 place-items-center rounded-full text-[var(--accent)] transition hover:bg-[var(--accent-soft)] lg:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-[var(--glass)] bg-[var(--panel)] px-4 py-5 shadow-sm lg:hidden">
          <div className="container-michi grid gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMenuOpen(false)}
                className={mobileNavClass}
              >
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to={profileTarget}
              onClick={() => setMenuOpen(false)}
              className={mobileNavClass}
            >
              {isAuthenticated ? "Perfil" : "Iniciar sesión"}
            </NavLink>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-50 flex justify-center bg-black/45 px-4 pt-24 backdrop-blur-sm">
          <div className="mw-card h-fit w-full max-w-md rounded-3xl p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">
                  Buscar ciudad
                </p>

                <p className="mt-1 text-sm text-[var(--text-soft)]">
                  Consulta el clima de una ubicación.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full text-[var(--accent)] transition hover:bg-[var(--accent-soft)]"
                aria-label="Cerrar buscador"
              >
                <FiX />
              </button>
            </div>

            <SearchBar onSelectCity={handleSelectCity} />
          </div>
        </div>
      )}
    </header>
  );
}