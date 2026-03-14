import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import factoryImg from "@/assets/factory-floor.jpg";

const CTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={factoryImg} alt="Fábrica com máquinas injetoras" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-industrial-gradient opacity-90" />
      </div>

      <div className="container-industrial relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Precisa de uma Máquina Injetora?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10">
            Entre em contato conosco e receba um orçamento personalizado. Atendemos todo o Brasil com as melhores condições do mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild className="text-base px-10 py-6">
              <a href="/contato">Solicitar Orçamento</a>
            </Button>
            <Button variant="whatsapp" size="lg" asChild className="text-base px-10 py-6">
              <a href="https://wa.me/5511997240711" target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
