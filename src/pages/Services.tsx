import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEOHead from "@/components/SEOHead";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";

const Services = () => {
  return (
    <>
      <SEOHead
        title="Serviços - Máquinas Injetoras, Moldes e Equipamentos"
        description="Conheça nossos serviços: divulgação e venda de equipamentos usados para plástico. Injetoras, sopradoras, extrusoras, moldes e mais."
        canonical="/servicos"
      />
      <Header />
      <main>
        <section className="bg-industrial-gradient py-24">
          <div className="container-industrial text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-foreground">Nossos Serviços</h1>
            <p className="text-primary-foreground/80 mt-4 text-lg max-w-2xl mx-auto">Soluções completas para a indústria de transformação plástica</p>
          </div>
        </section>
        <ServicesSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default Services;
