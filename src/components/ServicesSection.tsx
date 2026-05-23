import { motion } from "framer-motion";
import { ShoppingCart, Wrench, Factory, Cog, Wind, Layers, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: ShoppingCart,
    title: "Venda de Equipamentos Usados",
    description: "Anunciamos e vendemos seus equipamentos ociosos. Remunerados somente no sucesso.",
    href: "/servicos/compra-venda-injetoras",
  },
  {
    icon: Factory,
    title: "Injetoras para Plástico",
    description: "Injetoras de alta performance para produção de peças plásticas com precisão.",
    href: "/servicos/injetoras-plastico",
  },
  {
    icon: Cog,
    title: "Injetoras para Zamak e Alumínio",
    description: "Máquinas especializadas para injeção de zamak e alumínio com qualidade superior.",
    href: "/servicos/injetoras-zamak-aluminio",
  },
  {
    icon: Wrench,
    title: "Fabricação de Moldes",
    description: "Projeto e fabricação de moldes para injeção plástica com alta precisão dimensional.",
    href: "/servicos/fabricacao-moldes",
  },
  {
    icon: Wind,
    title: "Sopradoras",
    description: "Máquinas sopradoras para fabricação de embalagens plásticas e frascos.",
    href: "/servicos/sopradoras",
  },
  {
    icon: Layers,
    title: "Extrusoras",
    description: "Extrusoras para produção contínua de perfis, tubos e chapas plásticas.",
    href: "/servicos/extrusoras",
  },
  {
    icon: Settings,
    title: "Equipamentos Industriais",
    description: "Periféricos e equipamentos auxiliares para a indústria de transformação plástica.",
    href: "/servicos/equipamentos-industriais",
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding bg-background" id="servicos">
      <div className="container-industrial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-industrial-accent font-heading uppercase tracking-wider">O que fazemos</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
            Nossos Serviços
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Divulgamos e vendemos equipamentos usados para a indústria de transformação plástica. Remunerados somente no sucesso.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={service.href}
                className="group block h-full rounded-xl bg-card p-6 shadow-industrial transition-all hover:shadow-industrial-elevated hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-industrial-accent group-hover:text-primary-foreground transition-colors">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
