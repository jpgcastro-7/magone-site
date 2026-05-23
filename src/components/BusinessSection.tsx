import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, Mail } from "lucide-react";

const cards = [
  {
    icon: Search,
    title: "OFERECEMOS",
    lines: ["Oportunidades de negócios.", "Nossos preços são os melhores!"],
    cta: { label: "Consulte-nos", href: "/contato" },
  },
  {
    icon: TrendingUp,
    title: "VENDEMOS",
    lines: [
      "Seus equipamentos ociosos. Somos remunerados somente no sucesso.",
      "Envie fotos, características e preço pretendido por WhatsApp (11) 99724-0711 ou por e-mail",
    ],
    cta: { label: "magone@magone.com.br", href: "mailto:magone@magone.com.br" },
  },
  {
    icon: Mail,
    title: "ENVIAMOS",
    lines: ["Novidades por e-mail.", "Cadastre sua empresa."],
    cta: { label: "Clique aqui", href: "/contato#newsletter" },
  },
];

const BusinessSection = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-industrial">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col rounded-xl overflow-hidden border border-border shadow-industrial"
            >
              <div className="bg-primary flex items-center justify-center gap-3 py-5 px-6">
                <card.icon className="h-5 w-5 text-primary-foreground" />
                <h3 className="font-heading text-lg font-black text-primary-foreground tracking-wider">
                  {card.title}
                </h3>
              </div>
              <div className="flex flex-col flex-1 items-center justify-between gap-6 bg-card p-8 text-center">
                <div className="space-y-3">
                  {card.lines.map((line, j) => (
                    <p key={j} className="font-semibold text-foreground leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
                <Button asChild className="bg-industrial-accent hover:bg-industrial-accent/90 text-white font-bold">
                  <a href={card.cta.href}>{card.cta.label}</a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
