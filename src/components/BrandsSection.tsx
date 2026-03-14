import { motion } from "framer-motion";

const brands = [
  "Arburg", "Battenfeld", "BMB", "Borche", "Chen Hsong", "Engel",
  "Haitian", "Himaco", "Jasot", "Krauss Maffei", "Log Machine",
  "LS Mtron", "Nissei ASB", "Romi", "Sumitomo", "Yizumi",
];

const BrandsSection = () => {
  return (
    <section className="section-padding bg-muted" id="marcas">
      <div className="container-industrial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-industrial-accent font-heading uppercase tracking-wider">Parceiros</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
            Trabalhamos com as Melhores Marcas
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center justify-center rounded-lg bg-card p-4 h-20 shadow-industrial"
            >
              <span className="font-heading text-xs md:text-sm font-bold text-muted-foreground text-center">{brand}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
