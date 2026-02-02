import { createContext, useContext, useEffect, useState } from "react";
import { type Cat } from "../types/cat";

type CatContextType = {
  selectedCat: Cat | null;
  selectCat: (cat: Cat) => void;
};

const CatContext = createContext<CatContextType | undefined>(undefined);

export function CatProvider({ children }: { children: React.ReactNode }) {
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

  // cargar de localStorage
  useEffect(() => {
    const storedCat = localStorage.getItem("selectedCat");
    if (storedCat) {
      setSelectedCat(JSON.parse(storedCat));
    }
  }, []);

  const selectCat = (cat: Cat) => {
    setSelectedCat(cat);
    localStorage.setItem("selectedCat", JSON.stringify(cat));
  };

  return (
    <CatContext.Provider value={{ selectedCat, selectCat }}>
      {children}
    </CatContext.Provider>
  );
}

export function useCat() {
  const context = useContext(CatContext);
  if (!context) {
    throw new Error("useCat debe usarse dentro de CatProvider");
  }
  return context;
}
