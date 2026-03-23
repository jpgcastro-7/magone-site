import { motion } from "framer-motion";
import { Shield, Clock, Award, Truck, Headphones, DollarSign } from "lucide-react";

const differentials = [
  { icon: Clock, title: "+20 Anos de Mercado", description: "Experiência consolidada no setor de máquinas industriais para plástico." },
  { icon: Shield, title: "Garantia e Procedência", description: "Todas as máquinas com garantia de funcionamento e procedência comprovada." },
  { icon: Award, title: "Melhores Marcas", description: "Trabalhamos com as principais marcas mundiais de injetoras e equipamentos." },
  { icon: DollarSign, title: "Melhores Preços", description: "Condições comerciais competitivas para sua indústria crescer." },
];

const DifferentialsSection = () => {
  return (
    <section className="section-padding bg-background" id="diferenciais">
      <div className="container-industrial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-industrial-accent font-heading uppercase tracking-wider">Por que a Magone</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
            Nossos Diferenciais
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-industrial-accent/10 text-industrial-accent">
                <d.icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">{d.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{d.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
