import { useEffect, useState } from "react";
import logoLight from "../assets/Logo/LogoLight.svg";
import logoDark from "../assets/Logo/LogoDark.svg";
import catLight from "../assets/Logo/CatLight.svg";
import catDark from "../assets/Logo/CatDark.svg";

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
      <div className="w-full container-michi flex flex-col md:flex-row items-center justify-between gap-4 py-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={dark ? logoDark : logoLight}
            alt="MichiWeather logo"
            className="h-20 w-auto opacity-90"
          />
        </div>

        {/* Texto centro */}
        <div className="text-center md:text-left">
          <p className="font-semibold text-[var(--muted)] text-sm">
            Desarrollado con 💚 por el equipo MichiWeather!
          </p>
        </div>

        {/* Devs */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
          <img
            src={dark ? catDark : catLight}
            alt="Cat logo"
            className="h-20 w-auto opacity-90"
          />

          {[
            { name: "Maritza", url: "https://github.com/Mezzikeen11" },
            { name: "Noemi", url: "https://github.com/NoemiPuerto" },
            { name: "Geraldine", url: "https://www.youtube.com/watch?v=RZHi6agHUcQ" },
            { name: "Pedro", url: "https://github.com/Tubiruchi" },
            {
              name: "Gilberto",
              url: "https://preview.redd.it/ucv34e0c4q061.png?width=640&crop=smart&auto=webp&s=d7205528f9553dba539db7ac8c30dbbd6efcdb6b",
            },
          ].map((dev) => (
            <a
              key={dev.name}
              href={dev.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              {dev.name}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full text-center text-xs text-[var(--muted)] py-3 border-t border-[var(--glass)]">
        © {new Date().getFullYear()} MichiWeather. Todos los derechos reservados.
      </div>
    </footer>
  );
}
