import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-industrial.jpg";
import moldImg from "@/assets/mold-manufacturing.jpg";

const allMachines = [
  { id: 1, title: "Injetora Haitian MA 1200", brand: "Haitian", tonnage: 120, condition: "Usada - Revisada", category: "injetora", image: heroImg },
  { id: 2, title: "Injetora Engel Victory 200", brand: "Engel", tonnage: 200, condition: "Nova", category: "injetora", image: moldImg },
  { id: 3, title: "Injetora Borche BT 350", brand: "Borche", tonnage: 350, condition: "Usada - Revisada", category: "injetora", image: heroImg },
  { id: 4, title: "Injetora Romi Primax 150", brand: "Romi", tonnage: 150, condition: "Usada", category: "injetora", image: moldImg },
  { id: 5, title: "Injetora Chen Hsong JM 250", brand: "Chen Hsong", tonnage: 250, condition: "Usada - Revisada", category: "injetora", image: heroImg },
  { id: 6, title: "Injetora BMB eKW 400", brand: "BMB", tonnage: 400, condition: "Nova", category: "injetora", image: moldImg },
  { id: 7, title: "Sopradora Bekum BM-304", brand: "Bekum", tonnage: 0, condition: "Usada", category: "sopradora", image: heroImg },
  { id: 8, title: "Extrusora Battenfeld 90mm", brand: "Battenfeld", tonnage: 0, condition: "Usada - Revisada", category: "extrusora", image: moldImg },
];

const categories = ["Todos", "Injetora", "Sopradora", "Extrusora"];
const brands = ["Todos", ...new Set(allMachines.map((m) => m.brand))];

const Machines = () => {
  const [catFilter, setCatFilter] = useState("Todos");
  const [brandFilter, setBrandFilter] = useState("Todos");

  const filtered = allMachines.filter((m) => {
    const catMatch = catFilter === "Todos" || m.category === catFilter.toLowerCase();
    const brandMatch = brandFilter === "Todos" || m.brand === brandFilter;
    return catMatch && brandMatch;
  });

  return (
    <>
      <SEOHead
        title="Catálogo de Máquinas Injetoras e Equipamentos"
        description="Confira nosso catálogo de máquinas injetoras, sopradoras e extrusoras novas e usadas. Melhores marcas com garantia. Solicite cotação!"
        canonical="/maquinas"
      />
      <Header />
      <main>
        <section className="bg-industrial-gradient py-24">
          <div className="container-industrial text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-foreground">Catálogo de Máquinas</h1>
            <p className="text-primary-foreground/80 mt-4 text-lg">Encontre a máquina ideal para sua indústria</p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-industrial">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-10">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2 font-heading">Categoria</label>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCatFilter(c)}
                      className={`px-4 py-2 rounded-lg text-sm font-heading font-semibold transition-colors ${
                        catFilter === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2 font-heading">Marca</label>
                <div className="flex gap-2 flex-wrap">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBrandFilter(b)}
                      className={`px-4 py-2 rounded-lg text-sm font-heading font-semibold transition-colors ${
                        brandFilter === b ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group rounded-xl bg-card overflow-hidden shadow-industrial hover:shadow-industrial-elevated transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={m.image} alt={m.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <div className="flex gap-2 mb-2">
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary font-heading">{m.brand}</span>
                      {m.tonnage > 0 && <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground font-heading">{m.tonnage} ton</span>}
                    </div>
                    <h3 className="font-heading font-bold text-foreground mb-1">{m.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{m.condition}</p>
                    <Button variant="hero" size="sm" className="w-full" asChild>
                      <a href={`https://wa.me/5511996109016?text=Olá! Tenho interesse na ${m.title}`} target="_blank" rel="noopener noreferrer">
                        Solicitar Cotação
                      </a>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg">Nenhuma máquina encontrada com os filtros selecionados.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default Machines;
