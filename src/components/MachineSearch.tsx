import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const types = ["Todos", "Injetora", "Sopradora", "Extrusora"];
const brands = ["Todos", "Haitian", "Engel", "Borche", "Romi", "Chen Hsong", "BMB", "Bekum", "Battenfeld"];

const MachineSearch = () => {
  const [type, setType] = useState("Todos");
  const [brand, setBrand] = useState("Todos");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (type !== "Todos") params.set("tipo", type.toLowerCase());
    if (brand !== "Todos") params.set("marca", brand);
    navigate(`/maquinas?${params.toString()}`);
  };

  return (
    <section className="relative -mt-10 z-20 pb-8">
      <div className="container-industrial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl bg-card p-6 md:p-8 shadow-industrial-elevated"
        >
          <h2 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-industrial-accent" />
            Encontre seu Equipamento
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-foreground mb-2 font-heading">Tipo de Equipamento</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-heading focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-foreground mb-2 font-heading">Marca</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-heading focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {brands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button variant="hero" size="lg" onClick={handleSearch} className="w-full md:w-auto px-8 py-3">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MachineSearch;
