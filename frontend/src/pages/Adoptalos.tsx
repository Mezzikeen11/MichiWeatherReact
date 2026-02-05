
import "./Adoptalos.css";
import { useState, useMemo } from "react";
import { FiX, FiEye, FiCheckCircle, FiMapPin, FiSend, FiHeart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Gato1 from "../assets/Adoptar/Gato1.jpg";
import Gato2 from "../assets/Adoptar/Gato2.jpg";
import Gato3 from "../assets/Adoptar/Gato3.jpeg";
import Gato4 from "../assets/Adoptar/Gato4.webp";
import Gato5 from "../assets/Adoptar/Gato5.jpg";
import Gato6 from "../assets/Adoptar/Gato6.webp";
import Gato7 from "../assets/Adoptar/Gato7.webp";
import Gato8 from "../assets/Adoptar/Gato8.jpg";
import Gato9 from "../assets/Adoptar/Gato9.webp";
import Gato10 from "../assets/Adoptar/Gato10.jpg";
import Gato11 from "../assets/Adoptar/Gato11.avif";
import Gato12 from "../assets/Adoptar/Gato12.jpg";

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
  { id: 1, nombre: "Sia", edad: 1, sexo: "Hembra", ciudad: "Cancún", imagen: Gato1, descripcion: "De temperamento tranquilo y reservado. Se adapta mejor a hogares con adultos." },
  { id: 2, nombre: "Roco", edad: 3, sexo: "Macho", ciudad: "Playa del Carmen", imagen: Gato2, descripcion: "Ejemplar independiente y tranquilo. Prefiere ambientes calmados y es muy dócil." },
  { id: 3, nombre: "Maya", edad: 1, sexo: "Hembra", ciudad: "Cancún", imagen: Gato3, descripcion: "Joven y llena de energía. Requiere estimulación física y espacio para jugar." },
  { id: 4, nombre: "Felix", edad: 4, sexo: "Macho", ciudad: "Tulum", imagen: Gato4, descripcion: "Rescatado con excelente salud, es dócil y se habitúa rápido." },
  { id: 5, nombre: "Jerry", edad: 1, sexo: "Macho", ciudad: "Playa del Carmen", imagen: Gato5, descripcion: "Gato joven con altos niveles de energía; ideal para una familia que le brinde tiempo de juego." },
  { id: 6, nombre: "Tom", edad: 1, sexo: "Macho", ciudad: "Cancún", imagen: Gato7, descripcion: "Explorador por naturaleza y muy valiente. Ideal para una familia activa." },
  { id: 7, nombre: "Coco", edad: 5, sexo: "Hembra", ciudad: "Cancún", imagen: Gato6, descripcion: "Gatita muy educada, busca un hogar tranquilo." },
  { id: 8, nombre: "Nala", edad: 3, sexo: "Hembra", ciudad: "Tulum", imagen: Gato8, descripcion: "Destaca por su comportamiento educado; es silenciosa y muy limpia en su entorno." },
  { id: 9, nombre: "Simba", edad: 1, sexo: "Macho", ciudad: "Cancún", imagen: Gato9, descripcion: "Un pequeño cachorro lleno de vida y ganas de jugar." },
  { id: 10, nombre: "Pixel", edad: 2, sexo: "Hembra", ciudad: "Playa del Carmen", imagen: Gato10, descripcion: "Tiene un pelaje que requiere cepillado constante; es muy paciente durante el aseo." },
  { id: 11, nombre: "Milo", edad: 3, sexo: "Macho", ciudad: "Cancún", imagen: Gato11, descripcion: "Muy observador y pacífico; prefiere los ambientes relajados y sin ruidos fuertes.." },
  { id: 12, nombre: "Bibi", edad: 2, sexo: "Hembra", ciudad: "Playa del Carmen", imagen: Gato12, descripcion: "Gatita muy adaptable ante cambios de entorno y ruidos domésticos." },
];

export default function Adoptalos() {
  const [filterCity, setFilterCity] = useState<string>("");
  const [filterAge, setFilterAge] = useState<string>("");
  const [filterSex, setFilterSex] = useState<string>("");
  const [hoveredCatId, setHoveredCatId] = useState<number | null>(null);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [isSent, setIsSent] = useState(false);

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

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setSelectedCat(null);
      setIsSent(false);
    }, 3000);
  };

  return (
    <div className="adoptalos-container">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="adoptalos-header">
        <div className="adoptalos-title">Adóptalos</div>
        <div className="adoptalos-divider" />
        <div className="adoptalos-subtitle">Gatitos sin hogar en espera de una familia.</div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="adoptalos-filters">
        <div className="adoptalos-filter-group">
          <label className="adoptalos-filter-label">Ciudad</label>
          <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)} className="adoptalos-filter-select">
            <option value="">Todas las ciudades</option>
            {cities.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>

        <div className="adoptalos-filter-group">
          <label className="adoptalos-filter-label">Edad</label>
          <select value={filterAge} onChange={(e) => setFilterAge(e.target.value)} className="adoptalos-filter-select">
            <option value="">Todas las edades</option>
            {ages.map((age) => <option key={age} value={age}>{age} {age === 1 ? "año" : "años"}</option>)}
          </select>
        </div>

        <div className="adoptalos-filter-group">
          <label className="adoptalos-filter-label">Sexo</label>
          <select value={filterSex} onChange={(e) => setFilterSex(e.target.value)} className="adoptalos-filter-select">
            <option value="">Cualquier sexo</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
        </div>

        <AnimatePresence>
          {(filterCity || filterAge || filterSex) && (
            <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} onClick={clearFilters} className="adoptalos-clear-btn">
              <FiX size={18} /> Limpiar
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="adoptalos-grid">
        <AnimatePresence mode='popLayout'>
          {filteredCats.map((cat) => (
            <motion.div layout key={cat.id} className="adoptalos-card">
              <div className="adoptalos-card-image-wrapper">
                <div className="adoptalos-card-image">
                  <img src={cat.imagen} alt={cat.nombre} />
                </div>
              </div>

              <div className="adoptalos-card-content">
                <div className="adoptalos-card-name">{cat.nombre}</div>
                <div className="adoptalos-card-info-grid">
                  <div className="adoptalos-card-info-item">Edad: {cat.edad} años</div>
                  <div className="adoptalos-card-info-item">Sexo: {cat.sexo}</div>
                  <div className="adoptalos-card-info-item adoptalos-card-info-full">{cat.ciudad}</div>
                </div>

                <div className="adoptalos-card-buttons">
                  <AnimatePresence>
                    {hoveredCatId === cat.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95, x: "-50%" }}
                        animate={{ opacity: 1, y: -360, scale: 1, x: "-50%" }}
                        exit={{ opacity: 0, y: 30, scale: 0.95, x: "-50%" }}
                        className="adoptalos-tooltip"
                      >
                        <div className="adoptalos-tooltip-header">
                          <div className="adoptalos-tooltip-image">
                            <img src={cat.imagen} alt="mini" />
                          </div>
                          <div>
                            <div className="adoptalos-tooltip-title">{cat.nombre}</div>
                            <div className="adoptalos-tooltip-badges">
                              <div className="adoptalos-tooltip-badge">{cat.sexo}</div>
                              <div className="adoptalos-tooltip-badge">{cat.edad} años</div>
                            </div>
                          </div>
                        </div>

                        <div className="adoptalos-tooltip-description">{cat.descripcion}</div>

                        <div className="adoptalos-tooltip-footer">
                          <div><FiCheckCircle /> SALUD VERIFICADA</div>
                          <div><FiMapPin /> {cat.ciudad.toUpperCase()}</div>
                        </div>
                        <div className="adoptalos-tooltip-arrow" style={{ bottom: '-12px', left: '50%', marginLeft: '-16px' }} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    onMouseEnter={() => setHoveredCatId(cat.id)}
                    onMouseLeave={() => setHoveredCatId(null)}
                    whileTap={{ scale: 0.9 }}
                    className="adoptalos-eye-btn"
                  >
                    <FiEye size={28} />
                  </motion.button>

                  <button onClick={() => setSelectedCat(cat)} className="adoptalos-adopt-btn">
                    ¡Adóptame!
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedCat && (
          <div className="adoptalos-modal-overlay">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedCat(null)}
              className="adoptalos-modal-backdrop"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="adoptalos-modal-content"
            >
              <button onClick={() => setSelectedCat(null)} className="adoptalos-modal-close">
                <FiX size={24} />
              </button>

              <div className="adoptalos-modal-body">
                {!isSent ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="adoptalos-form-header">
                      <div className="adoptalos-form-title">¡Excelente elección!</div>
                      <div className="adoptalos-form-subtitle">Estás a un paso de adoptar a {selectedCat.nombre}</div>
                    </div>

                    <form className="adoptalos-form" onSubmit={handleSend}>
                      <input type="text" placeholder="Nombre completo" className="adoptalos-form-input" />
                      <input type="tel" placeholder="WhatsApp / Teléfono" className="adoptalos-form-input" />
                      <textarea rows={3} placeholder="¿Por qué quieres adoptarlo?" className="adoptalos-form-textarea" />
                      <button type="submit" className="adoptalos-form-submit">
                        <FiSend size={20} /> Enviar solicitud
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="adoptalos-success">
                    <div className="adoptalos-success-icon">
                      <FiHeart size={40} className="fill-current" />
                    </div>
                    <div className="adoptalos-success-title">¡Solicitud enviada!</div>
                    <div className="adoptalos-success-subtitle">Te contactaremos pronto.</div>
                    <div className="adoptalos-success-text">¡Gracias por querer adoptar!</div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="adoptalos-counter">
        Mostrando {filteredCats.length} de {catsData.length} gatos
      </div>
    </div>
  );
}
