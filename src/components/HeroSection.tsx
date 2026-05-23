import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-industrial.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Máquina injetora de plástico industrial em fábrica moderna"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-industrial-gradient opacity-85" />
      </div>

      <div className="container-industrial relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="inline-block rounded-full bg-industrial-accent/20 px-4 py-1.5 text-sm font-semibold text-industrial-accent mb-6 font-heading">
            +20 anos de experiência
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-primary-foreground mb-6">
            Anúncio e Venda de{" "}
            <span className="text-gradient">Equipamentos Usados</span>{" "}
            para Plástico
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl leading-relaxed">
            Desde 2000 divulgamos e vendemos seus equipamentos ociosos. Somos remunerados somente no sucesso do negócio, sem nenhum custo para você.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" asChild className="text-base px-8 py-6">
              <a href="/contato">Solicitar Orçamento</a>
            </Button>
            <Button variant="whatsapp" size="lg" asChild className="text-base px-8 py-6">
              <a
                href="https://wa.me/5511997240711?text=Olá! Gostaria de solicitar um orçamento de máquinas injetoras."
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
