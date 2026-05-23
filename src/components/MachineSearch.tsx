import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const categories = [
  { label: "Todos os Produtos", dept: "" },
  { label: "Equipamentos Diversos", dept: "Equipamentos Diversos" },
  { label: "Extrusoras", dept: "Extrusoras" },
  { label: "Fabricação de Moldes", dept: "Fabricação de Moldes" },
  { label: "─── Injetoras", dept: "", disabled: true },
  { label: "    Injetoras para Plástico", dept: "Injetoras para Plástico" },
  { label: "    Injetoras para Zamak e Alumínio", dept: "Injetoras para Zamak e Alumínio" },
  { label: "─── Moldes", dept: "", disabled: true },
  { label: "    Moldes Brinquedos", dept: "Moldes Brinquedos" },
  { label: "    Moldes Industriais", dept: "Moldes Industriais" },
  { label: "    Moldes Utilidades Domésticas", dept: "Moldes Utilidades Domésticas" },
  { label: "Negócios & Oportunidades", dept: "Negócios e Oportunidades" },
  { label: "Sopradoras", dept: "Sopradoras" },
];

const MachineSearch = () => {
  const [dept, setDept] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (dept) params.set("dept", dept);
    navigate(`/maquinas${dept ? `?${params.toString()}` : ""}`);
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
              <label className="block text-sm font-semibold text-foreground mb-2 font-heading">Categoria</label>
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-heading focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {categories.map((c) => (
                  <option key={c.label} value={c.dept} disabled={c.disabled}>
                    {c.label}
                  </option>
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
