import { useState, useMemo } from "react";
import { FiX } from "react-icons/fi";
import Gato1 from "../assets/Adoptar/Gato1.jpg";
import Gato2 from "../assets/Adoptar/Gato2.jpg";
import Gato3 from "../assets/Adoptar/Gato3.jpg";
import Gato4 from "../assets/Adoptar/Gato4.jpg";
import Gato5 from "../assets/Adoptar/Gato5.png";
import Gato6 from "../assets/Adoptar/Gato6.jpg";

interface Cat {
  id: number;
  nombre: string;
  edad: number;
  sexo: "Macho" | "Hembra";
  ciudad: string;
  imagen: string;
  descripcion: string;
}

const catsData: Cat[] = [
  { id: 1, nombre: "Luna", edad: 2, sexo: "Hembra", ciudad: "Cancún", imagen: Gato1, descripcion: "Luna es una gatita juguetona y cariñosa" },
  { id: 2, nombre: "Milly", edad: 3, sexo: "Macho", ciudad: "Playa del Carmen", imagen: Gato2, descripcion: "Milly es tranquilo y le encanta acurrucarse" },
  { id: 3, nombre: "Joe", edad: 1, sexo: "Hembra", ciudad: "Cancún", imagen: Gato3, descripcion: "Joe es pequeña pero muy audaz" },
  { id: 4, nombre: "Felix", edad: 4, sexo: "Macho", ciudad: "Tulum", imagen: Gato4, descripcion: "Felix es un gatito muy curioso" },
  { id: 5, nombre: "Jerry", edad: 2, sexo: "Hembra", ciudad: "Playa del Carmen", imagen: Gato5, descripcion: "Jerry es dulce y amorosa" },
  { id: 6, nombre: "Tom", edad: 3, sexo: "Macho", ciudad: "Cancún", imagen: Gato6, descripcion: "Tom es activo y juguetón" },
  { id: 7, nombre: "Tom", edad: 3, sexo: "Macho", ciudad: "Cancún", imagen: Gato6, descripcion: "Tom es activo y juguetón" },
  { id: 8, nombre: "Tom", edad: 3, sexo: "Macho", ciudad: "Cancún", imagen: Gato6, descripcion: "Tom es activo y juguetón" },
  { id: 9, nombre: "Tom", edad: 3, sexo: "Macho", ciudad: "Cancún", imagen: Gato6, descripcion: "Tom es activo y juguetón" },
  { id: 10, nombre: "Tom", edad: 3, sexo: "Macho", ciudad: "Cancún", imagen: Gato6, descripcion: "Tom es activo y juguetón" },
  { id: 11, nombre: "Tom", edad: 3, sexo: "Macho", ciudad: "Cancún", imagen: Gato6, descripcion: "Tom es activo y juguetón" },
  { id: 12, nombre: "Tom", edad: 3, sexo: "Macho", ciudad: "Cancún", imagen: Gato6, descripcion: "Tom es activo y juguetón" },
];

export default function Adoptalos() {
  const [filterCity, setFilterCity] = useState<string>("");
  const [filterAge, setFilterAge] = useState<string>("");
  const [filterSex, setFilterSex] = useState<string>("");


  const cities = useMemo(() => Array.from(new Set(catsData.map((cat) => cat.ciudad))), []);
  const ages = useMemo(() => Array.from(new Set(catsData.map((cat) => cat.edad))).sort((a, b) => a - b), []);

  const filteredCats = useMemo(() => {
    return catsData.filter((cat) => {
      const cityMatch = !filterCity || cat.ciudad === filterCity;
      const ageMatch = !filterAge || cat.edad === Number(filterAge);
      const sexMatch = !filterSex || cat.sexo === filterSex;
      return cityMatch && ageMatch && sexMatch;
    });
  }, [filterCity, filterAge, filterSex]);

  const clearFilters = () => {
    setFilterCity("");
    setFilterAge("");
    setFilterSex("");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] dark:bg-[var(--bg-dark)] pt-20 pb-10">
      {/* Contenedor principal centrado */}
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Centrado */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-[#1a3a1a] dark:text-[var(--white)] mb-3">
            Adóptalos
          </h1>
          <p className="text-lg text-[var(--dark)] dark:text-[var(--white)]/70">
            ¡Gatitos sin hogar en espera de una familia!
          </p>
        </div>

        {/* Panel de Filtros Horizontal */}
        <div className="bg-[#e8f3e8] dark:bg-[var(--panel)] rounded-2xl p-6 shadow-sm mb-10 border border-green-100 dark:border-none">
          <div className="flex flex-wrap items-end gap-6 justify-center">
            
            {/* Filtro Ciudad */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-[#1a3a1a] mb-2 ml-1">Ciudad</label>
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/80 border border-green-200 rounded-xl text-sm focus:ring-2 focus:ring-[var(--accent)] outline-none transition cursor-pointer"
              >
                <option value="">Todas las ciudades</option>
                {cities.map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>

            {/* Filtro Edad */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-[#1a3a1a] mb-2 ml-1">Edad </label>
              <select
                value={filterAge}
                onChange={(e) => setFilterAge(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/80 border border-green-200 rounded-xl text-sm focus:ring-2 focus:ring-[var(--accent)] outline-none transition cursor-pointer"
              >
                <option value="">Todas las edades</option>
                {ages.map((age) => (
                  <option key={age} value={age}>{age} {age === 1 ? "año" : "años"}</option>
                ))}
              </select>
            </div>

            {/* Filtro Sexo */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-[#1a3a1a] mb-2 ml-1">Sexo</label>
              <select
                value={filterSex}
                onChange={(e) => setFilterSex(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/80 border border-green-200 rounded-xl text-sm focus:ring-2 focus:ring-[var(--accent)] outline-none transition cursor-pointer"
              >
                <option value="">Todos</option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
            </div>

            {/* Botón Limpiar */}
            {(filterCity || filterAge || filterSex) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2.5 text-red-500 font-bold text-sm hover:bg-red-50 rounded-xl transition"
              >
                <FiX /> Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Grid de Gatos */}
        {filteredCats.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredCats.map((cat) => (
              <div
                key={cat.id}
                className="bg-[#e8f3e8] dark:bg-[var(--panel)] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-green-50"
              >
                <div className="w-full h-56 overflow-hidden">
                  <img
                    src={cat.imagen}
                    alt={cat.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-[#1a3a1a] mb-3">{cat.nombre}</h3>
                  <div className="space-y-1 mb-4 text-[#2d5a2d] text-sm">
                    <p><span className="font-bold">Edad:</span> {cat.edad} {cat.edad === 1 ? "año" : "años"}</p>
                    <p><span className="font-bold">Sexo:</span> {cat.sexo}</p>
                    <p><span className="font-bold">Ciudad:</span> {cat.ciudad}</p>
                  </div>
                  <p className="text-sm text-[#4a7c4a] mb-6 italic">"{cat.descripcion}"</p>
                  <button className="w-full py-3 bg-[#2d7a2d] hover:bg-[#235e23] text-white font-bold rounded-xl transition-colors shadow-sm">
                    Adoptar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No se encontraron gatos con esos filtros</p>
            <button onClick={clearFilters} className="mt-4 text-[#2d7a2d] font-bold underline">
              Ver todos los gatos
            </button>
          </div>
        )}

        <div className="mt-12 text-center text-gray-500 text-sm">
          Mostrando {filteredCats.length} de {catsData.length} gatos listos para un hogar
        </div>
      </div>
    </div>
  );
}