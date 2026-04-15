import { motion } from "framer-motion";
import { Clock, Award, HeartHandshake, Users, TrendingUp } from "lucide-react";

const valoresAtendimento = [
  {
    icon: Award,
    title: "+20 Anos de Experiência",
    description: "Tradição e know-how no mercado de máquinas injetoras desde 2004.",
  },
  {
    icon: HeartHandshake,
    title: "Satisfação Garantida",
    description: "Seu sucesso é o nosso sucesso. Trabalhamos para superar suas expectativas em cada negociação.",
  },
  {
    icon: Clock,
    title: "Atendimento Rápido",
    description: "Resposta ágil aos orçamentos. Valorizamos seu tempo e agilizamos seu processo produtivo.",
  },
  {
    icon: Users,
    title: "Relacionamento de Confiança",
    description: "Construímos parcerias duradouras baseadas em transparência, respeito e resultados.",
  },
  {
    icon: TrendingUp,
    title: "Encontre a máquina certa para elevar o nível da sua produção",
    description: "Ajudamos sua indústria a crescer com equipamentos que maximizam sua produtividade.",
  },
];

const ValoresAtendimentoSection = () => {
  return (
    <section className="section-padding bg-industrial-primary" id="atendimento">
      <div className="container-industrial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-industrial-accent font-heading uppercase tracking-wider">
            Nosso Compromisso
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mt-2">
            Valores do Atendimento ao Cliente
          </h2>
          <p className="text-industrial-gray mt-4 max-w-2xl mx-auto">
            Mais de três décadas construindo relações de confiança com nossos clientes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {valoresAtendimento.map((valor, i) => (
            <motion.div
              key={valor.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl bg-industrial-secondary/50 border border-white/10 p-6 hover:bg-industrial-secondary hover:border-industrial-accent/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-industrial-accent/10 flex items-center justify-center group-hover:bg-industrial-accent/20 transition-colors">
                  <valor.icon className="h-6 w-6 text-industrial-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white mb-2">
                    {valor.title}
                  </h3>
                  <p className="text-sm text-industrial-gray leading-relaxed">
                    {valor.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValoresAtendimentoSection;
