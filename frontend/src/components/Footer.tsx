import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import logoLight from "../assets/Logo/LogoLight.svg";
import logoDark from "../assets/Logo/LogoDark.svg";

const footerLinks = [
  { to: "/", label: "Inicio", end: true },
  { to: "/mi-michi", label: "Mi Michi" },
  { to: "/cuidados", label: "Cuidados" },
  { to: "/adopcion", label: "Adopción" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
];

export default function Footer() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.getAttribute("data-theme") === "dark";
  });

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

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "rounded-full px-3 py-2 text-sm font-semibold transition",
      isActive
        ? "bg-[var(--accent-soft)] text-[var(--accent)]"
        : "text-[var(--text-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]",
    ].join(" ");

  return (
    <footer className="mt-16 w-full border-t border-[var(--glass)] bg-[var(--panel)] backdrop-blur-xl">
      <div className="container-michi py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <img
              src={dark ? logoDark : logoLight}
              alt="MichiWeather logo"
              className="h-24 w-auto object-contain"
              loading="lazy"
            />

            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--text-soft)]">
              MichiWeather combina clima, personalización y cuidado animal en
              una experiencia visual pensada para usuarios y sus michis.
            </p>
          </div>

          <div className="flex flex-col items-center gap-5 lg:items-end">
            <nav className="flex flex-wrap justify-center gap-2 lg:justify-end">
              {footerLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={linkClass}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <NavLink
              to="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-michi-1 transition hover:brightness-105"
            >
              <FiMail />
              Contáctanos
            </NavLink>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="container-michi flex flex-col items-center justify-between gap-2 py-4 text-center text-xs text-[var(--text-soft)] sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} MichiWeather. Todos los derechos
            reservados.
          </p>

          <p>Clima, michis y cuidado responsable.</p>
        </div>
      </div>
    </footer>
  );
}