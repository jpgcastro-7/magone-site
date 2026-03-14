import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import moldImg from "@/assets/mold-manufacturing.jpg";
import heroImg from "@/assets/hero-industrial.jpg";

const machines = [
  {
    title: "Injetora Haitian MA 1200",
    brand: "Haitian",
    tonnage: "120 ton",
    condition: "Usada - Revisada",
    image: heroImg,
  },
  {
    title: "Injetora Engel Victory 200",
    brand: "Engel",
    tonnage: "200 ton",
    condition: "Nova",
    image: moldImg,
  },
  {
    title: "Injetora Borche BT 350",
    brand: "Borche",
    tonnage: "350 ton",
    condition: "Usada - Revisada",
    image: heroImg,
  },
  {
    title: "Injetora Romi Primax 150",
    brand: "Romi",
    tonnage: "150 ton",
    condition: "Usada",
    image: moldImg,
  },
];

const FeaturedMachines = () => {
  return (
    <section className="section-padding bg-muted" id="maquinas">
      <div className="container-industrial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-industrial-accent font-heading uppercase tracking-wider">Catálogo</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
            Máquinas em Destaque
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Confira algumas das máquinas disponíveis em nosso estoque. Temos opções novas e usadas das melhores marcas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {machines.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl bg-card overflow-hidden shadow-industrial hover:shadow-industrial-elevated transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={m.image}
                  alt={`${m.title} - Máquina injetora ${m.brand} ${m.tonnage}`}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex gap-2 mb-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary font-heading">{m.brand}</span>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground font-heading">{m.tonnage}</span>
                </div>
                <h3 className="font-heading font-bold text-foreground mb-1">{m.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{m.condition}</p>
                <Button variant="hero" size="sm" className="w-full" asChild>
                  <a href={`https://wa.me/5511997240711?text=Olá! Tenho interesse na ${m.title}`} target="_blank" rel="noopener noreferrer">
                    Solicitar Cotação
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <a href="/maquinas">Ver Todas as Máquinas</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMachines;
