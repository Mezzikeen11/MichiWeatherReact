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
  { id: 1, nombre: "Canela", edad: 2, sexo: "Hembra", ciudad: "Cancún", imagen: Gato1, descripcion: "Pendiente." },
  { id: 2, nombre: "Milly", edad: 3, sexo: "Macho", ciudad: "Playa del Carmen", imagen: Gato2, descripcion: "Ejemplar independiente y tranquilo. Prefiere ambientes calmados y es muy dócil." },
  { id: 3, nombre: "Joe", edad: 1, sexo: "Hembra", ciudad: "Cancún", imagen: Gato3, descripcion: "Joven y llena de energía. Requiere estimulación física y espacio para jugar." },
  { id: 4, nombre: "Felix", edad: 4, sexo: "Macho", ciudad: "Tulum", imagen: Gato4, descripcion: "Gato rescatado sumamente leal. Posee salud completa y busca un hogar definitivo." },
  { id: 5, nombre: "Jerry", edad: 2, sexo: "Macho", ciudad: "Playa del Carmen", imagen: Gato5, descripcion: "Destaca por su docilidad y búsqueda de afecto. Se integra bien a familias con niños." },
  { id: 6, nombre: "Tom", edad: 1, sexo: "Macho", ciudad: "Cancún", imagen: Gato7, descripcion: "Explorador por naturaleza y muy valiente. Ideal para una familia activa." },
  { id: 7, nombre: "Coco", edad: 5, sexo: "Hembra", ciudad: "Cancún", imagen: Gato6, descripcion: "Gatita madura y muy educada, busca un hogar tranquilo." },
  { id: 8, nombre: "Nala", edad: 3, sexo: "Hembra", ciudad: "Tulum", imagen: Gato8, descripcion: "Tímida al principio, pero una vez que confía es puro amor." },
  { id: 9, nombre: "Simba", edad: 1, sexo: "Macho", ciudad: "Cancún", imagen: Gato9, descripcion: "Un pequeño cachorro lleno de vida y ganas de jugar." },
  { id: 10, nombre: "Pixel", edad: 2, sexo: "Hembra", ciudad: "Playa del Carmen", imagen: Gato10, descripcion: "Le encantan las alturas, siempre vigilando desde lo más alto." },
  { id: 11, nombre: "Milo", edad: 3, sexo: "Macho", ciudad: "Cancún", imagen: Gato11, descripcion: "Sociable por naturaleza, se lleva bien con otros gatitos." },
  { id: 12, nombre: "Bibi", edad: 2, sexo: "Hembra", ciudad: "Playa del Carmen", imagen: Gato12, descripcion: "Ronronea en cuanto la miras, es cariñosa y busca mimos." },
];

export default function Adoptalos() {
  const [filterCity, setFilterCity] = useState<string>("");
  const [filterAge, setFilterAge] = useState<string>("");
  const [filterSex, setFilterSex] = useState<string>("");
  const [hoveredCatId, setHoveredCatId] = useState<number | null>(null);
  
  // Estados para el Modal
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
    setFilterCity(""); setFilterAge(""); setFilterSex("");
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    // Cerramos el modal automáticamente después de 3 segundos
    setTimeout(() => {
      setSelectedCat(null);
      setIsSent(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f9f0] to-[#ffffff] dark:from-[#0a1a0a] dark:to-[#000000] pt-4 pb-16 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="text-6xl font-black text-[#1a3a1a] dark:text-white mb-4 tracking-tight" style={{ fontFamily: 'inherit' }}>Adóptalos</div>
          <div className="h-1.5 w-24 bg-[#2d7a2d] mx-auto rounded-full mb-4" />
          <div className="text-xl text-[#2d5a2d] dark:text-gray-400 font-medium" style={{ fontFamily: 'inherit' }}>Gatitos sin hogar en espera de una familia.</div>
        </motion.div>

        {/* Panel de Filtros */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 rounded-[2rem] p-8 shadow-2xl mb-12 mt-10 flex flex-wrap items-end gap-8 justify-center">
          <div className="flex-1 min-w-[220px]">
            <label className="block text-xs font-bold uppercase tracking-widest text-[#1a3a1a] dark:text-gray-300 mb-3 ml-2" style={{ fontFamily: 'inherit' }}>Ciudad</label>
            <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)} className="w-full px-5 py-3 bg-white dark:bg-[#1a3a1a] border-none rounded-2xl text-sm shadow-inner focus:ring-2 focus:ring-[#2d7a2d] outline-none transition-all cursor-pointer dark:text-white" style={{ fontFamily: 'inherit' }}>
              <option value="">Todas las ciudades</option>
              {cities.map((city) => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[220px]">
            <label className="block text-xs font-bold uppercase tracking-widest text-[#1a3a1a] dark:text-gray-300 mb-3 ml-2" style={{ fontFamily: 'inherit' }}>Edad</label>
            <select value={filterAge} onChange={(e) => setFilterAge(e.target.value)} className="w-full px-5 py-3 bg-white dark:bg-[#1a3a1a] border-none rounded-2xl text-sm shadow-inner focus:ring-2 focus:ring-[#2d7a2d] outline-none transition-all cursor-pointer dark:text-white" style={{ fontFamily: 'inherit' }}>
              <option value="">Todas las edades</option>
              {ages.map((age) => <option key={age} value={age}>{age} {age === 1 ? "año" : "años"}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[220px]">
            <label className="block text-xs font-bold uppercase tracking-widest text-[#1a3a1a] dark:text-gray-300 mb-3 ml-2" style={{ fontFamily: 'inherit' }}>Sexo</label>
            <select value={filterSex} onChange={(e) => setFilterSex(e.target.value)} className="w-full px-5 py-3 bg-white dark:bg-[#1a3a1a] border-none rounded-2xl text-sm shadow-inner focus:ring-2 focus:ring-[#2d7a2d] outline-none transition-all cursor-pointer dark:text-white" style={{ fontFamily: 'inherit' }}>
              <option value="">Cualquier sexo</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>

          <AnimatePresence>
            {(filterCity || filterAge || filterSex) && (
              <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} onClick={clearFilters} className="flex items-center gap-2 px-6 py-3 text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all" style={{ fontFamily: 'inherit' }}><FiX size={18} /> Limpiar</motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Grid de Gatos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode='popLayout'>
            {filteredCats.map((cat) => (
              <motion.div layout key={cat.id} className="relative rounded-[3rem] bg-white dark:bg-[#121212] shadow-xl border border-green-50 overflow-visible">
                <div className="p-4">
                  <div className="w-full h-72 rounded-[2.5rem] overflow-hidden">
                    <img src={cat.imagen} alt={cat.nombre} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="p-8 pt-0 text-center">
                  <div className="text-3xl font-black text-[#1a3a1a] dark:text-white mb-6" style={{ fontFamily: 'inherit' }}>{cat.nombre}</div>

                  <div className="grid grid-cols-2 gap-3 mb-8 text-[11px] font-bold text-[#1a3a1a] dark:text-white uppercase italic" style={{ fontFamily: 'inherit' }}>
                    <div className="bg-[#f7faf7] dark:bg-white/5 p-3 rounded-2xl shadow-sm">Edad: {cat.edad} años</div>
                    <div className="bg-[#f7faf7] dark:bg-white/5 p-3 rounded-2xl shadow-sm">Sexo: {cat.sexo}</div>
                    <div className="col-span-2 bg-[#f7faf7] dark:bg-white/5 p-3 rounded-2xl shadow-sm">{cat.ciudad}</div>
                  </div>

                  <div className="flex gap-2 relative">
                    <AnimatePresence>
                      {hoveredCatId === cat.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 30, scale: 0.95, x: "-50%" }}
                          animate={{ opacity: 1, y: -360, scale: 1, x: "-50%" }}
                          exit={{ opacity: 0, y: 30, scale: 0.95, x: "-50%" }}
                          className="absolute left-1/2 w-[420px] z-[100] bg-white dark:bg-[#1a1a1a] p-8 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.2)] border border-green-100 pointer-events-none text-left"
                          style={{ fontFamily: 'inherit' }}
                        >
                          <div className="flex gap-6 items-center mb-6">
                            <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-[#2d7a2d] shadow-lg flex-shrink-0">
                                <img src={cat.imagen} className="w-full h-full object-cover" alt="mini" />
                            </div>
                            <div className="flex flex-col">
                                <div className="text-4xl font-black text-[#1a3a1a] dark:text-white leading-none" style={{ fontFamily: 'inherit' }}>{cat.nombre}</div>
                                <div className="flex gap-2 mt-3">
                                    <div className="bg-[#e8f3e8] text-[#2d7a2d] text-[10px] font-bold px-3 py-1 rounded-full uppercase" style={{ fontFamily: 'inherit' }}>{cat.sexo}</div>
                                    <div className="bg-[#e8f3e8] text-[#2d7a2d] text-[10px] font-bold px-3 py-1 rounded-full uppercase" style={{ fontFamily: 'inherit' }}>{cat.edad} años</div>
                                </div>
                            </div>
                          </div>
                          <div className="text-[#4a5a4a] dark:text-gray-300 text-base leading-relaxed mb-6 font-medium italic border-l-4 border-[#2d7a2d] pl-4" style={{ fontFamily: 'inherit' }}>
                            "{cat.descripcion}"
                          </div>
                          <div className="flex justify-between items-center text-[#2d7a2d] dark:text-green-400 text-[11px] font-bold uppercase tracking-widest pt-4 border-t border-gray-100 dark:border-white/10" style={{ fontFamily: 'inherit' }}>
                            <div className="flex items-center gap-1"><FiCheckCircle /> SALUD VERIFICADA</div>
                            <div className="flex items-center gap-1"><FiMapPin /> {cat.ciudad.toUpperCase()}</div>
                          </div>
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-white dark:bg-[#1a1a1a] rotate-45 border-r border-b border-green-100 dark:border-white/10" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button 
                      onMouseEnter={() => setHoveredCatId(cat.id)}
                      onMouseLeave={() => setHoveredCatId(null)}
                      whileTap={{ scale: 0.9 }} 
                      className="w-16 h-16 bg-white border-2 border-[#2d7a2d] text-[#2d7a2d] rounded-2xl flex items-center justify-center hover:bg-[#2d7a2d] hover:text-white transition-all flex-shrink-0"
                    >
                      <FiEye size={28} />
                    </motion.button>
                    
                    <button 
                      onClick={() => setSelectedCat(cat)}
                      className="flex-1 py-4 bg-[#2d7a2d] hover:bg-[#1a3a1a] text-white font-black rounded-2xl transition-all shadow-md uppercase tracking-tighter" 
                      style={{ fontFamily: 'inherit' }}
                    >
                      ¡Adóptame!
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* MODAL DE FORMULARIO / ÉXITO */}
        <AnimatePresence>
          {selectedCat && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                onClick={() => setSelectedCat(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white dark:bg-[#1a1a1a] w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden min-h-[400px] flex items-center"
                style={{ fontFamily: 'inherit' }}
              >
                <button onClick={() => setSelectedCat(null)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors z-10"><FiX size={24} /></button>

                <div className="p-10 w-full">
                  {!isSent ? (
                    /* FORMULARIO */
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="text-center mb-8">
                        <div className="text-4xl font-black text-[#1a3a1a] dark:text-white mb-2" style={{ fontFamily: 'inherit' }}>¡Excelente elección!</div>
                        <div className="text-[#2d7a2d] font-bold text-lg" style={{ fontFamily: 'inherit' }}>Estás a un paso de adoptar a {selectedCat.nombre}</div>
                      </div>

                      <form className="space-y-4" onSubmit={handleSend}>
                        <input type="text" placeholder="Nombre completo" className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#2d7a2d] dark:text-white" style={{ fontFamily: 'inherit' }} />
                        <input type="tel" placeholder="WhatsApp / Teléfono" className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#2d7a2d] dark:text-white" style={{ fontFamily: 'inherit' }} />
                        <textarea rows={3} placeholder="¿Por qué quieres adoptarlo?" className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#2d7a2d] dark:text-white resize-none" style={{ fontFamily: 'inherit' }} />
                        <button type="submit" className="w-full py-5 bg-[#2d7a2d] hover:bg-[#1a3a1a] text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-3 uppercase mt-4" style={{ fontFamily: 'inherit' }}>
                          <FiSend size={20} /> Enviar solicitud
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    /* MENSAJE DE ÉXITO */
                    <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
                      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-[#2d7a2d] rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiHeart size={40} className="fill-current" />
                      </div>
                      <div className="text-3xl font-black text-[#1a3a1a] dark:text-white mb-4" style={{ fontFamily: 'inherit' }}>¡Solicitud enviada!</div>
                      <div className="text-xl text-gray-500 font-medium" style={{ fontFamily: 'inherit' }}>Te contactaremos pronto.</div>
                      <div className="mt-8 text-sm text-[#2d7a2d] font-bold uppercase tracking-widest animate-pulse">¡Gracias por querer adoptar!</div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}