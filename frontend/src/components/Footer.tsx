import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logoLight from "../assets/Logo/LogoLight.svg";
import logoDark from "../assets/Logo/LogoDark.svg";

export default function Footer() {
  const [dark, setDark] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      setDark(isDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="w-full bg-[var(--panel)] border-t border-[var(--glass)] mt-16">
      <div className="container-michi flex flex-col md:flex-row items-center justify-between gap-4 py-6">
        <div className="flex items-center gap-3">
          <img
            src={dark ? logoDark : logoLight}
            alt="MichiWeather logo"
            className="h-20 w-auto opacity-90"
          />
        </div>

        <div className="text-center">
          <p className="font-semibold text-[var(--muted)] text-sm">
            Clima, personalización y michis en una sola experiencia.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
          <NavLink
            to="/"
            className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200"
          >
            Inicio
          </NavLink>
          <NavLink
            to="/adopcion"
            className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200"
          >
            Adopción
          </NavLink>
          <NavLink
            to="/contacto"
            className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200"
          >
            Contacto
          </NavLink>
        </div>
      </div>

      <div className="w-full text-center text-xs text-[var(--muted)] py-3 border-t border-[var(--glass)]">
        © {new Date().getFullYear()} MichiWeather. Todos los derechos reservados.
      </div>
    </footer>
  );
}