
import { useState } from "react";
import { searchCities } from "../services/weatherApi";

export default function SearchBar({ onSelectCity }: { onSelectCity: (city: string) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [show, setShow] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      setShow(false);
      return;
    }

    try {
      const res = await searchCities(value);
      setResults(res);
      setShow(true);
    } catch {
      setResults([]);
    }
  }

  function select(c: any) {
    setQuery("");
    setResults([]);
    setShow(false);
    onSelectCity(c.name);
  }

  return (
    <div className="relative w-full max-w-[420px]">
      <div className="flex items-center bg-[var(--white)]/80 dark:bg-[var(--glass)] rounded-full px-3 py-1 shadow-michi-1">
        <input
          value={query}
          onChange={handleChange}
          placeholder="Buscar ciudad..."
          className="w-full bg-transparent outline-none text-sm text-[var(--dark)] dark:text-[var(--white)] placeholder-[var(--muted)]"
          aria-label="Buscar ciudad"
        />
      </div>

      {show && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-[var(--panel)] dark:bg-[var(--panel)] rounded-xl shadow-michi-1 z-50 overflow-hidden max-h-60 overflow-y-auto">
          {results.map((c, i) => (
            <button
              key={`${c.lat}-${c.lon}-${i}`}
              onClick={() => select(c)}
              className="w-full text-left px-4 py-2 hover:bg-[var(--accent)]/10"
            >
              {c.display || `${c.name}${c.country ? ", " + c.country : ""}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

