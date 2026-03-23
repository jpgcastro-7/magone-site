import { motion } from "framer-motion";
import { Star } from "lucide-react";

// TODO: Substituir por depoimentos reais dos clientes
const testimonials = [
  {
    name: "Cliente Satisfeito",
    company: "Indústria de Plásticos",
    text: "Em breve publicaremos depoimentos reais de nossos clientes. Entre em contato e faça parte da nossa história!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-muted" id="depoimentos">
      <div className="container-industrial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-industrial-accent font-heading uppercase tracking-wider">Depoimentos</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
            O que Nossos Clientes Dizem
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-xl bg-card p-8 shadow-industrial"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-5 w-5 fill-industrial-accent text-industrial-accent" />
                ))}
              </div>
              <p className="text-foreground italic mb-6 leading-relaxed">"{t.text}"</p>
              <div>
                <p className="font-heading font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
